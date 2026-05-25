#!/usr/bin/env node
/**
 * Port v1 article body content into v2 MDX files.
 *
 * v1 articles live as .astro pages at
 *   ~/repos/melis-ai-astro-v1/src/pages/articles/<slug>.astro
 * with body content inside `<div class="article-body">…</div>`. The
 * markup is plain HTML: <p>, <h3>, <strong>, <code>. This script
 * extracts that block, converts to markdown, and writes
 *   src/content/articles/<slug>.mdx (only if missing).
 *
 * Run: node scripts/port-v1-articles.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const V1_DIR = '/Users/seanmelis/repos/melis-ai-astro-v1/src/pages/articles';
const OUT_DIR = path.join(ROOT, 'src/content/articles');

function htmlToMarkdown(html) {
  // Block-level conversions first
  let s = html
    .replace(/<h3>([^]*?)<\/h3>/g, '\n\n### $1\n')
    .replace(/<h2>([^]*?)<\/h2>/g, '\n\n## $1\n')
    .replace(/<p>([^]*?)<\/p>/g, '\n\n$1')
    .replace(/<ul>([^]*?)<\/ul>/g, '\n\n$1\n')
    .replace(/<li>([^]*?)<\/li>/g, '\n- $1')
    .replace(/<blockquote>([^]*?)<\/blockquote>/g, (_, inner) => '\n\n> ' + inner.replace(/\n/g, '\n> '));
  // Inline conversions
  s = s
    .replace(/<strong>([^]*?)<\/strong>/g, '**$1**')
    .replace(/<em>([^]*?)<\/em>/g, '*$1*')
    .replace(/<code>([^]*?)<\/code>/g, '`$1`')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([^]*?)<\/a>/g, '[$2]($1)')
    .replace(/<br\s*\/?>/g, '\n');
  // Strip any remaining tags
  s = s.replace(/<[^>]+>/g, '');
  // Collapse blank lines, decode entities
  s = s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s;
}

function yamlEscape(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
}

function extractMeta(src) {
  const out = {};
  const t = src.match(/title="([^"]+?)\s*[—–-]\s*melis\.ai"/);
  if (t) out.title = t[1].trim();
  const d = src.match(/description="([^"]+)"/);
  if (d) out.description = d[1].trim();
  const h1 = src.match(/<h1 class="article-title">([^<]+)<\/h1>/);
  if (h1) out.h1 = h1[1].trim();
  const dateM = src.match(/<span class="article-date">([^<]+)<\/span>/);
  if (dateM) out.date = dateM[1].trim();
  const tagM = src.match(/<span class="tag [^"]+">([^<]+)<\/span>/);
  if (tagM) out.tag = tagM[1].trim();
  return out;
}

function extractBody(src) {
  const m = src.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/Layout>/);
  if (!m) return null;
  return m[1].trim();
}

function isoFromV1Date(s) {
  // "5 Apr 2026 · 6 min read" → 2026-04-05
  const m = s.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (!m) return null;
  const months = { Jan:'01', Feb:'02', Mar:'03', Apr:'04', May:'05', Jun:'06', Jul:'07', Aug:'08', Sep:'09', Oct:'10', Nov:'11', Dec:'12' };
  const mo = months[m[2].substring(0,3)];
  if (!mo) return null;
  const day = m[1].padStart(2, '0');
  return `${m[3]}-${mo}-${day}`;
}

function readingMinutes(s) {
  const m = s && s.match(/(\d+)\s+min/);
  return m ? parseInt(m[1], 10) : null;
}

const existingV2 = new Set(
  fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
);
console.log(`v2 existing: ${existingV2.size}`);

const v1Files = fs.readdirSync(V1_DIR).filter((f) => f.endsWith('.astro') && f !== 'index.astro' && !f.startsWith('['));
console.log(`v1 source files: ${v1Files.length}`);

const ported = [];
const skipped = [];
const failed = [];

for (const f of v1Files) {
  const slug = f.replace(/\.astro$/, '');
  if (existingV2.has(slug)) {
    skipped.push(slug);
    continue;
  }
  const src = fs.readFileSync(path.join(V1_DIR, f), 'utf8');
  const meta = extractMeta(src);
  const body = extractBody(src);
  if (!meta.h1 || !body) {
    failed.push({ slug, reason: !meta.h1 ? 'no h1' : 'no body' });
    continue;
  }
  const markdown = htmlToMarkdown(body);
  const isoDate = meta.date ? isoFromV1Date(meta.date) : null;
  const mins = meta.date ? readingMinutes(meta.date) : null;
  const lede = meta.description || markdown.split('\n\n')[0].substring(0, 180);

  const fm = [
    '---',
    `title: "${yamlEscape(meta.h1)}"`,
    `eyebrow: "Articles · ${meta.tag || 'Field notes'}"`,
    `byline: "Sean Melis · ${mins ? mins + ' min read' : 'short read'}"`,
    `lede: "${yamlEscape(lede)}"`,
    isoDate ? `publishedAt: "${isoDate}"` : '',
    mins ? `readingMinutes: ${mins}` : '',
    'status: "live"',
    `sourceV1: true`,
    'draft: false',
    '---',
    '',
    markdown,
    '',
  ].filter(Boolean).join('\n');

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.mdx`), fm);
  ported.push(slug);
}

console.log(`\nported: ${ported.length}`);
ported.forEach((s) => console.log(`  ${s}`));
console.log(`\nskipped (already in v2): ${skipped.length}`);
skipped.forEach((s) => console.log(`  ${s}`));
if (failed.length) {
  console.log(`\nfailed: ${failed.length}`);
  failed.forEach((f) => console.log(`  ${f.slug}: ${f.reason}`));
}
