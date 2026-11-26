// Read-only metadata audit for the reviewed catalog: baseline counts, category
// resolution analysis, description-quality flags, subscription cross-layer
// consistency, and the market-shadow parity check. Produces the phase-0/1
// baseline for the market-pro selection data audit.
//
// Usage:
//   node scripts/audit-metadata.mjs                 print the summary to stdout
//   node scripts/audit-metadata.mjs --write         also write artifacts:
//     <out>/baseline.json           machine-readable summary (small, committable)
//     <out>/priority-queue.jsonl    one row per queued repository, review ordering
//     <out>/flagged-rows.jsonl      every catalog row with at least one flag
//   node scripts/audit-metadata.mjs --write --out-dir Temp/metadata-audit
//
// The script never writes to data/ inputs; it is safe to run at any time.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadState, catalogRepositories } from './render.mjs';
import { categoryForRepo, filterPool, marketBlockedRepoNames, TEXT_LIMITS } from './market-pool.mjs';
import { categoryRules } from './categories.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const write = args.includes('--write');
const outDirArg = args.find((arg) => arg.startsWith('--out-dir='));
const outDir = outDirArg ? resolve(root, outDirArg.slice('--out-dir='.length)) : resolve(root, 'Temp/metadata-audit');

const readJson = async (relative) => JSON.parse(await readFile(resolve(root, relative), 'utf8'));

// --- description-quality flag heuristics -------------------------------------
// Deterministic recall-oriented queues for the later LLM pass; false positives
// cost review tokens, false negatives hide broken rows, so the patterns err on
// the inclusive side and every flag stays individually explainable. The generic
// remainder threshold (<10 chars after boilerplate stripping) deliberately
// catches name-only descriptions like "MemoryLake Harness" at the cost of
// some terse-but-meaningful ones — the semantic pass adjudicates.

const GENERIC_STRIP = /deepseek|harness|dsh|plugins?|插件|extensions?|扩展|official|open[\s-]?source|开源|tools?|工具|the|a|an|for|and|with|of|to|in|on|by|is|are|的|一个|一款|一款|基于|面向|用于|支持|让|your|you/gi;

function genericRemainder(description) {
  return description
    .replace(GENERIC_STRIP, '')
    .replace(/[\s\p{P}\p{S}]+/gu, '');
}

function codePoints(value) {
  return [...value].length;
}

function normalizeForDuplicate(description) {
  return description.replace(/\s+/g, ' ').trim().toLowerCase();
}

function descriptionFlags(description) {
  const flags = [];
  if (codePoints(description) < 20) flags.push('desc-too-short');
  if (/\?{3,}/.test(description) || /�/.test(description)) flags.push('desc-mojibake');
  if (genericRemainder(description).length < 10) flags.push('desc-generic');
  if (codePoints(description) > TEXT_LIMITS.description) flags.push('desc-wire-truncated');
  return flags;
}

// --- category resolution analysis ---------------------------------------------

function haystackFor(repo) {
  const name = repo.name || String(repo.full_name).split('/')[1];
  return [name, repo.description, ...(repo.topics || [])].filter(Boolean).join(' ');
}

function categoryResolution(categoryOverrideMap, repo) {
  const override = categoryOverrideMap.get(String(repo.full_name).toLowerCase());
  if (override) {
    return { source: 'override', category: override, matches: [] };
  }
  const haystack = haystackFor(repo);
  const matches = categoryRules.filter((rule) => rule[3].test(haystack)).map((rule) => rule[0]);
  if (matches.length === 0) return { source: 'fallback', category: 'utilities', matches };
  return {
    source: matches.length === 1 ? 'rule-single' : 'rule-multi',
    category: matches[0],
    matches,
  };
}

// --- main ---------------------------------------------------------------------

const state = await loadState();
const [packages, index, indexReport, featured, presentation] = await Promise.all([
  readJson('data/packages.json'),
  readJson('data/dsh-market-index.json'),
  readJson('data/dsh-market-index.report.json'),
  readJson('data/featured.json'),
  readJson('scripts/host-market/presentation.json'),
]);

const catalog = catalogRepositories(state);
const pool = filterPool(state.snapshot, state.curated, state.approved);
const poolNames = new Set(pool.repos.map(({ repo }) => repo.full_name.toLowerCase()));
const marketBlocked = marketBlockedRepoNames(state.curated);
const marketRows = catalog.filter((repo) => !marketBlocked.has(repo.full_name.toLowerCase()));

// High-impact sets.
const subscriptionByRepo = new Map();
for (const plugin of index.plugins ?? []) {
  const match = plugin.repository?.url?.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/i);
  if (!match) continue;
  const slug = match[1].replace(/\.git$/, '').toLowerCase();
  if (!subscriptionByRepo.has(slug)) subscriptionByRepo.set(slug, plugin);
}
const featuredNames = new Set((featured.entries ?? []).map((entry) => entry.full_name.toLowerCase()));
const mappings = new Map(Object.entries(packages.entries ?? {}).map(([key, value]) => [key.toLowerCase(), value]));
const installStatusOf = (slug) => {
  const record = mappings.get(slug);
  if (record === undefined) return 'none';
  return record.install_mode === 'manual' ? 'manual' : 'command';
};
const presentationNeeded = new Set(
  (indexReport.diagnostics ?? [])
    .filter((entry) => entry.code === 'presentation_review_needed')
    .map((entry) => String(entry.name ?? '')),
);
const presentationReviewed = new Set(Object.keys(presentation.plugins ?? {}));

// Per-row analysis over the catalog (the full user-visible reviewed set).
const duplicateGroups = new Map();
for (const repo of catalog) {
  const key = normalizeForDuplicate(repo.description);
  const group = duplicateGroups.get(key);
  if (group) group.push(repo.full_name);
  else duplicateGroups.set(key, [repo.full_name]);
}
const duplicatedNames = new Set();
let duplicateGroupCount = 0;
for (const group of duplicateGroups.values()) {
  if (group.length > 1) {
    duplicateGroupCount += 1;
    for (const name of group) duplicatedNames.add(name.toLowerCase());
  }
}

const categoryOverrideMap = new Map(
  Object.entries(state.curated.category_overrides || {}).map(([key, value]) => [key.toLowerCase(), value]),
);
const descriptionOverrideNames = new Set(
  Object.keys(state.curated.description_overrides || {}).map((key) => key.toLowerCase()),
);
const approvedByLower = new Map(
  Object.entries(state.approved).map(([key, value]) => [key.toLowerCase(), value]),
);
const catalogNameSet = new Set(catalog.map((repo) => repo.full_name.toLowerCase()));

const rows = [];
const categorySourceCounts = {};
const categoryCounts = {};
const collisionPairs = new Map();
const firstMatchInMulti = {};
const flagCounts = {};
const sourceCounts = { ruleSingle: 0, ruleMulti: 0, fallback: 0, override: 0 };
const multiMatchFirstCategory = {};

for (const repo of catalog) {
  const slug = repo.full_name.toLowerCase();
  const resolution = categoryResolution(categoryOverrideMap, repo);
  const flags = descriptionFlags(repo.description);
  if (duplicatedNames.has(slug)) flags.push('desc-duplicate');
  if (descriptionOverrideNames.has(slug)) {
    flags.push('desc-overridden');
  }
  const inSubscription = subscriptionByRepo.has(slug);
  const inFeatured = featuredNames.has(slug);
  const plugin = subscriptionByRepo.get(slug);
  const installStatus = installStatusOf(slug);
  const approvedDate = approvedByLower.get(slug) ?? '';
  const postRecalibration = approvedDate >= '2026-11-19';
  const hasCategoryOverride = resolution.source === 'override';

  categorySourceCounts[resolution.source] = (categorySourceCounts[resolution.source] ?? 0) + 1;
  categoryCounts[resolution.category] = (categoryCounts[resolution.category] ?? 0) + 1;
  if (resolution.source === 'rule-multi') {
    multiMatchFirstCategory[resolution.category] = (multiMatchFirstCategory[resolution.category] ?? 0) + 1;
    for (let i = 0; i < resolution.matches.length; i += 1) {
      for (let j = i + 1; j < resolution.matches.length; j += 1) {
        const pair = [resolution.matches[i], resolution.matches[j]].sort().join('+');
        collisionPairs.set(pair, (collisionPairs.get(pair) ?? 0) + 1);
      }
    }
  }
  for (const flag of flags) flagCounts[flag] = (flagCounts[flag] ?? 0) + 1;

  // Priority-queue reasoning. Every row of the catalog will eventually pass
  // the semantic review; the queue only orders them by impact x uncertainty.
  const reasons = [];
  const uncertainty = [];
  if (resolution.source === 'rule-multi') uncertainty.push('category-multi-match');
  if (resolution.source === 'fallback') uncertainty.push('category-fallback');
  for (const flag of flags) {
    if (flag === 'desc-overridden' || flag === 'desc-wire-truncated') continue;
    uncertainty.push(flag);
  }
  if (plugin !== undefined && presentationNeeded.has(plugin.name)) reasons.push(['P0', 'presentation-review-needed']);
  if ((inSubscription || inFeatured) && uncertainty.length > 0) reasons.push(['P0', 'high-impact-with-uncertainty']);
  if (inSubscription) reasons.push(['P1', 'subscription']);
  if (inFeatured) reasons.push(['P1', 'featured']);
  if (flags.includes('desc-mojibake')) reasons.push(['P1', 'mojibake']);
  if (uncertainty.length > 0 && installStatus === 'command') reasons.push(['P1', 'installable-with-uncertainty']);
  if (uncertainty.length > 0) reasons.push(['P2', 'uncertainty']);
  if (!hasCategoryOverride && postRecalibration) reasons.push(['P3', 'post-recalibration-uncovered']);

  if (reasons.length === 0) continue;
  reasons.sort((a, b) => a[0].localeCompare(b[0]));
  const tier = reasons[0][0];
  rows.push({
    full_name: repo.full_name,
    tier,
    reasons: reasons.map(([, code]) => code),
    uncertainty,
    category: resolution.category,
    category_source: resolution.source,
    category_matches: resolution.matches,
    flags,
    stars: repo.stargazers_count,
    pushed_at: repo.pushed_at,
    install_status: installStatus,
    in_subscription: inSubscription,
    in_featured: inFeatured,
    in_market_pool: poolNames.has(slug),
    approved_date: approvedDate,
  });
}

rows.sort((a, b) => a.tier.localeCompare(b.tier)
  || (b.stars - a.stars)
  || (a.full_name < b.full_name ? -1 : 1));

const tierCounts = {};
for (const row of rows) tierCounts[row.tier] = (tierCounts[row.tier] ?? 0) + 1;

// --- market-shadow parity -----------------------------------------------------
// Before the 2026-11-26 fix, the subscription path pooled the RAW snapshot
// while loadState() consumers (catalog volumes, schema-4 feed) categorized
// with description_overrides applied. To document what the fix changes — and
// to keep watching the invariant — this replicates the legacy semantics
// locally and diffs it against the current filterPool output, then verifies
// that raw-input and override-applied-input pooling now coincide exactly.
const rawSnapshot = await readJson('data/repositories.json');
const approvedLower = new Set(Object.keys(state.approved).map((key) => key.toLowerCase()));
const excludedLower = new Set(Object.keys(state.curated.excluded_repos || {}).map((key) => key.toLowerCase()));
const legacyRows = new Map();
for (const repo of rawSnapshot.repositories || []) {
  if (!repo.description || !String(repo.description).trim()) continue;
  if (repo.archived === true || repo.disabled === true) continue;
  const lower = String(repo.full_name).toLowerCase();
  if (!approvedLower.has(lower)) continue;
  if (excludedLower.has(lower) || marketBlocked.has(lower)) continue;
  legacyRows.set(lower, { category: categoryForRepo(state.curated, repo)[0] });
}
const fixedPool = filterPool(rawSnapshot, state.curated, state.approved);
const fixedByName = new Map(fixedPool.repos.map(({ repo, category }) => [repo.full_name.toLowerCase(), { repo, category }]));
const shadowDivergence = [];
const allLegacyNames = new Set([...legacyRows.keys(), ...fixedByName.keys()]);
for (const slug of allLegacyNames) {
  const legacy = legacyRows.get(slug);
  const fixed = fixedByName.get(slug);
  if (legacy === undefined) {
    shadowDivergence.push({ full_name: slug, kind: 'membership-added-by-fix', effective_category: fixed.category[0] });
  } else if (fixed === undefined) {
    shadowDivergence.push({ full_name: slug, kind: 'membership-removed-by-fix', raw_category: legacy.category });
  } else if (legacy.category !== fixed.category[0]) {
    shadowDivergence.push({ full_name: slug, kind: 'category', raw_category: legacy.category, effective_category: fixed.category[0] });
  }
}
shadowDivergence.sort((a, b) => (a.full_name < b.full_name ? -1 : 1));
// Invariant after the fix: pooling the raw mirror and pooling the loadState()
// (override-applied) snapshot must yield identical membership and categories.
const effectivePoolCheck = filterPool(state.snapshot, state.curated, state.approved);
const parityViolations = [];
const effectiveCheckByName = new Map(effectivePoolCheck.repos.map(({ repo, category }) => [repo.full_name.toLowerCase(), category[0]]));
for (const [slug, { category }] of fixedByName) {
  const other = effectiveCheckByName.get(slug);
  if (other !== category[0]) parityViolations.push(slug);
}
if (effectiveCheckByName.size !== fixedByName.size) parityViolations.push(`pool size differs: raw=${fixedByName.size} effective=${effectiveCheckByName.size}`);

// --- subscription cross-layer -------------------------------------------------
const subscriptionStats = {
  plugins: index.plugins?.length ?? 0,
  missingDescription: 0,
  stringDescription: 0,
  localizedDescription: 0,
  missingKeywords: 0,
  presentationReviewed: 0,
  presentationReviewNeeded: presentationNeeded.size,
  reposInCatalog: 0,
  reposMissingFromCatalog: 0,
};
const missingDescriptionPlugins = [];
for (const plugin of index.plugins ?? []) {
  const description = plugin.description;
  if (description === undefined || description === null || description === '') {
    subscriptionStats.missingDescription += 1;
    missingDescriptionPlugins.push(plugin.name);
  } else if (typeof description === 'string') {
    subscriptionStats.stringDescription += 1;
  } else {
    subscriptionStats.localizedDescription += 1;
  }
  if (!Array.isArray(plugin.metadata?.keywords) || plugin.metadata.keywords.length === 0) {
    subscriptionStats.missingKeywords += 1;
  }
  if (presentationReviewed.has(plugin.name)) subscriptionStats.presentationReviewed += 1;
  const match = plugin.repository?.url?.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/i);
  if (match) {
    const slug = match[1].replace(/\.git$/, '').toLowerCase();
    if (catalogNameSet.has(slug)) subscriptionStats.reposInCatalog += 1;
    else subscriptionStats.reposMissingFromCatalog += 1;
  }
}

// --- aggregate ----------------------------------------------------------------
const summary = {
  generated_at: new Date().toISOString(),
  snapshot_fetched_at: state.snapshot.fetched_at,
  inventory: {
    snapshot_total: state.snapshot.total_count,
    snapshot_rows: state.snapshot.repositories.length,
    approved: Object.keys(state.approved).length,
    catalog_rows: catalog.length,
    market_pool_rows: pool.repos.length,
    market_rows_after_blocklist: marketRows.length,
    packages_entries: Object.keys(packages.entries ?? {}).length,
    installable_command: [...mappings.values()].filter((record) => record.install_mode !== 'manual').length,
    install_manual: [...mappings.values()].filter((record) => record.install_mode === 'manual').length,
    subscription_plugins: index.plugins?.length ?? 0,
    featured_entries: featured.entries?.length ?? 0,
    description_overrides: Object.keys(state.curated.description_overrides ?? {}).length,
    category_overrides: Object.keys(state.curated.category_overrides ?? {}).length,
  },
  categories: {
    source_counts: categorySourceCounts,
    category_counts: Object.fromEntries(Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])),
    multi_match_first_category: Object.fromEntries(Object.entries(multiMatchFirstCategory).sort((a, b) => b[1] - a[1])),
    top_collision_pairs: Object.fromEntries([...collisionPairs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)),
  },
  descriptions: {
    flag_counts: Object.fromEntries(Object.entries(flagCounts).sort((a, b) => b[1] - a[1])),
    duplicate_groups: duplicateGroupCount,
    rows_in_duplicate_groups: duplicatedNames.size,
  },
  subscription: subscriptionStats,
  missing_description_plugins: missingDescriptionPlugins,
  shadow_divergence: {
    count: shadowDivergence.length,
    note: 'legacy(raw) vs fixed(effective) pool semantics — documents what the 2026-11-26 filterPool fix changes',
    rows: shadowDivergence,
  },
  pool_parity_violations: parityViolations,
  priority_queue: {
    total_queued: rows.length,
    tier_counts: tierCounts,
    catalog_rows: catalog.length,
  },
};

// --- output -------------------------------------------------------------------
const line = (text = '') => text;
const report = [];
report.push('# metadata audit baseline summary');
report.push('');
report.push(`snapshot: ${summary.snapshot_fetched_at}`);
report.push('');
report.push('## inventory');
for (const [key, value] of Object.entries(summary.inventory)) report.push(`- ${key}: ${value}`);
report.push('');
report.push('## category sources');
for (const [key, value] of Object.entries(categorySourceCounts).sort()) report.push(`- ${key}: ${value}`);
report.push('');
report.push('## category distribution');
for (const [key, value] of Object.entries(summary.categories.category_counts)) report.push(`- ${key}: ${value}`);
report.push('');
report.push('## multi-match first category');
for (const [key, value] of Object.entries(summary.categories.multi_match_first_category)) report.push(`- ${key}: ${value}`);
report.push('');
report.push('## top collision pairs');
for (const [key, value] of Object.entries(summary.categories.top_collision_pairs)) report.push(`- ${key}: ${value}`);
report.push('');
report.push('## description flags');
for (const [key, value] of Object.entries(summary.descriptions.flag_counts)) report.push(`- ${key}: ${value}`);
report.push(`- duplicate groups: ${duplicateGroupCount} (${duplicatedNames.size} rows)`);
report.push('');
report.push('## subscription cross-layer');
for (const [key, value] of Object.entries(subscriptionStats)) report.push(`- ${key}: ${value}`);
report.push('');
report.push(`## shadow divergence (legacy raw vs fixed effective): ${shadowDivergence.length}`);
for (const row of shadowDivergence.slice(0, 30)) report.push(`- ${row.full_name}: ${row.kind}${row.raw_category ? ` raw=${row.raw_category}` : ''}${row.effective_category ? ` effective=${row.effective_category}` : ''}`);
report.push(`## pool parity violations (must be 0 after fix): ${parityViolations.length}`);
for (const row of parityViolations.slice(0, 10)) report.push(`- ${row}`);
report.push('');
report.push('## priority queue tiers');
for (const [key, value] of Object.entries(tierCounts).sort()) report.push(`- ${key}: ${value}`);
report.push(`- total queued: ${rows.length} / ${catalog.length} catalog rows`);

console.log(report.join('\n'));

if (write) {
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'baseline.json'), `${JSON.stringify(summary, null, 2)}\n`);
  const queueLines = rows.map((row) => JSON.stringify(row));
  await writeFile(resolve(outDir, 'priority-queue.jsonl'), `${queueLines.join('\n')}\n`);
  const flagged = rows.filter((row) => row.flags.length > 0 || row.uncertainty.length > 0);
  await writeFile(resolve(outDir, 'flagged-rows.jsonl'), `${flagged.map((row) => JSON.stringify(row)).join('\n')}\n`);
  console.log(`\nwrote ${outDir}: baseline.json, priority-queue.jsonl (${rows.length} rows), flagged-rows.jsonl (${flagged.length} rows)`);
}
