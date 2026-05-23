#!/usr/bin/env node
/**
 * Convert extracted JSON data into MDX files in src/content/<collection>/.
 *
 * Each top-level key in (most) detail maps becomes one MDX file. The frontmatter
 * carries all metadata; the body is the joined HTML body strings from the
 * mockup. Body content stays as raw HTML — MDX renders it as-is.
 *
 * Run after extract-mockup-data.mjs.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const IN = join(repoRoot, 'scripts', 'extracted');
const CONTENT = join(repoRoot, 'src', 'content');
const DATA = join(repoRoot, 'src', 'data');

mkdirSync(DATA, { recursive: true });

function readJson(name) {
  return JSON.parse(readFileSync(join(IN, `${name}.json`), 'utf8'));
}

function slugify(s) {
  return String(s)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[''""]/g, '')
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function stripHtmlTags(s) {
  return String(s).replace(/<[^>]+>/g, '');
}

function yamlEscape(s) {
  if (s === null || s === undefined) return '""';
  const str = String(s);
  // Quote if contains special chars or starts with special, or is empty
  if (str === '') return '""';
  if (/[:#&*!|>'"%@`\n]/.test(str) || /^[\s-]/.test(str) || /^(true|false|null|yes|no|on|off)$/i.test(str)) {
    return JSON.stringify(str);
  }
  return JSON.stringify(str);
}

function toYaml(obj, indent = 0) {
  const pad = ' '.repeat(indent);
  const lines = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${pad}${k}: []`);
        continue;
      }
      lines.push(`${pad}${k}:`);
      for (const item of v) {
        if (item === null || item === undefined) continue;
        if (typeof item === 'object' && !Array.isArray(item)) {
          const sub = toYaml(item, indent + 4);
          // first key gets "- " prefix
          const subLines = sub.split('\n');
          subLines[0] = pad + '  - ' + subLines[0].slice(indent + 4);
          lines.push(subLines.join('\n'));
        } else {
          lines.push(`${pad}  - ${yamlEscape(item)}`);
        }
      }
    } else if (typeof v === 'object') {
      lines.push(`${pad}${k}:`);
      lines.push(toYaml(v, indent + 2));
    } else if (typeof v === 'boolean' || typeof v === 'number') {
      lines.push(`${pad}${k}: ${v}`);
    } else {
      lines.push(`${pad}${k}: ${yamlEscape(v)}`);
    }
  }
  return lines.join('\n');
}

function bodyArrayToMdx(body) {
  if (!body) return '';
  if (typeof body === 'string') return body + '\n';
  if (Array.isArray(body)) return body.join('\n\n') + '\n';
  return '';
}

function writeMdx(collection, slug, frontmatter, body) {
  const dir = join(CONTENT, collection);
  mkdirSync(dir, { recursive: true });
  const fm = toYaml(frontmatter);
  const content = `---\n${fm}\n---\n\n${body}`;
  writeFileSync(join(dir, `${slug}.mdx`), content);
}

function imagePath(p) {
  if (!p) return undefined;
  if (p.startsWith('/') || p.startsWith('http')) return p;
  return `/${p}`;
}

// ─── 1. Articles ─────────────────────────────────────────────
function buildArticles() {
  const list = readJson('ARTICLES_LIST');
  const detail = readJson('ARTICLES_DETAIL');
  const seen = new Set();
  let count = 0;

  // catalog entries — write detail-rich ones
  for (const item of list) {
    const slug = slugify(item.title);
    const det = detail[item.title];
    const fm = {
      title: stripHtmlTags(det?.title || item.title),
      titleHtml: det?.title || item.title,
      eyebrow: det?.eyebrow || `${item.tag} · ${item.date}`,
      byline: det?.byline,
      lede: det?.lede,
      cover: imagePath(item.image),
      category: item.tag,
      publishedAt: item.date,
      tags: item.tag ? [item.tag] : [],
      draft: !det, // catalog-only items are drafts until written
    };

    // Body is body[] + h2 + list[] + quote + bodyAfter[] (articles vary)
    let body = '';
    if (det?.body) body += bodyArrayToMdx(det.body);
    if (det?.h2) body += `\n<h2>${det.h2}</h2>\n\n`;
    if (det?.list) {
      body += '<ul>\n';
      for (const li of det.list) body += `  <li>${li}</li>\n`;
      body += '</ul>\n\n';
    }
    if (det?.quote) {
      body += `<blockquote><p>${det.quote.text}</p><cite>${det.quote.cite}</cite></blockquote>\n\n`;
    }
    if (det?.bodyAfter) body += bodyArrayToMdx(det.bodyAfter);
    if (!body) body = `<p>${item.line || 'Article in progress.'}</p>\n`;

    writeMdx('articles', slug, fm, body);
    seen.add(item.title);
    count++;
  }

  // detail entries not in list
  for (const [title, det] of Object.entries(detail)) {
    if (seen.has(title)) continue;
    const slug = slugify(title);
    const fm = {
      title: stripHtmlTags(det.title || title),
      titleHtml: det.title || title,
      eyebrow: det.eyebrow,
      byline: det.byline,
      lede: det.lede,
      tags: [],
      draft: false,
    };
    let body = bodyArrayToMdx(det.body);
    if (det.h2) body += `\n<h2>${det.h2}</h2>\n\n`;
    if (det.list) {
      body += '<ul>\n' + det.list.map((li) => `  <li>${li}</li>`).join('\n') + '\n</ul>\n\n';
    }
    if (det.quote) body += `<blockquote><p>${det.quote.text}</p><cite>${det.quote.cite}</cite></blockquote>\n\n`;
    if (det.bodyAfter) body += bodyArrayToMdx(det.bodyAfter);
    writeMdx('articles', slug, fm, body);
    count++;
  }
  console.log(`  articles: ${count}`);
}

// ─── 2. Newsletter ───────────────────────────────────────────
function buildNewsletter() {
  const list = readJson('NEWSLETTER_LIST');
  const detail = readJson('NEWSLETTER_DETAIL');
  let count = 0;
  const seen = new Set();
  for (const item of list) {
    const slug = slugify(item.title);
    const det = detail[item.title];
    const fm = {
      title: stripHtmlTags(det?.title || item.title),
      titleHtml: det?.title || item.title,
      eyebrow: det?.eyebrow || `${item.tag || 'Newsletter'} · ${item.date || ''}`.trim(),
      byline: det?.byline,
      lede: det?.lede,
      cover: imagePath(item.image),
      publishedAt: item.date,
      draft: !det,
    };
    let body = bodyArrayToMdx(det?.body);
    if (det?.h2) body += `\n<h2>${det.h2}</h2>\n\n`;
    if (det?.list) body += '<ul>\n' + det.list.map((li) => `  <li>${li}</li>`).join('\n') + '\n</ul>\n\n';
    if (det?.quote) body += `<blockquote><p>${det.quote.text}</p><cite>${det.quote.cite}</cite></blockquote>\n\n`;
    if (det?.bodyAfter) body += bodyArrayToMdx(det.bodyAfter);
    if (!body) body = `<p>${item.line || 'Issue forthcoming.'}</p>\n`;
    writeMdx('newsletter', slug, fm, body);
    seen.add(item.title);
    count++;
  }
  for (const [title, det] of Object.entries(detail)) {
    if (seen.has(title)) continue;
    const slug = slugify(title);
    const fm = {
      title: stripHtmlTags(det.title || title),
      titleHtml: det.title || title,
      eyebrow: det.eyebrow,
      byline: det.byline,
      lede: det.lede,
      draft: false,
    };
    let body = bodyArrayToMdx(det.body);
    if (det.h2) body += `\n<h2>${det.h2}</h2>\n\n`;
    if (det.list) body += '<ul>\n' + det.list.map((li) => `  <li>${li}</li>`).join('\n') + '\n</ul>\n\n';
    if (det.quote) body += `<blockquote><p>${det.quote.text}</p><cite>${det.quote.cite}</cite></blockquote>\n\n`;
    if (det.bodyAfter) body += bodyArrayToMdx(det.bodyAfter);
    writeMdx('newsletter', slug, fm, body);
    count++;
  }
  console.log(`  newsletter: ${count}`);
}

// ─── 3. Products ─────────────────────────────────────────────
function buildProducts() {
  const byCat = readJson('PRODUCTS_BY_CATEGORY');
  const hero = readJson('PRODUCTS_HERO');
  const cats = readJson('PRODUCTS_CATEGORIES');
  let count = 0;

  // Hero bundle as its own product
  {
    const slug = slugify(hero.id || hero.title);
    const fm = {
      title: hero.title,
      titleHtml: hero.title,
      eyebrow: hero.eyebrow || 'Premium Bundle',
      lede: hero.longHook || hero.line,
      cover: imagePath(hero.image),
      category: 'Bundles',
      price: 19700, // $197 in cents
      currency: 'USD',
      badge: hero.badge,
      paymentLinkUrl: undefined,
      stripePriceEnvKey: 'STRIPE_PRICE_COMPLETE_ARSENAL',
      deliverable: 'pdf',
      breakdown: hero.breakdown,
      draft: false,
    };
    writeMdx('products', slug, fm, `<p>${hero.longHook || hero.line}</p>\n`);
    count++;
  }

  for (const [category, items] of Object.entries(byCat)) {
    for (const item of items) {
      const slug = slugify(item.title);
      const priceStr = item.price || '$0';
      const priceCents = Math.round(parseFloat(priceStr.replace(/[^0-9.]/g, '')) * 100);
      const fm = {
        title: stripHtmlTags(item.title),
        titleHtml: item.title,
        eyebrow: category,
        lede: item.hook,
        category,
        price: priceCents || 0,
        currency: 'USD',
        stripePriceEnvKey: `STRIPE_PRICE_${slug.toUpperCase().replace(/-/g, '_')}`,
        deliverable: 'pdf',
        draft: false,
      };
      writeMdx('products', slug, fm, `<p>${item.hook}</p>\n`);
      count++;
    }
  }
  console.log(`  products: ${count}`);

  // Categories + hero metadata go to data dir for landing page
  writeFileSync(
    join(DATA, 'products-categories.ts'),
    `// Auto-generated from PRODUCTS_CATEGORIES.json. Do not edit by hand.\nexport const PRODUCTS_CATEGORIES = ${JSON.stringify(cats, null, 2)} as const;\n`
  );
  writeFileSync(
    join(DATA, 'products-hero.ts'),
    `// Auto-generated from PRODUCTS_HERO.json. Do not edit by hand.\nexport const PRODUCTS_HERO = ${JSON.stringify(hero, null, 2)} as const;\n`
  );
}

// ─── 4. Prompts ──────────────────────────────────────────────
function buildPrompts() {
  const byCat = readJson('PROMPTS_BY_CATEGORY');
  let count = 0;
  for (const [category, items] of Object.entries(byCat)) {
    for (const item of items) {
      const slug = slugify(item.title);
      const fm = {
        title: stripHtmlTags(item.title),
        eyebrow: category,
        lede: item.line,
        category,
        prompt: item.body || '',
        draft: false,
      };
      writeMdx('prompts', slug, fm, `<p>${item.line || ''}</p>\n`);
      count++;
    }
  }
  console.log(`  prompts: ${count}`);
}

// ─── 5. Recos ────────────────────────────────────────────────
function buildRecos() {
  const detail = readJson('RECOS_DETAIL');
  let count = 0;
  for (const [title, d] of Object.entries(detail)) {
    const slug = slugify(title);
    const fm = {
      title: stripHtmlTags(d.title || title),
      titleHtml: d.title || title,
      eyebrow: d.eyebrow,
      lede: d.lede,
      category: d.eyebrow?.split('·')[1]?.trim() || 'recos',
      affiliateUrl: 'https://example.com', // placeholder; tools list embedded in frontmatter for the renderer
      tools: d.tools,
      draft: false,
    };
    let body = `<p>${d.lede}</p>\n`;
    writeMdx('recos', slug, fm, body);
    count++;
  }
  console.log(`  recos: ${count}`);
}

// ─── 6. Services ─────────────────────────────────────────────
function buildServices() {
  const detail = readJson('SERVICES_DETAIL');
  let count = 0;
  for (const [title, d] of Object.entries(detail)) {
    const slug = slugify(title);
    const fm = {
      title: stripHtmlTags(d.title || title),
      titleHtml: d.title || title,
      eyebrow: d.eyebrow,
      lede: d.lede,
      strip: d.strip,
      whatYouGet: d.whatYouGet,
      howItWorks: d.howItWorks,
      bookingMode: 'lead-form',
      draft: false,
    };
    writeMdx('services', slug, fm, `<p>${d.lede || ''}</p>\n`);
    count++;
  }
  console.log(`  services: ${count}`);
}

// ─── 7. Ventures ─────────────────────────────────────────────
function buildVentures() {
  const detail = readJson('VENTURES_DETAIL');
  let count = 0;
  for (const [title, d] of Object.entries(detail)) {
    const slug = slugify(title);
    const stage = (d.pill?.label || 'building').toLowerCase();
    const allowedStages = ['concept', 'building', 'live', 'archived'];
    const normalisedStage = allowedStages.includes(stage) ? stage : 'building';
    const fm = {
      title: stripHtmlTags(d.title || title),
      titleHtml: d.title || title,
      eyebrow: d.eyebrow,
      lede: d.lede,
      strip: d.strip,
      pill: d.pill,
      stage: normalisedStage,
      draft: false,
    };
    writeMdx('ventures', slug, fm, `<p>${d.lede || ''}</p>\n`);
    count++;
  }
  console.log(`  ventures: ${count}`);
}

// ─── 8. Courses ──────────────────────────────────────────────
function buildCourses() {
  const detail = readJson('COURSES_DETAIL');
  let count = 0;
  for (const [title, d] of Object.entries(detail)) {
    const slug = slugify(title);
    const isComingSoon = (d.eyebrow || '').toUpperCase().includes('SOON') || (d.eyebrow || '').toUpperCase().includes('COMING');
    const status = isComingSoon ? 'coming-soon' : 'live';
    const fm = {
      title: stripHtmlTags(d.title || title),
      titleHtml: d.title || title,
      eyebrow: d.eyebrow,
      lede: d.description || d.lede,
      stats: d.stats,
      subtitle1: d.subtitle1,
      subtitle2: d.subtitle2,
      ctas: d.ctas,
      trailer: d.trailer,
      modules: d.modules,
      status,
      waitlistEnabled: isComingSoon,
      stripePriceEnvKey: `STRIPE_PRICE_${slug.toUpperCase().replace(/-/g, '_')}`,
      draft: false,
    };
    writeMdx('courses', slug, fm, `<p>${d.description || d.lede || ''}</p>\n`);
    count++;
  }
  console.log(`  courses: ${count}`);
}

// ─── 9. Dossiers ─────────────────────────────────────────────
function buildDossiers() {
  const dossiers = readJson('LIBRARY_DOSSIERS');
  const category = readJson('DOSSIER_CATEGORY');
  const rooms = readJson('LIBRARY_ROOMS');
  const entries = readJson('LIBRARY_ENTRIES');
  const icons = readJson('LIBRARY_CAT_ICON');
  let count = 0;

  for (const [title, d] of Object.entries(dossiers)) {
    const slug = slugify(title);
    const cat = category[title] || 'books';
    const coverBasename = `lib-${cat}.png`;
    const fm = {
      title: stripHtmlTags(d.title || title),
      titleHtml: d.title || title,
      eyebrow: d.eyebrow,
      byline: d.byline,
      category: cat,
      lede: d.lede,
      quote: d.quote,
      whyItMatters: d.whyItMatters,
      keyIdeas: d.keyIdeas,
      takeForward: d.takeForward,
      keyConcept: d.keyConcept,
      cover: imagePath(`library-rooms/${coverBasename}`),
      draft: false,
    };
    let body = bodyArrayToMdx(d.body);
    if (!body) body = `<p>${d.lede || ''}</p>\n`;
    writeMdx('dossiers', slug, fm, body);
    count++;
  }
  console.log(`  dossiers: ${count}`);

  // Side artifacts
  writeFileSync(
    join(DATA, 'dossier-categories.ts'),
    `// Auto-generated from LIBRARY_ROOMS.json.\nexport const DOSSIER_CATEGORIES = ${JSON.stringify(rooms, null, 2)} as const;\n`
  );
  writeFileSync(
    join(DATA, 'dossier-catalog.ts'),
    `// Auto-generated from LIBRARY_ENTRIES.json (the whole alphabetical catalogue).\nexport const DOSSIER_CATALOG = ${JSON.stringify(entries, null, 2)} as const;\n`
  );
  writeFileSync(
    join(DATA, 'dossier-icons.ts'),
    `// Auto-generated from LIBRARY_CAT_ICON.json.\nexport const DOSSIER_ICONS = ${JSON.stringify(icons, null, 2)} as const;\n`
  );
}

// ─── 10. Exhibits ────────────────────────────────────────────
function buildExhibits() {
  const detail = readJson('EXHIBITS_DETAIL');
  const order = readJson('EXHIBITS_ORDER');
  let count = 0;
  for (const title of order) {
    const d = detail[title];
    if (!d) continue;
    const slug = slugify(title);
    const fm = {
      title,
      eyebrow: d.num ? `Exhibit ${d.num}` : 'Exhibit',
      lede: d.lede || d.cardLine,
      cover: imagePath(`section-rooms/exhibits/${d.slug}.${d.ext || 'png'}`),
      status: d.live ? 'live' : 'concept',
      liveUrl: d.url,
      techStack: [],
      draft: false,
    };
    writeMdx('exhibits', slug, fm, `<p>${d.lede || d.cardLine || ''}</p>\n`);
    count++;
  }
  console.log(`  exhibits: ${count}`);

  writeFileSync(
    join(DATA, 'exhibits-order.ts'),
    `// Auto-generated from EXHIBITS_ORDER.json.\nexport const EXHIBITS_ORDER = ${JSON.stringify(order, null, 2)} as const;\n`
  );
}

// ─── 11. Side artifacts: ROOM_IMAGE_OVERRIDES ────────────────
function buildRoomImages() {
  const o = readJson('ROOM_IMAGE_OVERRIDES');
  writeFileSync(
    join(DATA, 'room-images.ts'),
    `// Auto-generated from ROOM_IMAGE_OVERRIDES.json.\nexport const ROOM_IMAGE_OVERRIDES = ${JSON.stringify(o, null, 2)} as const;\n`
  );
}

console.log('Building MDX files from extracted data:');
buildArticles();
buildNewsletter();
buildProducts();
buildPrompts();
buildRecos();
buildServices();
buildVentures();
buildCourses();
buildDossiers();
buildExhibits();
buildRoomImages();
console.log('\nDone.');
