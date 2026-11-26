// Git-history forensic for description drift: replays consecutive
// data/repositories.json snapshots and measures how upstream GitHub
// descriptions actually move. Read-only; zero network, zero GitHub API.
//
// Usage:
//   node scripts/audit-description-drift.mjs                 last 90 days, stdout summary
//   node scripts/audit-description-drift.mjs --since-days=30
//   node scripts/audit-description-drift.mjs --write         write artifacts:
//     <out>/description-drift.json    full machine-readable result
//     <out>/description-changes.jsonl per-change-event rows for approved repos
//
// Method notes:
// - `git cat-file --batch` extracts every snapshot blob in one git process;
//   each blob is line-scanned for full_name/description pairs (the snapshot is
//   machine-written pretty JSON with one field per line), which is ~10x
//   cheaper than parsing 30 MB JSON documents per commit.
// - A "change event" is a consecutive-commit pair where the same repository's
//   description text differs. Repositories appearing/vanishing between
//   snapshots are counted separately, never as changes.
// - Category-flip detection replays the regex rules over old vs new text. It
//   is a regex-level signal only: rows pinned by category_overrides do not
//   actually flip downstream, and the semantic correct-ness of either side is
//   for the LLM pass to judge.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { categoryRules } from './categories.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const write = args.includes('--write');
const sinceArg = args.find((arg) => arg.startsWith('--since-days='));
const sinceDays = sinceArg ? Number(sinceArg.slice('--since-days='.length)) : 90;
if (!Number.isInteger(sinceDays) || sinceDays < 2) throw new Error('--since-days must be an integer >= 2');
const outDirArg = args.find((arg) => arg.startsWith('--out-dir='));
const outDir = outDirArg ? resolve(root, outDirArg.slice('--out-dir='.length)) : resolve(root, 'Temp/metadata-audit');

// --- commit discovery ---------------------------------------------------------
const sinceDate = new Date(Date.now() - sinceDays * 86_400_000).toISOString().slice(0, 10);
const log = spawnSync('git', [
  'log', '--format=%H%x09%ad', '--date=iso-strict', '--reverse',
  `--since=${sinceDate}`, '--', 'data/repositories.json',
], { cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
if (log.status !== 0) throw new Error(`git log failed: ${log.stderr}`);
const commits = log.stdout.trim().split('\n').filter(Boolean).map((line) => {
  const [sha, date] = line.split('\t');
  return { sha, date };
});
if (commits.length < 2) throw new Error(`need at least 2 snapshot commits since ${sinceDate}, got ${commits.length}`);
console.error(`[drift] ${commits.length} snapshot commits since ${sinceDate}, extracting…`);

// --- batch extraction ---------------------------------------------------------
// Feed every <sha>:data/repositories.json object name to one cat-file process
// and parse its output stream blob by blob, using the exact byte length from
// each header so multibyte UTF-8 split across chunks is never an issue.
function extractDescriptions(buf) {
  const text = buf.toString('utf8');
  const map = new Map();
  let current = null;
  for (const line of text.split('\n')) {
    if (line.startsWith('      "full_name": "')) {
      current = line.slice('      "full_name": "'.length, -2);
    } else if (line.startsWith('      "description": ')) {
      if (current !== null) {
        const raw = line.slice('      "description": '.length).replace(/,$/, '');
        let value = null;
        try { value = JSON.parse(raw); } catch { value = null; }
        map.set(current.toLowerCase(), typeof value === 'string' ? value : null);
        current = null;
      }
    }
  }
  return map;
}

async function* streamSnapshots() {
  const child = spawn('git', ['cat-file', '--batch'], { cwd: root, stdio: ['pipe', 'pipe', 'inherit'] });
  for (const commit of commits) child.stdin.write(`${commit.sha}:data/repositories.json\n`);
  child.stdin.end();
  let pending = Buffer.alloc(0);
  let state = 'header';
  let expectBytes = 0;
  let queue = [];
  const waiters = [];
  const push = (item) => {
    const waiter = waiters.shift();
    if (waiter) waiter(item);
    else queue.push(item);
  };
  child.stdout.on('data', (chunk) => {
    pending = pending.length === 0 ? chunk : Buffer.concat([pending, chunk]);
    for (;;) {
      if (state === 'header') {
        const nl = pending.indexOf(0x0a);
        if (nl === -1) break;
        const header = pending.subarray(0, nl).toString('utf8');
        pending = pending.subarray(nl + 1);
        const match = header.match(/^[0-9a-f]{40} blob (\d+)$/);
        if (!match) throw new Error(`unexpected cat-file header: ${header}`);
        expectBytes = Number(match[1]);
        state = 'body';
      }
      if (state === 'body') {
        if (pending.length < expectBytes + 1) break;
        const body = pending.subarray(0, expectBytes);
        pending = pending.subarray(expectBytes + 1); // trailing LF
        state = 'header';
        push(body);
      }
    }
  });
  let ended = false;
  child.stdout.on('end', () => {
    ended = true;
    while (waiters.length) waiters.shift()(null);
  });
  child.on('error', (error) => { throw error; });
  for (;;) {
    if (queue.length === 0 && ended) return;
    const body = queue.length > 0
      ? queue.shift()
      : await new Promise((resolvePromise) => waiters.push(resolvePromise));
    if (body === null) return;
    yield body;
  }
}

// --- analysis -----------------------------------------------------------------
const firstMatchCategory = (name, description, topics) => {
  const haystack = [name, description, ...(topics || [])].filter(Boolean).join(' ');
  const rule = categoryRules.find((entry) => entry[3].test(haystack));
  return rule ? rule[0] : 'utilities';
};

const intervals = [];
const repoStats = new Map(); // slug -> { changes, firstSeen, lastSeen, lastChangeDate, flipEvents }
let prevMap = null;
let prevCommit = null;
let index = 0;
const newDescEvents = [];
const removedDescEvents = [];

for await (const blob of streamSnapshots()) {
  const commit = commits[index];
  index += 1;
  const map = extractDescriptions(blob);
  if (prevMap !== null) {
    let changed = 0;
    let appeared = 0;
    let vanished = 0;
    for (const [slug, description] of map) {
      if (!prevMap.has(slug)) {
        appeared += 1;
        continue;
      }
      const before = prevMap.get(slug);
      if (before !== description) {
        changed += 1;
        if (before === null && description !== null) newDescEvents.push({ slug, date: commit.date });
        if (before !== null && description === null) removedDescEvents.push({ slug, date: commit.date });
        if (before !== null && description !== null) {
          const stats = repoStats.get(slug) ?? { changes: 0, firstChange: commit.date, lastChange: commit.date, flipCount: 0 };
          stats.changes += 1;
          stats.lastChange = commit.date;
          const name = slug.split('/')[1];
          const oldCategory = firstMatchCategory(name, before, []);
          const newCategory = firstMatchCategory(name, description, []);
          if (oldCategory !== newCategory) stats.flipCount += 1;
          repoStats.set(slug, stats);
        }
      }
    }
    for (const slug of prevMap.keys()) {
      if (!map.has(slug)) vanished += 1;
    }
    intervals.push({
      from: prevCommit.date.slice(0, 10),
      to: commit.date.slice(0, 10),
      changed,
      appeared,
      vanished,
    });
  }
  prevMap = map;
  prevCommit = commit;
  if (index % 20 === 0) console.error(`[drift] ${index}/${commits.length} snapshots…`);
}
console.error(`[drift] replayed ${index} snapshots`);

// --- impact annotation --------------------------------------------------------
const readJson = async (relative) => JSON.parse(await readFile(resolve(root, relative), 'utf8'));
const [approved, curated, marketIndex, featured] = await Promise.all([
  readJson('data/approved.json'),
  readJson('data/curated.json'),
  readJson('data/dsh-market-index.json'),
  readJson('data/featured.json'),
]);
const approvedNames = new Set(Object.keys(approved).map((key) => key.toLowerCase()));
const overrideNames = new Set(Object.keys(curated.description_overrides || {}).map((key) => key.toLowerCase()));
const categoryOverrideNames = new Set(Object.keys(curated.category_overrides || {}).map((key) => key.toLowerCase()));
const featuredNames = new Set((featured.entries ?? []).map((entry) => entry.full_name.toLowerCase()));
const subscriptionNames = new Set();
for (const plugin of marketIndex.plugins ?? []) {
  const match = plugin.repository?.url?.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/i);
  if (match) subscriptionNames.add(match[1].replace(/\.git$/, '').toLowerCase());
}

const now = Date.now();
const inLast30d = (date) => now - new Date(date).getTime() <= 30 * 86_400_000;

const churning = [...repoStats.entries()]
  .filter(([slug]) => approvedNames.has(slug))
  .map(([slug, stats]) => ({
    full_name: slug,
    changes: stats.changes,
    flip_events: stats.flipCount,
    last_change: stats.lastChange,
    in_subscription: subscriptionNames.has(slug),
    in_featured: featuredNames.has(slug),
    has_description_override: overrideNames.has(slug),
    has_category_override: categoryOverrideNames.has(slug),
  }))
  .sort((a, b) => b.changes - a.changes || b.flip_events - a.flip_events);

const changedApproved = churning.filter((entry) => entry.changes > 0);
const changed30d = changedApproved.filter((entry) => inLast30d(entry.last_change));
const totalEvents = changedApproved.reduce((sum, entry) => sum + entry.changes, 0);
const flipEvents = changedApproved.reduce((sum, entry) => sum + entry.flip_events, 0);
const subscriptionChanged30d = changed30d.filter((entry) => entry.in_subscription);
const featuredChanged30d = changed30d.filter((entry) => entry.in_featured);
const overrideUpstreamChanged30d = changed30d.filter((entry) => entry.has_description_override);
const unpinnedFlips30d = changed30d.filter((entry) => entry.flip_events > 0 && !entry.has_category_override);

const result = {
  generated_at: new Date().toISOString(),
  window: { since: sinceDate, commits: commits.length, first: commits[0].date, last: commits[commits.length - 1].date },
  totals: {
    approved_repos_changed: changedApproved.length,
    approved_repos_changed_30d: changed30d.length,
    change_events: totalEvents,
    regex_flip_events: flipEvents,
    regex_flip_events_30d_unpinned_rows: unpinnedFlips30d.length,
    subscription_changed_30d: subscriptionChanged30d.length,
    featured_changed_30d: featuredChanged30d.length,
    override_rows_upstream_changed_30d: overrideUpstreamChanged30d.length,
    descriptions_appeared_from_null: newDescEvents.length,
    descriptions_vanished_to_null: removedDescEvents.length,
  },
  intervals,
  churning_top: churning.slice(0, 60),
  high_impact_changed_30d: {
    subscription: subscriptionChanged30d.map((entry) => entry.full_name),
    featured: featuredChanged30d.map((entry) => entry.full_name),
    override_upstream_changed: overrideUpstreamChanged30d.map((entry) => entry.full_name),
    unpinned_regex_flips: unpinnedFlips30d.map((entry) => ({ full_name: entry.full_name, flips: entry.flip_events })),
  },
};

// --- output -------------------------------------------------------------------
const report = [];
report.push('# description drift summary');
report.push('');
report.push(`window: ${result.window.first.slice(0, 10)} → ${result.window.last.slice(0, 10)} (${commits.length} snapshots)`);
report.push('');
report.push('## totals (approved repositories)');
for (const [key, value] of Object.entries(result.totals)) report.push(`- ${key}: ${value}`);
report.push('');
report.push('## recent intervals (last 10)');
for (const interval of intervals.slice(-10)) {
  report.push(`- ${interval.from} → ${interval.to}: ${interval.changed} changed, +${interval.appeared} appeared, -${interval.vanished} vanished`);
}
report.push('');
report.push('## top churn (approved, by change events)');
for (const entry of churning.slice(0, 20)) {
  report.push(`- ${entry.full_name}: ${entry.changes} changes${entry.flip_events > 0 ? ` (${entry.flip_events} regex-flips)` : ''}${entry.in_subscription ? ' [subscription]' : ''}${entry.in_featured ? ' [featured]' : ''}${entry.has_description_override ? ' [desc-override]' : ''}`);
}
report.push('');
report.push(`## high-impact rows changed in last 30d`);
report.push(`- subscription: ${subscriptionChanged30d.length}`);
report.push(`- featured: ${featuredChanged30d.length}`);
report.push(`- rows with description_overrides whose upstream moved: ${overrideUpstreamChanged30d.length}`);
report.push(`- unpinned rows with regex-level category flips: ${unpinnedFlips30d.length}`);

console.log(report.join('\n'));

if (write) {
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'description-drift.json'), `${JSON.stringify(result, null, 2)}\n`);
  const lines = changedApproved.map((entry) => JSON.stringify(entry));
  await writeFile(resolve(outDir, 'description-changes.jsonl'), `${lines.join('\n')}\n`);
  console.log(`\nwrote ${outDir}: description-drift.json, description-changes.jsonl (${lines.length} rows)`);
}
