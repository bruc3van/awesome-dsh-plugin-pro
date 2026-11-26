import test from 'node:test';
import assert from 'node:assert/strict';
import { MAPPING_MAX_IDLE_DAYS, MAPPING_MIN_STARS, mappingGate } from './mapping-gate.mjs';

const SNAPSHOT = '2026-11-18T21:54:53Z';
const daysBefore = (days) => new Date(Date.parse(SNAPSHOT) - days * 86400000).toISOString();

test('the gate has no star minimum and keeps the 90 idle days activity rule', () => {
  assert.equal(MAPPING_MIN_STARS, 0);
  assert.equal(MAPPING_MAX_IDLE_DAYS, 90);
});

test('repositories at any star count with a push in the last 90 days pass', () => {
  assert.deepEqual(mappingGate({ stargazers_count: 0, pushed_at: daysBefore(0) }, SNAPSHOT), { ok: true });
  assert.deepEqual(mappingGate({ stargazers_count: 1, pushed_at: daysBefore(89) }, SNAPSHOT), { ok: true });
  assert.deepEqual(mappingGate({ stargazers_count: 500, pushed_at: daysBefore(90) }, SNAPSHOT), { ok: true });
});

test('a stale push, a missing push date or malformed repo metadata never get a new mapping', () => {
  assert.match(mappingGate({ stargazers_count: 999, pushed_at: daysBefore(91) }, SNAPSHOT).reason, /90 days/);
  assert.equal(mappingGate({ stargazers_count: 999 }, SNAPSHOT).ok, false);
  assert.equal(mappingGate({ pushed_at: daysBefore(1) }, SNAPSHOT).ok, false);
  assert.match(mappingGate({ pushed_at: daysBefore(1) }, SNAPSHOT).reason, /star count/);
});

test('a missing snapshot timestamp is a caller bug, not a silent pass', () => {
  assert.throws(() => mappingGate({ stargazers_count: 9, pushed_at: daysBefore(1) }, undefined), /snapshot timestamp/);
});
