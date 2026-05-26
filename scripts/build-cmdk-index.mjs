#!/usr/bin/env node
/**
 * Build-time script — embed every searchable content-collection item
 * for the ⌘K command palette via @huggingface/transformers (Node ONNX
 * bindings) using sentence-transformers/all-MiniLM-L6-v2 (384 dims,
 * quantised).
 *
 * Concatenates `title + eyebrow + lede + payoff + category + tags` as
 * the embedding input — that's the text a semantic match should hit.
 *
 * Output: src/data/cmdk-embeddings.json — schema is
 *   { dim: 384, items: [ { kind, title, eyebrow, meta, icon, href, vector } ] }
 * Total file ~750 KB raw, ~200 KB gzipped over the wire.
 *
 * Wired into `pnpm prebuild` so every Vercel deploy regenerates.
 *
 * Local dev: model + tokenizer cache at ~/.cache/huggingface/.
 * Re-running this script with the same model is fast (~10 s — model
 * load + tokenise + 485 forward passes batched).
 *
 * Run: node scripts/build-cmdk-index.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
// Written to /public so the runtime can fetch() lazily on first ⌘K open.
// Keeps the JSON out of every page's JS bundle.
const OUT_PATH = path.join(ROOT, 'public/cmdk-index.json');
const CONTENT_ROOT = path.join(ROOT, 'src/content');

// ─── Build the same index CommandPalette.astro builds, but for Node ───
//
// We can't import('astro:content') outside the Astro runtime, so we
// read MDX frontmatter ourselves with a minimal YAML parser. The
// collections we care about live as <type>/<slug>.mdx files.

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  m[1].split('\n').forEach((line) => {
    const colon = line.indexOf(':');
    if (colon < 1) return;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    // Strip quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    fm[key] = val;
  });
  return fm;
}

function readCollection(dir) {
  const root = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(root)) return [];
  const walk = (p, base = '') => {
    const out = [];
    for (const ent of fs.readdirSync(p, { withFileTypes: true })) {
      const full = path.join(p, ent.name);
      const rel = path.join(base, ent.name);
      if (ent.isDirectory()) out.push(...walk(full, rel));
      else if (ent.isFile() && /\.(mdx?|json)$/.test(ent.name)) {
        const slug = rel.replace(/\.(mdx?|json)$/, '');
        const src = fs.readFileSync(full, 'utf8');
        const data = parseFrontmatter(src);
        if (data.draft === true || data.draft === 'true') continue;
        if (data.status === 'coming-soon') continue;
        out.push({ slug, data });
      }
    }
    return out;
  };
  return walk(root);
}

const articles  = readCollection('articles');
const newsletter = readCollection('newsletter');
const courses   = readCollection('courses');
const products  = readCollection('products');
const prompts   = readCollection('prompts');
const recos     = readCollection('recos');
const ventures  = readCollection('ventures');
const dossiers  = readCollection('dossiers');
const services  = readCollection('services');
const exhibits  = readCollection('exhibits');

console.log(`source counts:`);
console.log(`  articles:   ${articles.length}`);
console.log(`  newsletter: ${newsletter.length}`);
console.log(`  courses:    ${courses.length}`);
console.log(`  products:   ${products.length}`);
console.log(`  prompts:    ${prompts.length}`);
console.log(`  recos:      ${recos.length}`);
console.log(`  ventures:   ${ventures.length}`);
console.log(`  dossiers:   ${dossiers.length}`);
console.log(`  services:   ${services.length}`);
console.log(`  exhibits:   ${exhibits.length}`);

const items = [
  ...articles.map((a) => ({
    kind: 'article', title: a.data.title, eyebrow: 'Article',
    meta: a.data.eyebrow || '', icon: 'ph-newspaper',
    href: `/articles/${a.slug}/`,
    extra: a.data.lede || '',
  })),
  ...newsletter.map((n) => ({
    kind: 'issue', title: n.data.title, eyebrow: 'Newsletter',
    meta: '', icon: 'ph-envelope',
    href: `/newsletter/${n.slug}/`,
    extra: n.data.lede || '',
  })),
  ...courses.map((c) => ({
    kind: 'course', title: c.data.title, eyebrow: 'Course',
    meta: '', icon: 'ph-graduation-cap',
    href: `/courses/${c.slug}/`,
    extra: c.data.lede || '',
  })),
  ...products.map((p) => ({
    kind: 'product', title: p.data.title, eyebrow: p.data.category || 'Product',
    meta: typeof p.data.price === 'number' || /^\d+$/.test(p.data.price) ? `$${(Number(p.data.price) / 100).toFixed(0)}` : '',
    icon: 'ph-package',
    href: `/products/${p.slug}/`,
    extra: p.data.lede || '',
  })),
  ...prompts.map((p) => {
    // Augment prompt embedding text with explicit payoff intent +
    // synonyms. Without this, MiniLM can't tell that a "money"-payoff
    // prompt is conceptually close to queries like "help me make money".
    const PAYOFF_INTENT = {
      money:  'For making more money, growing revenue, sales, pricing, monetisation, profit, income, cashflow.',
      save:   'For saving time, automation, productivity, efficiency, reducing busywork, eliminating manual work.',
      decide: 'For making better decisions, strategy, analysis, frameworks, risk, prioritisation.',
      create: 'For writing better, creating content, generating ideas, design, marketing copy, emails, articles.',
      grow:   'For growing as a person, career growth, life design, goals, learning, hiring, leveling up.',
    };
    const intent = PAYOFF_INTENT[p.data.payoff] || '';
    return {
      kind: 'prompt', title: p.data.title, eyebrow: `Prompt · ${p.data.category || ''}`,
      meta: '', icon: 'ph-sparkle',
      href: `/prompts/${p.slug}/`,
      extra: [intent, p.data.lede, p.data.category, p.data.subcategory].filter(Boolean).join(' '),
    };
  }),
  ...recos.map((r) => ({
    kind: 'reco', title: r.data.title, eyebrow: `Recos · ${r.data.category || ''}`,
    meta: '', icon: 'ph-thumbs-up',
    href: `/recos/${r.slug}/`,
    extra: r.data.lede || '',
  })),
  ...ventures.map((v) => ({
    kind: 'venture', title: v.data.title, eyebrow: 'The Lab',
    meta: '', icon: 'ph-flask',
    href: `/ventures/${v.slug}/`,
    extra: v.data.lede || '',
  })),
  ...dossiers.map((d) => ({
    kind: 'dossier', title: d.data.title, eyebrow: 'Dossiers',
    meta: '', icon: 'ph-book-open',
    href: `/dossiers/${d.slug}/`,
    extra: d.data.lede || '',
  })),
  ...services.map((s) => ({
    kind: 'service', title: s.data.title, eyebrow: 'Services',
    meta: '', icon: 'ph-briefcase',
    href: `/services/${s.slug}/`,
    extra: s.data.lede || '',
  })),
  ...exhibits.map((x) => ({
    kind: 'exhibit', title: x.data.title, eyebrow: 'The Lab · Exhibit',
    meta: '', icon: 'ph-image-square',
    href: `/lab/exhibits/${x.slug}/`,
    extra: x.data.lede || '',
  })),
];

console.log(`\ntotal items: ${items.length}\n`);

// ─── Load the embedding model ───
console.log(`loading @huggingface/transformers + Xenova/all-MiniLM-L6-v2 (quantised)…`);
const t0 = Date.now();
const { pipeline, env } = await import('@huggingface/transformers');
// Cache to ~/.cache/huggingface so dev rebuilds skip the model download
env.cacheDir = path.join(process.env.HOME || '/tmp', '.cache/huggingface');
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });
console.log(`  model ready in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);

// ─── Compose the text-to-embed per item ───
function composeText(it) {
  // title carries the most signal; pad with eyebrow + extra (lede +
  // payoff + category for prompts) for richer semantic context.
  return [it.title, it.eyebrow, it.extra].filter(Boolean).join('. ').trim();
}

const texts = items.map(composeText);

// ─── Embed in batches ───
console.log(`embedding ${texts.length} items in batches of 32…`);
const t1 = Date.now();
const vectors = [];
const BATCH = 32;
for (let i = 0; i < texts.length; i += BATCH) {
  const batch = texts.slice(i, i + BATCH);
  const out = await extractor(batch, { pooling: 'mean', normalize: true });
  // out is a Tensor with shape [batch, 384]
  const data = out.data;
  const dim = out.dims[1];
  for (let r = 0; r < batch.length; r++) {
    const v = new Array(dim);
    // 4 decimal places keeps cosine-similarity ranking faithful while
    // shrinking the JSON by ~25 % vs 6 decimals.
    for (let c = 0; c < dim; c++) v[c] = +data[r * dim + c].toFixed(4);
    vectors.push(v);
  }
  process.stdout.write(`\r  ${Math.min(i + BATCH, texts.length)}/${texts.length}`);
}
console.log(`\n  embeddings done in ${((Date.now() - t1) / 1000).toFixed(1)}s`);

// ─── Combine + write ───
const out = {
  dim: vectors[0].length,
  model: 'Xenova/all-MiniLM-L6-v2',
  generated: new Date().toISOString(),
  items: items.map((it, i) => ({
    kind: it.kind,
    title: it.title,
    eyebrow: it.eyebrow,
    meta: it.meta,
    icon: it.icon,
    href: it.href,
    vector: vectors[i],
  })),
};

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(out));
const stat = fs.statSync(OUT_PATH);
console.log(`\nwrote ${OUT_PATH}`);
console.log(`  ${(stat.size / 1024).toFixed(0)} KB raw / ~${(stat.size / 1024 / 4).toFixed(0)} KB gzipped estimate`);
console.log(`  ${out.items.length} items × ${out.dim} dims`);
