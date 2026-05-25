#!/usr/bin/env node
/**
 * Generate per-prompt MDX files from the v1 prompts.json manifest.
 *
 * Source: ~/repos/melis-ai-astro-v1/public/data/prompts.json (335 entries)
 * Output: src/content/prompts/<slug>.mdx
 *
 * One file per prompt. Slug is kebab-cased title; collisions get -2, -3 …
 * The v1 id is preserved in frontmatter as `sourceId` for future re-sync.
 *
 * Run: node scripts/generate-prompts.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const V1_JSON = '/Users/seanmelis/repos/melis-ai-astro-v1/public/data/prompts.json';
const OUT_DIR = path.join(ROOT, 'src/content/prompts');

// ── Category metadata (from v1 src/data/panels.js prompts panel) ──
const CATEGORY_META = {
  'sales':         { label: 'Sales',         group: 'Business',            cover: 'prompts-sales.png' },
  'marketing':     { label: 'Marketing',     group: 'Business',            cover: 'prompts-marketing.png' },
  'finance':       { label: 'Finance',       group: 'Business',            cover: 'prompts-finance.png' },
  'operations':    { label: 'Operations',    group: 'Business',            cover: 'prompts-operations.png' },
  'hiring':        { label: 'Hiring',        group: 'Business',            cover: 'prompts-hiring.png' },
  'customer':      { label: 'Customer',      group: 'Business',            cover: 'prompts-customer.png' },
  'legal':         { label: 'Legal',         group: 'Business',            cover: 'prompts-legal.png' },
  'strategy':      { label: 'Strategy',      group: 'Think & Communicate', cover: 'prompts-strategy.png' },
  'frameworks':    { label: 'Frameworks',    group: 'Think & Communicate', cover: 'prompts-frameworks.png' },
  'writing':       { label: 'Writing',       group: 'Think & Communicate', cover: 'prompts-writing.png' },
  'research':      { label: 'Research',      group: 'Think & Communicate', cover: 'prompts-research.png' },
  'communication': { label: 'Communication', group: 'Think & Communicate', cover: 'prompts-communication.png' },
  'life-design':   { label: 'Life Design',   group: 'Life & Career',       cover: 'prompts-life-design.png' },
  'goals':         { label: 'Goals',         group: 'Life & Career',       cover: 'prompts-goals.png' },
  'creative':      { label: 'Creative',      group: 'Life & Career',       cover: 'prompts-creative.png' },
  'career':        { label: 'Career',        group: 'Life & Career',       cover: 'prompts-career.png' },
  'ai-tools':      { label: 'AI Tools',      group: 'Build',               cover: 'prompts-ai-tools.png' },
  'prompting':     { label: 'Prompting',     group: 'Build',               cover: 'prompts-prompting.png' },
  'coding':        { label: 'Coding',        group: 'Build',               cover: 'prompts-coding.png' },
  'data':          { label: 'Data',          group: 'Build',               cover: 'prompts-data.png' },
  'product-tech':  { label: 'Product',       group: 'Build',               cover: 'prompts-product.png' },
  'seans-edge':    { label: "Sean's Edge",   group: 'Featured',            cover: 'prompts-edge.png' },
};

function kebab(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[‘’‚‛′‵]/g, "'") // smart quotes → '
    .replace(/[“”„‟″‶]/g, '')  // smart double-quotes → drop
    .replace(/['']/g, '')                                     // drop ascii apostrophes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function yamlEscape(s) {
  if (s == null) return '';
  // YAML double-quoted: escape backslash + double-quote, render newlines as \n
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, '\\n')
    .replace(/\t/g, '\\t');
}

function buildMdx(p, slug) {
  const meta = CATEGORY_META[p.cat] || { label: p.catLabel || p.cat, group: 'Build', cover: 'prompts-landing.png' };
  const cover = `/section-rooms/${meta.cover}`;
  const eyebrow = `Prompt Library · ${meta.label}`;
  const lede = p.desc || '';
  const fm = [
    '---',
    `title: "${yamlEscape(p.title)}"`,
    `eyebrow: "${yamlEscape(eyebrow)}"`,
    `lede: "${yamlEscape(lede)}"`,
    `category: "${yamlEscape(meta.label)}"`,
    `categorySlug: "${p.cat}"`,
    `categoryGroup: "${meta.group}"`,
    `subcategory: "${yamlEscape(p.sub || '')}"`,
    `payoff: "${p.uvp || 'save'}"`,
    `icon: "${yamlEscape(p.icon || 'ph-chat-dots')}"`,
    `tier: "${p.tier || 'free'}"`,
    `sourceId: "${p.id}"`,
    `cover: "${cover}"`,
    `prompt: "${yamlEscape(p.prompt)}"`,
    `draft: false`,
    '---',
    '',
    p.desc ? p.desc : '',
    '',
  ].join('\n');
  return fm;
}

function main() {
  const raw = fs.readFileSync(V1_JSON, 'utf8');
  const prompts = JSON.parse(raw);
  if (!Array.isArray(prompts)) throw new Error('expected array');
  console.log(`source: ${prompts.length} prompts`);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const seenSlugs = new Map();
  const failures = [];
  let written = 0;

  for (const p of prompts) {
    try {
      if (!p.title || !p.prompt || !p.cat) {
        failures.push({ id: p.id, reason: 'missing title/prompt/cat' });
        continue;
      }
      const base = kebab(p.title);
      if (!base) {
        failures.push({ id: p.id, reason: 'empty slug after kebab' });
        continue;
      }
      let slug = base;
      const count = seenSlugs.get(base) || 0;
      if (count > 0) slug = `${base}-${count + 1}`;
      seenSlugs.set(base, count + 1);

      const content = buildMdx(p, slug);
      fs.writeFileSync(path.join(OUT_DIR, `${slug}.mdx`), content);
      written += 1;
    } catch (err) {
      failures.push({ id: p.id, reason: String(err.message || err) });
    }
  }

  console.log(`wrote: ${written} files to ${OUT_DIR}`);
  if (failures.length) {
    console.log(`failures (${failures.length}):`);
    failures.slice(0, 30).forEach((f) => console.log(`  ${f.id}: ${f.reason}`));
  }
}

main();
