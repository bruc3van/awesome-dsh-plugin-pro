/** Fixture test for the package-level repository exclusion and its
 * editor's-pick exemption inside generateIndex: no network, no tarballs —
 * fetchPackument serves minimal registry packuments and verifyNpm stamps the
 * repository a real tarball manifest would declare. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateIndex, projectPackage } from './generate.mjs'

test('the real generator CLI completes budget processing before rejecting an empty publication', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'dsh-market-cli-'))
  try {
    const input = join(directory, 'feed.json')
    const output = join(directory, 'index.json')
    await writeFile(input, JSON.stringify({ schema_version: 2, entries: [] }))
    const result = spawnSync(process.execPath, [
      '--import', new URL('./node_modules/tsx/dist/loader.mjs', import.meta.url).href,
      fileURLToPath(new URL('./generate.mjs', import.meta.url)), input, output,
    ], { encoding: 'utf8' })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /No eligible bundles; see staging report/)
    const report = JSON.parse(await readFile(`${output}.report.json`, 'utf8'))
    assert.equal(report.included, 0)
    assert.equal(report.selection.included, 0)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

const manifest = (name) => ({
  name,
  version: '1.0.0',
  description: `${name} fixture`,
  dsh: { bundle: { patch: 'cordis.patch.yml' } },
  engines: { dsh: '>=0.2.0-0' },
  dist: {
    tarball: `https://registry.npmjs.org/${name}/-/${name}-1.0.0.tgz`,
    integrity: `sha512-${'a'.repeat(64)}`,
  },
})
const packument = (name) => ({
  'dist-tags': { latest: '1.0.0' },
  time: { '1.0.0': '2026-10-31T00:00:00.000Z' },
  versions: { '1.0.0': manifest(name) },
})

const repositoryOf = {
  'dsh-claude-slides': 'https://github.com/JimLiu/baoyu-design',
  'dsh-claude-design': 'https://github.com/JimLiu/baoyu-design',
  'dsh-claude-motion': 'https://github.com/JimLiu/baoyu-design',
  'other-blocked-pkg': 'https://github.com/other/blocked-repo',
}

const feed = {
  schema_version: 2,
  entries: [
    {
      full_name: 'JimLiu/baoyu-design',
      stargazers_count: 5887,
      packages: {
        mode: 'command',
        targets: ['dsh-claude-slides', 'dsh-claude-design', 'dsh-claude-motion'].map(
          (install) => ({ profile: 'web', install, command: `dsh plugin --profile web add ${install}` }),
        ),
      },
    },
    {
      full_name: 'other/blocked-repo',
      stargazers_count: 10,
      packages: {
        mode: 'command',
        targets: [
          { profile: 'web', install: 'other-blocked-pkg', command: 'dsh plugin --profile web add other-blocked-pkg' },
        ],
      },
    },
  ],
  featured: { entries: [] },
  featuredRepositories: ['JimLiu/baoyu-design'],
  excludedRepositories: ['jimliu/baoyu-design', 'other/blocked-repo'],
}

test('editor-pick repositories are exempt from the package-level repository block', async () => {
  const { index, diagnostics, repositoryExclusions } = await generateIndex(
    structuredClone(feed),
    (name) => Promise.resolve(packument(name)),
    undefined,
    (plugin) =>
      Promise.resolve({
        plugin: { ...plugin, repository: { url: repositoryOf[plugin.name] } },
        diagnostics: [],
        evidence: [],
      }),
  )
  const names = index.plugins.map((plugin) => plugin.name)
  for (const name of ['dsh-claude-slides', 'dsh-claude-design', 'dsh-claude-motion'])
    assert.ok(names.includes(name), `${name} should survive the block as an editor's pick`)
  assert.ok(!names.includes('other-blocked-pkg'), 'non-featured blocked repository must stay excluded')
  assert.deepEqual(
    repositoryExclusions.map((row) => row.name),
    ['other-blocked-pkg'],
  )
  const exemptions = diagnostics.filter((d) => d.code === 'featured_repository_exempt')
  assert.equal(exemptions.length, 3)
  assert.ok(exemptions.every((d) => d.status === 'included' && /baoyu-design/.test(d.reason)))
})

test('latest feeds keep verified host fallbacks while excluding private and deprecated versions', () => {
  const name = 'host-fallback'
  const registry = { 'dist-tags': { latest: '3.0.0' }, versions: {}, time: {} }
  for (const [version, range, extra] of [
    ['5.0.0', '*', {}],
    ['4.0.0', '*', { private: true }],
    ['3.1.0', '*', { deprecated: 'Use 3.0.0' }],
    ['3.0.0', '0.2.2-rc.3', {}],
    ['2.0.0', '0.2.2-rc.1', {}],
    ['1.0.0', '0.2.1-rc.2', {}],
    ['0.9.0', '*', {}],
  ]) {
    registry.versions[version] = { ...manifest(name), version, engines: { dsh: range }, ...extra }
    registry.time[version] = '2026-11-14T00:00:00Z'
  }
  const result = projectPackage(name, ['latest'], registry)
  // 0.9.0 declares `*` — it is the only release line covering host 0.2.2-rc.5,
  // so it is retained beside the exact-pin fallbacks for the older hosts.
  assert.deepEqual(result.plugin.versions.map(v => v.version), ['3.0.0', '2.0.0', '1.0.0', '0.9.0'])
  assert.equal(result.diagnostics.filter(d => d.code === 'compatibility_version_added').length, 3)
  assert.deepEqual(projectPackage(name, ['3.0.0'], registry).plugin.versions.map(v => v.version), ['3.0.0'])
  for (const [version, code] of [['4.0.0', 'private_package'], ['3.1.0', 'deprecated_version']]) {
    const excluded = projectPackage(name, [version], registry)
    assert.equal(excluded.plugin, undefined)
    assert.equal(excluded.diagnostics[0].code, code)
  }
})

test('budget-driven wave verification verifies featured picks, respects star boundaries, preserves npm-over-Git precedence, and skips low-star tail', async () => {
  const npmFetched = []
  const gitFetched = []
  const row = (full_name, stargazers_count, install) => ({
    full_name,
    stargazers_count,
    packages: { mode: 'command', targets: [{ install }] },
  })
  const makeBigPackument = (name) => {
    const doc = packument(name)
    doc.versions['1.0.0'].description = `${name} ${'x'.repeat(240)}`
    return doc
  }
  const waveFeed = {
    schema_version: 2,
    entries: [
      row('owner/high-1', 100, 'high-1'),
      row('owner/high-git', 100, 'https://github.com/owner/high-git#main'),
      row('owner/mid-a', 50, 'mid-a'),
      row('owner/mid-b', 50, 'mid-b'),
      row('owner/low-npm', 2, 'low-npm'),
      row('owner/low-shared', 1, 'shared-pkg'),
      row('owner/low-git', 0, 'https://github.com/owner/low-git#main'),
      row('owner/featured-pick', 0, 'featured-pick'),
    ],
    featured: { entries: [] },
    featuredRepositories: ['owner/featured-pick'],
  }
  const result = await generateIndex(
    waveFeed,
    async (name) => {
      npmFetched.push(name)
      return makeBigPackument(name)
    },
    async (target) => {
      gitFetched.push(target.url)
      const pkgName = target.url.includes('high-git') ? 'shared-pkg' : 'low-git-pkg'
      const plugin = projectPackage(pkgName, ['latest'], makeBigPackument(pkgName)).plugin
      return { plugins: [plugin], evidence: [], diagnostics: [] }
    },
    undefined,
    { targetBytes: 900, budgetHeadroomBytes: 0, waveTargetSize: 2 },
  )
  const names = result.index.plugins.map((p) => p.name)
  assert.ok(names.includes('featured-pick'), 'low-star featured pick is verified in Wave 0')
  assert.ok(names.includes('high-1'), 'high-star npm survives')
  assert.ok(names.includes('shared-pkg'), 'same-named npm preempts high-star Git target')
  assert.equal(
    result.index.plugins.find((p) => p.name === 'shared-pkg').versions[0].source.type,
    'npm',
    'npm wins over Git even when the npm candidate came from a lower-star wave',
  )
  assert.ok(
    result.diagnostics.some((d) => d.code === 'duplicate_package' && d.name === 'shared-pkg'),
    'preempted Git duplicate is recorded in diagnostics',
  )
  assert.ok(!npmFetched.includes('low-npm'), 'low-star npm tail below budget cutoff is not fetched')
  assert.ok(!gitFetched.includes('https://github.com/owner/low-git'), 'low-star Git tail below budget cutoff is not fetched')
  assert.ok(result.skippedBelowBudgetCutoff >= 2)
  assert.equal(result.candidates, 8)
  assert.equal(result.npmCandidates, 6)
  assert.equal(result.gitCandidates, 2)
  assert.equal(result.verifiedNpmCandidates + result.verifiedGitCandidates, result.verifiedCandidates)
  assert.equal(result.verifiedCandidates + result.skippedBelowBudgetCutoff, result.candidates)
  assert.equal(typeof result.verificationCutoffStars, 'number')
})

test('low-star preempted npm package does not inflate committed bytes and skip higher-star waves', async () => {
  const npmFetched = []
  const row = (full_name, stargazers_count, install) => ({
    full_name,
    stargazers_count,
    packages: { mode: 'command', targets: [{ install }] },
  })
  const makeSizedPackument = (name, pad = 200) => {
    const doc = packument(name)
    doc.versions['1.0.0'].description = `${name} ${'x'.repeat(pad)}`
    return doc
  }
  const feedWithPreemption = {
    schema_version: 2,
    entries: [
      row('owner/top-git', 100, 'https://github.com/owner/top-git#main'),
      row('owner/mid-npm', 50, 'mid-npm'),
      row('owner/low-preempted', 1, 'preempted-pkg'),
      row('owner/tail-npm', 0, 'tail-npm'),
    ],
    featured: { entries: [] },
    featuredRepositories: [],
  }
  const result = await generateIndex(
    feedWithPreemption,
    async (name) => {
      npmFetched.push(name)
      // Give the preempted 1-star npm package a huge description; it must NOT
      // count toward Wave 1 (stars=100) committed bytes and skip stars=50.
      return makeSizedPackument(name, name === 'preempted-pkg' ? 2000 : 200)
    },
    async () => {
      const plugin = projectPackage('preempted-pkg', ['latest'], makeSizedPackument('preempted-pkg', 200)).plugin
      return { plugins: [plugin], evidence: [], diagnostics: [] }
    },
    undefined,
    { targetBytes: 400, budgetHeadroomBytes: 0, waveTargetSize: 1 },
  )
  assert.ok(npmFetched.includes('preempted-pkg'), 'same-named npm still preempts high-star Git')
  assert.ok(npmFetched.includes('mid-npm'), '50-star wave is NOT skipped by a 1-star preempted npm package')
  assert.ok(!npmFetched.includes('tail-npm'), '0-star tail is skipped once committed 50-star wave fills budget')
  assert.equal(result.verificationCutoffStars, 50)
})
