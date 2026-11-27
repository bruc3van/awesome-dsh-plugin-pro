#!/usr/bin/env node
// Build data/plugin-selection-meta.json — normalized zh summaries + bilingual keywords
// for AI selection consumption (dsh-market-pro). Base: phase-3 audit R1 draft;
// overlay: R2 second-pass rows (web-verified, higher quality).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const base = 'Temp/metadata-audit/full-review';
const rows = new Map(); // lowercase full_name -> {s, k}

function clip(s, n) { return s.length > n ? s.slice(0, n) : s; }
function put(fullName, summary, keywords) {
  if (typeof summary !== 'string' || summary.length < 10) return;
  const k = (Array.isArray(keywords) ? keywords : [])
    .filter(x => typeof x === 'string' && x.trim().length > 0)
    .slice(0, 15)
    .map(x => clip(x.trim(), 50));
  if (k.length < 2) return;
  rows.set(fullName.toLowerCase(), { s: clip(summary, 200), k: k });
}

// 1. base layer: R1 draft
const draft = JSON.parse(readFileSync(`${base}/selection-metadata-draft.json`, 'utf8'));
for (const d of draft) put(d.full_name, d.summary_zh, d.keywords);
const baseCount = rows.size;

// 2. overlay: R2 second-pass (higher quality, web-verified)
let overlay = 0;
for (const f of readdirSync(`${base}/decisions-r2`).sort()) {
  for (const line of readFileSync(`${base}/decisions-r2/${f}`, 'utf8').trim().split('\n')) {
    const d = JSON.parse(line);
    const key = d.full_name.toLowerCase();
    const had = rows.has(key);
    put(d.full_name, d.summary_zh, d.keywords);
    if (had) overlay++;
  }
}

// 3. envelope: source_fetched_at mirrors the crawl snapshot; feed_version/published_at
//    are stamped by publish-npm-feed.mjs at publish time (same pattern as market-catalog-v4)
let sourceFetchedAt = null;
try {
  const catalog = JSON.parse(readFileSync('data/market-catalog-v4.json', 'utf8'));
  sourceFetchedAt = catalog.source_fetched_at ?? null;
} catch { /* catalog optional in dev */ }

const meta = {};
for (const [key, val] of [...rows.entries()].sort()) meta[key] = val;
const out = JSON.stringify({ source_fetched_at: sourceFetchedAt, meta }) + '\n';
writeFileSync('data/plugin-selection-meta.json', out);
console.log(`selection-meta: ${rows.size} rows (base ${baseCount}, r2-overlay ${overlay}), ${(out.length / 1024 / 1024).toFixed(2)} MB`);
