#!/usr/bin/env node

// Builds (and with --publish, publishes) the awesome-dsh-plugin-feed npm
// package — the China-reachable distribution channel for the market feeds.
// registry.npmmirror.com is a mirror of registry.npmjs.org, so the package is
// published to npmjs.org and mirrors over within minutes; consumers behind
// the GFW fetch from npmmirror instead of raw.githubusercontent.com.
//
// Package contents: install mappings and market-catalog (the reviewed catalog
// after every market exclusion, each row carrying an explicit install_status,
// plus the published subscription and the editorial shortlist). market-v2 was
// retired on 2026-11-18 — schema 2 stays readable by dsh-market-pro for
// self-hosted legacy URLs, but this repository no longer ships one.
// Versioning is calver 0.YYYYMMDD.N — one data snapshot per day,
// patch bumps for intraday republications.
//
// Idempotency: the data digest (sha256 over all three files) rides along as
// a `feedDigest` field in package.json. Before publishing, the registry's
// latest version is checked — same digest and homepage mean nothing changed and the run
// is a no-op, so the daily workflow hook never piles up empty versions.

import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCompactMarketCatalog, readSafeMarketCatalog } from './safe-market-catalog.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLISH = process.argv.includes('--publish');
const PKG_NAME = 'awesome-dsh-plugin-feed';
const HOMEPAGE = 'https://dsh-market-pro.com/';
const REGISTRY = 'https://registry.npmjs.org';
const DIST = resolve(root, 'dist-npm');

// Validate before reading or publishing: manual runs must obey the same gate as CI.
for (const script of ['validate-packages.mjs', 'validate-market-catalog.mjs']) {
  const result = spawnSync(process.execPath, [resolve(root, 'scripts', script)], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const files = ['data/packages.json', 'data/market-catalog-v4.json'];
const catalog = await readSafeMarketCatalog(new URL('../', import.meta.url));
const compactCatalog = buildCompactMarketCatalog(catalog);
const packagesRaw = await readFile(resolve(root, 'data/packages.json'), 'utf8');
const selectionMetaRaw = await readFile(resolve(root, 'data/plugin-selection-meta.json'), 'utf8');
const selectionMeta = JSON.parse(selectionMetaRaw);
// The digest certifies the data content alone: feed_version/published_at are
// volatile publish metadata stamped into the shipped catalog only after the
// digest is fixed — including them here would make every rebuild a new
// version even when nothing in the data changed.
const catalogContentRaw = `${JSON.stringify(compactCatalog)}\n`;
const reads = [packagesRaw, catalogContentRaw, selectionMetaRaw];
const digest = createHash('sha256').update(reads.join('\n')).digest('hex');

const generatedAt = new Date().toISOString();
const day = generatedAt.slice(0, 10).replaceAll('-', '');

// The workflow's mirror-sync verification step needs the exact version that
// should now be live — re-resolving it from the registry afterwards would
// race the packument's own propagation and could verify the previous latest.
function emitGitHubOutput(version, published) {
  if (!process.env.GITHUB_OUTPUT) return;
  try {
    appendFileSync(process.env.GITHUB_OUTPUT, `feed_version=${version}\nfeed_published=${published}\n`);
  } catch {
    // Best effort: output capture must never turn a good publish into a failure.
  }
}

async function latestInfo() {
  try {
    const res = await fetch(`${REGISTRY}/${PKG_NAME}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(20000),
    });
    if (res.status === 404) return { published: false, versions: [] };
    if (!res.ok) throw new Error(`registry returned HTTP ${res.status}`);
    const doc = await res.json();
    const latest = doc['dist-tags']?.latest;
    return {
      published: true,
      latest,
      feedDigest: doc.versions?.[latest]?.feedDigest,
      homepage: doc.versions?.[latest]?.homepage,
      versions: Object.keys(doc.versions ?? {}),
    };
  } catch (error) {
    // Offline or registry hiccup: building is still fine, publishing is not.
    return { published: false, versions: [], error: error.message };
  }
}

const info = await latestInfo();
if (info.error) {
  console.error(`Registry lookup failed: ${info.error}`);
  if (PUBLISH) process.exit(1);
  console.warn('Building offline only; this version is not confirmed available on npm.');
}
if (info.published && info.feedDigest === digest && info.homepage === HOMEPAGE) {
  console.log(`feed already published as ${info.latest} (digest ${digest.slice(0, 12)}…) — nothing to do.`);
  emitGitHubOutput(info.latest, false);
  process.exit(0);
}

// 0.YYYYMMDD.N — N is the first free patch for today. `extra` folds in
// versions the registry reported as colliding but that a raced packument
// read may not list yet.
function firstFreePatch(versions, extra = []) {
  return Math.max(
    0,
    ...[...versions, ...extra]
      .filter((v) => v.startsWith(`0.${day}.`))
      .map((v) => Number(v.split('.')[2]) + 1)
      .filter((n) => Number.isFinite(n)),
  );
}

await rm(DIST, { recursive: true, force: true });
await mkdir(resolve(DIST, 'data'), { recursive: true });

// The shipped catalog carries its own publish identity so consumers can
// compare freshness across mirrors that answer at different times
// (source_fetched_at cannot: it only changes when the crawl snapshot moves,
// so two publishes sharing one snapshot are indistinguishable without it).
// Stamped per attempt because an E409 retry bumps the version.
function stampedCatalogRaw(version) {
  return `${JSON.stringify({ schema_version: 4, feed_version: version, published_at: generatedAt, ...compactCatalog })}\n`;
}

function stampedSelectionMetaRaw(version) {
  return `${JSON.stringify({ feed_version: version, published_at: generatedAt, ...selectionMeta })}
`;
}

async function writeDataFiles(version) {
  await Promise.all([
    writeFile(resolve(DIST, 'data/packages.json'), packagesRaw),
    writeFile(resolve(DIST, 'data/market-catalog-v4.json'), stampedCatalogRaw(version)),
    writeFile(resolve(DIST, 'data/plugin-selection-meta.json'), stampedSelectionMetaRaw(version)),
  ]);
}

function writeDist(version) {
  const packageJson = {
    name: PKG_NAME,
    version,
    description: 'Data distribution package for the DSH Market Pro community directory for DeepSeek Harness: reviewed plugins, install mappings, subscription, and editorial picks. China-reachable via registry.npmmirror.com.',
    license: 'MIT',
    repository: { type: 'git', url: 'git+https://github.com/bruc3van/awesome-dsh-plugin-pro.git' },
    homepage: HOMEPAGE,
    files: ['data', 'README.md'],
    feedDigest: digest,
    feedGeneratedAt: generatedAt,
  };
  return writeFile(resolve(DIST, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);
}

async function writeReadme(version) {
  const readme = [
    '# awesome-dsh-plugin-feed',
    '',
    'Data distribution package for [DSH Market Pro](https://dsh-market-pro.com/), a third-party DeepSeek Harness (DSH) community plugin directory maintained by Bruce Van. Not affiliated with DeepSeek.',
    '',
    '- **Website:** [dsh-market-pro.com](https://dsh-market-pro.com/) — browse the plugin directory, curated Skills and MCP servers, and subscription instructions.',
    '- **Marketplace plugin:** [dsh-market-pro](https://www.npmjs.com/package/dsh-market-pro) — browse and install plugins inside DSH.',
    '- **Data package:** `awesome-dsh-plugin-feed` — consume catalog snapshots from npm or the China-reachable registry.npmmirror.com mirror when raw.githubusercontent.com is unreachable.',
    '- **Source and curation:** [awesome-dsh-plugin-pro](https://github.com/bruc3van/awesome-dsh-plugin-pro) — catalog data, review records, and generation scripts.',
    '',
    `- version: \`${version}\` (calver \`0.YYYYMMDD.N\`)`,
    `- feed generated at: \`${generatedAt}\``,
    `- data digest (sha256): \`${digest}\``,
    '',
    '## Files',
    '',
    '| File | What it is |',
    '| --- | --- |',
    '| `data/market-catalog-v4.json` | Primary compact market catalog (schema 4): dictionary-indexed categories, short row keys, omitted defaults, and no duplicated subscription icons/keywords plus the embedded subscription and editorial shortlist. Sole catalog feed — schema 3 was retired on 2026-11-22 when the projection crossed the 24 MB ceiling (see AGENTS.md). |',
    '| `data/packages.json` | the hand-maintained install-target source of truth behind every `packages` block |',
    '',
    '## Fetching',
    '',
    '```bash',
    '# npmmirror (China): direct file access, 302-redirected — follow redirects',
    'curl -L -O https://registry.npmmirror.com/awesome-dsh-plugin-feed/latest/files/data/market-catalog-v4.json',
    '',
    '# or via jsDelivr\'s npm CDN',
    'curl -O https://cdn.jsdelivr.net/npm/awesome-dsh-plugin-feed/data/market-catalog-v4.json',
    '',
    '# or the classic way: packument → dist.tarball',
    'npm view awesome-dsh-plugin-feed dist.tarball --registry=https://registry.npmmirror.com',
    '```',
    '',
    'Check freshness with `npm view awesome-dsh-plugin-feed feedDigest feedGeneratedAt` and compare against this repo\u2019s latest commit. The catalog itself carries `feed_version` and `published_at` in its envelope, so a consumer holding responses from several mirrors can tell which one serves the newer publish even when the underlying crawl snapshot (`source_fetched_at`) is the same.',
    '',
    'Data is generated and validated in [bruc3van/awesome-dsh-plugin-pro](https://github.com/bruc3van/awesome-dsh-plugin-pro); see data/review/README.md there for schemas and curation rules.',
    '',
  ].join('\n');
  await writeFile(resolve(DIST, 'README.md'), `${readme}\n`);
}

// Two publishes can land close together (manual and automatic refreshes
// both complete after a review merge); npm's packument read lags its write, so
// the second run may pick a version the first has just published and get an
// E409. The 409 body names the colliding version — trust that over a re-read,
// bump the patch, and retry once.
let version = `0.${day}.${info.published ? firstFreePatch(info.versions) : 0}`;

for (let attempt = 1; ; attempt++) {
  await writeDataFiles(version);
  await writeDist(version);
  await writeReadme(version);
  console.log(`built ${PKG_NAME}@${version} in dist-npm/ — digest ${digest.slice(0, 12)}…`);
  console.log(`  ${files[0]}: ${Buffer.byteLength(packagesRaw)} bytes`);
  console.log(`  ${files[1]}: ${Buffer.byteLength(stampedCatalogRaw(version))} bytes`);

  if (!PUBLISH) {
    console.log('dry run only — pass --publish (requires npm auth, e.g. NODE_AUTH_TOKEN) to release.');
    break;
  }

  const result = spawnSync('npm', ['publish', DIST, '--access', 'public'], {
    cwd: DIST,
    stdio: ['inherit', 'inherit', 'pipe'],
    encoding: 'utf8',
    env: { ...process.env, npm_config_registry: REGISTRY },
  });
  if (result.status === 0) {
    console.log(`published ${PKG_NAME}@${version}. npmmirror mirrors npmjs.org within minutes.`);
    emitGitHubOutput(version, true);
    break;
  }

  const stderr = String(result.stderr ?? '');
  const collided = stderr.match(/Cannot publish over previously staged version "([^"]+)"/);
  if (!collided || attempt >= 2) {
    if (stderr) console.error(stderr.trimEnd());
    console.error('npm publish failed — if the version already exists, rerun; the script bumps the patch per day.');
    process.exit(result.status ?? 1);
  }

  const fresh = await latestInfo();
  const taken = [...(fresh.published ? fresh.versions : []), collided[1]];
  let next = `0.${day}.${firstFreePatch(taken)}`;
  if (next === version) next = `0.${day}.${Number(version.split('.')[2]) + 1}`;
  console.warn(`npm rejected ${version} — already published by a concurrent run; retrying once as ${next}.`);
  version = next;
}
