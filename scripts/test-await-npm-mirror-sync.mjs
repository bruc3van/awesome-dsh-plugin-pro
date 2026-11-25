import test from 'node:test';
import assert from 'node:assert/strict';
import { awaitMirrorSync } from './await-npm-mirror-sync.mjs';

// A fake transport: the mirror serves `servedVersion` until `syncsNeeded`
// sync-task firings have happened, then upgrades to the target — modelling
// cnpmcore picking the new release up only after a re-fired task.
function fakeTransport({ target, syncsNeeded = 0, failProbes = 0 } = {}) {
  const state = { syncs: 0, probes: 0, served: '0.19990101.0' };
  const fetchImpl = async (url, init) => {
    if (url.includes('/syncs')) {
      if (init?.method !== 'PUT') throw new Error('sync route must be a PUT');
      state.syncs += 1;
      if (state.syncs >= syncsNeeded) state.served = target;
      return { ok: true, status: 200, json: async () => ({ ok: true }) };
    }
    if (url.endsWith('/latest')) {
      state.probes += 1;
      if (state.probes <= failProbes) throw new Error('mirror unreachable');
      return { ok: true, status: 200, json: async () => ({ version: state.served }) };
    }
    throw new Error(`unexpected fetch ${url}`);
  };
  return { state, fetchImpl };
}

// Instant time: sleep advances the injected clock, so a 12-minute budget runs
// in microseconds while the loop's deadline arithmetic stays real.
function fakeClock() {
  let t = 1000000;
  return {
    now: () => t,
    sleep: async (ms) => { t += ms; },
  };
}

test('an already-synced mirror passes on the first probe without firing a sync task', async () => {
  const { state, fetchImpl } = fakeTransport({ target: '0.20261125.4' });
  state.served = '0.20261125.4';
  const clock = fakeClock();
  const result = await awaitMirrorSync({
    targetVersion: '0.20261125.4', fetchImpl, now: clock.now, sleep: clock.sleep, budgetMs: 1000, pollMs: 100,
  });
  assert.equal(result.checks, 1);
  assert.equal(state.syncs, 0, 'no sync task is fired when the mirror already serves the target');
});

test('a lagging mirror gets its sync task re-fired until it serves the target', async () => {
  const { state, fetchImpl } = fakeTransport({ target: '0.20261125.4', syncsNeeded: 2 });
  const clock = fakeClock();
  const result = await awaitMirrorSync({
    targetVersion: '0.20261125.4', fetchImpl, now: clock.now, sleep: clock.sleep,
    budgetMs: 12 * 60 * 1000, pollMs: 45 * 1000, syncEveryMs: 4 * 60 * 1000,
  });
  assert.equal(state.syncs, 2, 'the first firing syncs nothing (npm still propagating); the re-fired one lands it');
  assert.ok(result.checks >= 2);
});

test('the sync task is re-fired at most once per syncEveryMs while the mirror lags', async () => {
  const { state, fetchImpl } = fakeTransport({ target: '0.20261125.4', syncsNeeded: 99 });
  const clock = fakeClock();
  await assert.rejects(
    awaitMirrorSync({
      targetVersion: '0.20261125.4', fetchImpl, now: clock.now, sleep: clock.sleep,
      budgetMs: 12 * 60 * 1000, pollMs: 45 * 1000, syncEveryMs: 4 * 60 * 1000,
    }),
    /did not serve/,
  );
  // 12 minutes of polling at 45s cadence is ~16 probes, but syncs are rate-limited.
  assert.ok(state.syncs <= 4, `expected at most 4 sync firings in 12 minutes, got ${state.syncs}`);
  assert.ok(state.probes > 10, 'probes are not rate-limited');
});

test('a mirror that never catches up fails loudly after the budget', async () => {
  const { fetchImpl } = fakeTransport({ target: '0.20261125.4', syncsNeeded: 99 });
  const clock = fakeClock();
  await assert.rejects(
    awaitMirrorSync({
      targetVersion: '0.20261125.4', fetchImpl, now: clock.now, sleep: clock.sleep, budgetMs: 300, pollMs: 100,
    }),
    (error) => {
      assert.match(error.message, /registry\.npmmirror\.com did not serve awesome-dsh-plugin-feed@0\.20261125\.4/);
      assert.match(error.message, /live on npmjs\.org/);
      return true;
    },
  );
});

test('transient probe failures do not abort the wait', async () => {
  const { fetchImpl } = fakeTransport({ target: '0.20261125.4', syncsNeeded: 1, failProbes: 2 });
  const clock = fakeClock();
  const result = await awaitMirrorSync({
    targetVersion: '0.20261125.4', fetchImpl, now: clock.now, sleep: clock.sleep,
    budgetMs: 12 * 60 * 1000, pollMs: 45 * 1000, syncEveryMs: 4 * 60 * 1000,
  });
  assert.ok(result.checks >= 3, 'the failing probes are retried, not fatal');
});
