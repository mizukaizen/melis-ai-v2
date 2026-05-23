#!/usr/bin/env node
/**
 * Extract the body HTML fragments from the v6 mockup so they can be
 * embedded in Astro components with class names preserved.
 *
 * Outputs to scripts/extracted-html/:
 *   - sidebar.html              — full <aside class="sidebar"> contents
 *   - sb2-<pane>.html           — per-section sb2 pane
 *   - pane-<slug>.html          — per-section main pane content (inside <div class="pane">)
 *
 * The script also rewrites `onclick="showPane('xxx')"` + href="javascript:void(0)"
 * to proper `href="/<route>/"` so they become real navigation in Astro.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const MOCKUP = '/Users/seanmelis/Documents/_cowork/outputs/website-rebrand/melis-ai-spa-v6-astro-content.html';
const OUT = join(repoRoot, 'scripts', 'extracted-html');
mkdirSync(OUT, { recursive: true });

const html = readFileSync(MOCKUP, 'utf8');

// ─── Map mockup data-pane → Astro route ──────────────────────
const ROUTE_MAP = {
  home: '/',
  courses: '/courses/',
  articles: '/articles/',
  newsletter: '/newsletter/',
  library: '/dossiers/',
  products: '/products/',
  prompts: '/prompts/',
  recos: '/recos/',
  projects: '/ventures/',
  exhibits: '/lab/exhibits/',
  services: '/services/',
  about: '/about/sean/',
  'about-studio': '/about/melis-ai/',
};

function rewriteLinks(s) {
  // showPane('xxx') → href="/route/"
  // Replace `onclick="showPane('xxx')"` patterns + adjacent href="javascript:void(0)"
  return s
    .replace(/href="javascript:void\(0\)"\s*data-pane="([^"]+)"\s*onclick="showPane\('([^']+)'\)"/g, (_, dp, pane) => {
      const route = ROUTE_MAP[pane] ?? `/${pane}/`;
      return `href="${route}" data-pane="${dp}"`;
    })
    .replace(/data-pane="([^"]+)"\s*onclick="showPane\('([^']+)'\)"\s*href="javascript:void\(0\)"/g, (_, dp, pane) => {
      const route = ROUTE_MAP[pane] ?? `/${pane}/`;
      return `href="${route}" data-pane="${dp}"`;
    })
    .replace(/onclick="showPane\('([^']+)'\)"\s*href="javascript:void\(0\)"/g, (_, pane) => {
      const route = ROUTE_MAP[pane] ?? `/${pane}/`;
      return `href="${route}"`;
    })
    .replace(/href="javascript:void\(0\)"\s*onclick="showPane\('([^']+)'\)"/g, (_, pane) => {
      const route = ROUTE_MAP[pane] ?? `/${pane}/`;
      return `href="${route}"`;
    })
    // remaining onclick="showPane('xxx')" wherever
    .replace(/\s*onclick="showPane\('([^']+)'\)"/g, '')
    // remaining href="javascript:void(0)" (now that onclick is gone) → keep as #
    .replace(/href="javascript:void\(0\)"/g, 'href="#"');
}

// ─── Extract <aside class="sidebar"> (sb1) ───────────────────
{
  const re = /<aside class="sidebar">([\s\S]*?)<\/aside>/;
  const m = re.exec(html);
  if (m) {
    writeFileSync(join(OUT, 'sidebar.html'), rewriteLinks(m[1]).trim() + '\n');
    console.log('✓ sidebar.html');
  } else {
    console.log('⚠ sidebar not found');
  }
}

// ─── Extract <aside class="sidebar-2"> and split per pane ────
{
  const re = /<aside class="sidebar-2">([\s\S]*?)<\/aside>/;
  const m = re.exec(html);
  if (m) {
    // Inside it, find each <div class="sb2-pane" data-pane="..."> block
    const inner = m[1];
    const paneRe = /<div class="sb2-pane" data-pane="([^"]+)">([\s\S]*?)<\/div><div class="sb2-pane"/g;
    // Simpler: split by `<div class="sb2-pane"` and parse
    const parts = inner.split(/(?=<div class="sb2-pane")/);
    let count = 0;
    for (const part of parts) {
      const dpMatch = /<div class="sb2-pane" data-pane="([^"]+)">/.exec(part);
      if (!dpMatch) continue;
      const pane = dpMatch[1];
      // Find balanced div content — we have a flat segment; we just need
      // everything up to the next `<div class="sb2-pane"` which is already split out.
      // The part starts with the opening div, find its matching closing </div>.
      const opener = dpMatch[0];
      const inside = part.slice(opener.length);
      // The sb2-pane content always ends with </div> matching the opener.
      // Use balanced div parsing (good enough for this).
      let depth = 1;
      let i = 0;
      while (i < inside.length && depth > 0) {
        const open = inside.indexOf('<div', i);
        const close = inside.indexOf('</div>', i);
        if (close === -1) break;
        if (open !== -1 && open < close) {
          depth++;
          i = open + 4;
        } else {
          depth--;
          if (depth === 0) {
            const content = inside.slice(0, close);
            writeFileSync(join(OUT, `sb2-${pane}.html`), rewriteLinks(content).trim() + '\n');
            count++;
            break;
          }
          i = close + 6;
        }
      }
    }
    console.log(`✓ ${count} sb2 panes`);
  } else {
    console.log('⚠ sidebar-2 not found');
  }
}

// ─── Extract <main class="content">...<div class="pane"> per pane ─
{
  // Locate the main element
  const mainRe = /<main class="content">([\s\S]*?)<\/main>/;
  const m = mainRe.exec(html);
  if (m) {
    const main = m[1];
    // Split by `<div class="pane` (handles both `<div class="pane active"` and `<div class="pane"`)
    const parts = main.split(/(?=<div class="pane(?:\s+active)?" data-pane=")/);
    let count = 0;
    for (const part of parts) {
      const dpMatch = /<div class="pane(?:\s+active)?" data-pane="([^"]+)">/.exec(part);
      if (!dpMatch) continue;
      const pane = dpMatch[1];
      const opener = dpMatch[0];
      const inside = part.slice(opener.length);
      let depth = 1;
      let i = 0;
      while (i < inside.length && depth > 0) {
        const open = inside.indexOf('<div', i);
        const close = inside.indexOf('</div>', i);
        if (close === -1) break;
        if (open !== -1 && open < close) {
          depth++;
          i = open + 4;
        } else {
          depth--;
          if (depth === 0) {
            const content = inside.slice(0, close);
            writeFileSync(join(OUT, `pane-${pane}.html`), rewriteLinks(content).trim() + '\n');
            count++;
            break;
          }
          i = close + 6;
        }
      }
    }
    console.log(`✓ ${count} main panes`);
  } else {
    console.log('⚠ main not found');
  }
}

console.log(`\nAll HTML fragments → ${OUT}`);
