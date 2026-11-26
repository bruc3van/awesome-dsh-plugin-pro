#!/usr/bin/env node

// Host-baseline drift probe. DISCOVERY_HOST_VERSIONS is deliberately a fixed
// pin (reproducible verification), but a fixed pin silently goes stale — the
// 0.2.2-rc.3 baseline kept judging compatibility for eight days after the
// host moved to rc.5, blocking plugins that declared support for the current
// host. This probe never blocks a pipeline: it only warns, loudly where CI
// surfaces annotations, when npm latest is no longer covered by the list.

import semver from 'semver'
import { DISCOVERY_HOST_VERSIONS } from './quality.mjs'

const warn = (message) => {
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.log(`::warning file=scripts/host-market/quality.mjs::${message}`)
  }
  console.warn(`host-drift warning: ${message}`)
}

let doc
try {
  const res = await fetch('https://registry.npmjs.org/@deepseek-ai/dsh', {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`registry HTTP ${res.status}`)
  doc = await res.json()
} catch (error) {
  warn(`could not probe @deepseek-ai/dsh on npm (${error.message}); baseline freshness unknown`)
  process.exit(0)
}

const latest = doc?.['dist-tags']?.latest
if (typeof latest !== 'string' || !semver.valid(latest)) {
  warn(`npm dist-tags.latest is missing/invalid (${JSON.stringify(latest)}); baseline freshness unknown`)
  process.exit(0)
}

const tail = DISCOVERY_HOST_VERSIONS.at(-1)
if (DISCOVERY_HOST_VERSIONS.includes(latest)) {
  console.log(`host baseline is current — npm latest ${latest} is in the supported list (tail ${tail})`)
} else if (semver.gt(latest, tail)) {
  warn(
    `@deepseek-ai/dsh latest is ${latest} but DISCOVERY_HOST_VERSIONS stops at ${tail}. ` +
    `Plugins declaring compatibility with only the current host are being refused. ` +
    `Review the release line and extend scripts/host-market/quality.mjs (skip short-lived intermediate rcs, never the next minor's alpha).`,
  )
} else {
  warn(`npm latest ${latest} sorts before the baseline tail ${tail} — unpublish/deprecation upstream? verify the registry state manually`)
}
