#!/usr/bin/env node

// Verifies that registry.npmmirror.com actually serves the freshly published
// feed version on the exact endpoint consumers read — /latest, whose CDN cache
// has been observed lagging the packument dist-tags — re-firing cnpmcore's
// sync task while it lags. The 2026-11-25 incident is why this exists: the
// publish workflow fired one sync request eleven seconds after npm publish,
// before the registry had propagated, the task synced zero versions and the
// mirror served the previous feed for nearly an hour while every consumer in
// China raced onto it. Silent staleness is worse than a red workflow, so an
// exhausted budget exits nonzero.
//
// Usage: node scripts/await-npm-mirror-sync.mjs [target-version]
// Without an argument the target resolves from the npmjs registry's latest
// dist-tag (fine for manual runs; CI passes the publisher's own output).

import { pathToFileURL } from 'node:url';

const PKG_NAME = 'awesome-dsh-plugin-feed';
const NPMJS_PACKUMENT = `https://registry.npmjs.org/${PKG_NAME}`;
const MIRROR_LATEST = `https://registry.npmmirror.com/${PKG_NAME}/latest`;
const SYNC_ROUTE = `https://registry-direct.npmmirror.com/-/package/${PKG_NAME}/syncs`;

const BUDGET_MS = Number(process.env.MIRROR_SYNC_BUDGET_MS ?? 12 * 60 * 1_000);
const POLL_MS = 45 * 1_000;
const SYNC_EVERY_MS = 4 * 60 * 1_000;
const TARGET_LOOKUP_RETRIES = 5;

const realSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url, fetchImpl, init) {
  const res = await fetchImpl(url, { signal: AbortSignal.timeout(20000), ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// The /latest document doubles as the consumer's probe: it carries the
// version cnpmcore currently serves a client asking for the newest release.
export async function mirrorServedVersion(fetchImpl = fetch) {
  const doc = await fetchJson(MIRROR_LATEST, fetchImpl);
  return typeof doc?.version === 'string' ? doc.version : '';
}

export async function npmjsLatestVersion(fetchImpl = fetch) {
  const doc = await fetchJson(NPMJS_PACKUMENT, fetchImpl);
  const latest = doc?.['dist-tags']?.latest;
  return typeof latest === 'string' ? latest : '';
}

/**
 * Poll the mirror until it serves targetVersion, re-firing the sync task at
 * most once per syncEveryMs. Returns a summary; throws once the budget is
 * exhausted. Time and transport are injectable so the tests run in ms.
 */
export async function awaitMirrorSync({
  targetVersion,
  budgetMs = BUDGET_MS,
  pollMs = POLL_MS,
  syncEveryMs = SYNC_EVERY_MS,
  fetchImpl = fetch,
  sleep = realSleep,
  now = () => Date.now(),
  log = () => {},
}) {
  if (!targetVersion) throw new Error('a target version is required');
  const started = now();
  const deadline = started + budgetMs;
  let lastSyncAt = Number.NEGATIVE_INFINITY;
  let checks = 0;
  for (;;) {
    checks += 1;
    let served = '';
    try {
      served = await mirrorServedVersion(fetchImpl);
    } catch (error) {
      log(`mirror probe failed (${error.message}); retrying`);
    }
    if (served === targetVersion) {
      return { checks, elapsedMs: now() - started };
    }
    if (now() - lastSyncAt >= syncEveryMs) {
      lastSyncAt = now();
      try {
        await fetchImpl(SYNC_ROUTE, { method: 'PUT', signal: AbortSignal.timeout(20000) });
        log(`sync task re-fired; mirror serves ${served || 'nothing'}, want ${targetVersion}`);
      } catch (error) {
        log(`sync request failed (${error.message}); the mirror's own schedule may still catch up`);
      }
    } else {
      log(`mirror serves ${served || 'nothing'}, want ${targetVersion}; waiting`);
    }
    if (now() + pollMs > deadline) break;
    await sleep(pollMs);
  }
  throw new Error(
    `registry.npmmirror.com did not serve ${PKG_NAME}@${targetVersion} within ${Math.round(budgetMs / 60000)} minutes`
    + ` — the publish IS live on npmjs.org, but China consumers keep reading the previous feed until the mirror catches up.`,
  );
}

async function resolveTarget(fetchImpl, sleep, log) {
  const arg = process.argv[2]?.trim();
  if (arg) return arg;
  for (let attempt = 1; ; attempt++) {
    try {
      const latest = await npmjsLatestVersion(fetchImpl);
      if (latest) return latest;
    } catch (error) {
      log(`npmjs lookup failed (${error.message})`);
    }
    if (attempt >= TARGET_LOOKUP_RETRIES) throw new Error('no target version argument and the npmjs registry never answered');
    log(`waiting for the npmjs packument to propagate (attempt ${attempt})`);
    await sleep(10000);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const log = (line) => console.log(`[await-mirror-sync] ${line}`);
  try {
    const target = await resolveTarget(fetch, realSleep, log);
    log(`target ${PKG_NAME}@${target}`);
    const { checks, elapsedMs } = await awaitMirrorSync({ targetVersion: target, log });
    log(`mirror serves ${target} after ${checks} probe(s), ${Math.round(elapsedMs / 1000)}s`);
  } catch (error) {
    console.error(`::error::${error.message}`);
    process.exit(1);
  }
}
