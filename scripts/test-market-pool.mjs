import test from 'node:test';
import assert from 'node:assert/strict';
import { applyDescriptionOverrides, buildEntry, categoryForRepo, filterPool } from './market-pool.mjs';

const repo = (overrides = {}) => ({
  id: 1,
  full_name: 'owner/repo',
  html_url: 'https://github.com/owner/repo',
  description: 'A browser automation plugin for web tasks',
  language: 'JavaScript',
  stargazers_count: 10,
  archived: false,
  disabled: false,
  pushed_at: '2026-01-01T00:00:00Z',
  default_branch: 'main',
  topics: [],
  ...overrides,
});

const curated = (overrides = {}) => ({
  excluded_repos: {},
  market_exclusions: {},
  leaderboard_exclusions: {},
  category_overrides: {},
  description_overrides: {},
  ...overrides,
});

const approved = { 'owner/repo': '2026-01-01', 'owner/other': '2026-01-01' };
const snapshotOf = (repos) => ({ fetched_at: '2026-01-02T00:00:00Z', repositories: repos });

test('filterPool without description_overrides keeps raw membership and category', () => {
  const snapshot = snapshotOf([repo()]);
  const { repos } = filterPool(snapshot, curated(), approved);
  assert.equal(repos.length, 1);
  assert.equal(repos[0].category[0], 'web-browser');
  assert.equal(repos[0].repo.description, 'A browser automation plugin for web tasks');
});

test('filterPool categorizes with the override-applied description, not the raw one', () => {
  // The raw text matches web-browser (browser/web); the editorial replacement
  // does not, so the row must move to the fallback — the exact divergence the
  // subscription path used to hide from the catalog and the schema-4 feed.
  const snapshot = snapshotOf([repo()]);
  const input = curated({
    description_overrides: { 'owner/repo': '整理本地文件并生成索引报告' },
  });
  const { repos } = filterPool(snapshot, input, approved);
  assert.equal(repos.length, 1);
  assert.equal(repos[0].category[0], 'utilities');
  assert.equal(repos[0].repo.description, '整理本地文件并生成索引报告');
});

test('a repository whose only usable description comes from an override joins the pool', () => {
  const snapshot = snapshotOf([repo({ description: null })]);
  assert.equal(filterPool(snapshot, curated(), approved).repos.length, 0);
  const input = curated({
    description_overrides: { 'owner/repo': '整理本地文件并生成索引报告' },
  });
  const { repos } = filterPool(snapshot, input, approved);
  assert.equal(repos.length, 1);
  assert.equal(repos[0].repo.full_name, 'owner/repo');
});

test('override matching is case-insensitive and never mutates the input snapshot', () => {
  const original = repo();
  const snapshot = snapshotOf([original]);
  const input = curated({
    description_overrides: { 'Owner/Repo': '整理本地文件' },
  });
  const { repos } = filterPool(snapshot, input, approved);
  assert.equal(repos.length, 1);
  assert.equal(repos[0].repo.description, '整理本地文件');
  assert.equal(original.description, 'A browser automation plugin for web tasks');
  assert.notEqual(repos[0].repo, original);
});

test('a blank override falls back to the raw description', () => {
  const snapshot = snapshotOf([repo()]);
  const input = curated({
    description_overrides: { 'owner/repo': '   ' },
  });
  const { repos } = filterPool(snapshot, input, approved);
  assert.equal(repos.length, 1);
  assert.equal(repos[0].repo.description, 'A browser automation plugin for web tasks');
});

test('applyDescriptionOverrides copies only overridden rows', () => {
  const overridden = repo({ full_name: 'owner/repo', id: 1 });
  const plain = repo({ full_name: 'owner/plain', id: 2 });
  const snapshot = snapshotOf([overridden, plain]);
  const result = applyDescriptionOverrides(snapshot, curated({
    description_overrides: { 'owner/repo': '整理本地文件' },
  }));
  assert.notEqual(result, snapshot);
  assert.notEqual(result.repositories[0], overridden);
  assert.equal(result.repositories[1], plain);
  assert.equal(result.repositories[0].description, '整理本地文件');
  assert.equal(overridden.description, 'A browser automation plugin for web tasks');
});

test('applyDescriptionOverrides is a no-op without overrides', () => {
  const snapshot = snapshotOf([repo()]);
  assert.equal(applyDescriptionOverrides(snapshot, curated()), snapshot);
});

test('buildEntry renders the effective override text on the wire', () => {
  const input = curated({
    description_overrides: { 'owner/repo': '整理本地文件并生成索引报告' },
  });
  const { repos } = filterPool(snapshotOf([repo()]), input, approved);
  const entry = buildEntry(repos[0].repo, repos[0].category);
  assert.equal(entry.description, '整理本地文件并生成索引报告');
  assert.equal(entry.category, 'utilities');
});

test('categoryForRepo still honors an explicit category_overrides pin over description text', () => {
  const input = curated({
    category_overrides: { 'owner/repo': 'media-vision' },
    description_overrides: { 'owner/repo': '整理本地文件并生成索引报告' },
  });
  const { repos } = filterPool(snapshotOf([repo()]), input, approved);
  assert.equal(repos[0].category[0], 'media-vision');
});
