#!/usr/bin/env node
/**
 * Generate `coming-soon` stub MDX files for every venture listed in
 * Sidebar2Ventures.astro that doesn't already have a /content/ventures/*.mdx.
 *
 * For each missing slug, pulls `title` + `description` from the matching
 * v1 page at ~/repos/melis-ai-astro-v1/src/pages/lab/<slug>.astro. Falls
 * back to the Sidebar2Ventures metadata if the v1 page doesn't have a
 * clean description.
 *
 * Run: node scripts/stub-ventures.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const V1_PAGES = '/Users/seanmelis/repos/melis-ai-astro-v1/src/pages/lab';
const OUT_DIR = path.join(ROOT, 'src/content/ventures');
const SIDEBAR_FILE = path.join(ROOT, 'src/components/sidebars/Sidebar2Ventures.astro');

// ── Read venture roster straight from Sidebar2Ventures.astro ─────────
const sidebarSrc = fs.readFileSync(SIDEBAR_FILE, 'utf8');
const re = /\{ slug: '([^']+)',\s*name: '([^']+)',\s*meta: '([^']+)',\s*status: '([^']+)' \}/g;
const roster = [];
let m;
while ((m = re.exec(sidebarSrc)) !== null) {
  roster.push({ slug: m[1], name: m[2], meta: m[3], status: m[4] });
}
console.log(`roster: ${roster.length} ventures parsed from Sidebar2Ventures.astro`);

// ── Existing live MDX files ──────────────────────────────────────────
const existing = new Set(
  fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
);
console.log(`existing live: ${[...existing].join(', ')}`);

// ── Pull v1 title + description for slugs that need stubbing ─────────
function v1Meta(slug) {
  const p = path.join(V1_PAGES, `${slug}.astro`);
  if (!fs.existsSync(p)) return null;
  const src = fs.readFileSync(p, 'utf8');
  const titleM = src.match(/title="([^"]+?)\s*[—–-]\s*melis\.ai"/);
  const descM = src.match(/description="([^"]+)"/);
  return {
    title: titleM ? titleM[1].trim() : null,
    description: descM ? descM[1].trim() : null,
  };
}

function yamlEscape(s) {
  if (s == null) return '';
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, ' ')
    .trim();
}

function emToHtml(s) {
  // No-op for now; v1 ledes are plain. Reserved for future titleHtml.
  return s;
}

const TODAY = new Date().toISOString().slice(0, 10);
const stubs = [];
const skipped = [];
const failed = [];

for (const v of roster) {
  if (existing.has(v.slug)) {
    skipped.push(v.slug);
    continue;
  }
  const v1 = v1Meta(v.slug);
  const title = (v1 && v1.title) || v.name;
  const lede = (v1 && v1.description) || v.meta;
  if (!title) {
    failed.push({ slug: v.slug, reason: 'no title' });
    continue;
  }
  const frontmatter = [
    '---',
    `title: "${yamlEscape(title)}"`,
    `eyebrow: "The Lab · ${v.status}"`,
    `lede: "${yamlEscape(lede)}"`,
    `status: "coming-soon"`,
    `stage: "${mapStage(v.status)}"`,
    `groupV1: "${v.status}"`,
    `publishedAt: "${TODAY}"`,
    'draft: false',
    '---',
    '',
    'Detail page coming. This venture is in flight — check back soon, or browse the live ventures above.',
    '',
  ].join('\n');
  const outPath = path.join(OUT_DIR, `${v.slug}.mdx`);
  fs.writeFileSync(outPath, frontmatter);
  stubs.push(v.slug);
}

function mapStage(status) {
  switch (status) {
    case 'Live': return 'live';
    case 'Building': return 'building';
    case 'Research': return 'concept';
    case 'Paused': return 'building';
    case 'Archived': return 'archived';
    case 'Past': return 'archived';
    default: return 'building';
  }
}

console.log(`\nstubs written: ${stubs.length}`);
stubs.forEach((s) => console.log(`  ${s}`));
console.log(`\nskipped (already live): ${skipped.length}`);
skipped.forEach((s) => console.log(`  ${s}`));
if (failed.length) {
  console.log(`\nfailed: ${failed.length}`);
  failed.forEach((f) => console.log(`  ${f.slug}: ${f.reason}`));
}
