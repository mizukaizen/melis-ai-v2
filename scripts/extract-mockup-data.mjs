#!/usr/bin/env node
/**
 * Extract every JS data array/map from the v6 mockup HTML and dump as JSON.
 *
 * The mockup is a single-file SPA; the data we want lives inside two large
 * <script> blocks. We don't want to eval the whole script (it touches
 * `document`, `IntersectionObserver`, etc.). Instead, for each named const
 * we care about, we use a balanced-bracket parser to find its bounds and
 * concatenate only those declarations into a sandbox.
 *
 * Output: scripts/extracted/<VAR_NAME>.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const MOCKUP_PATH = '/Users/seanmelis/Documents/_cowork/outputs/website-rebrand/melis-ai-spa-v6-astro-content.html';
const OUT_DIR = join(repoRoot, 'scripts', 'extracted');

const VAR_NAMES = [
  'ROOM_IMAGE_OVERRIDES',
  'PRODUCTS_HERO',
  'PRODUCTS_CATEGORIES',
  'PRODUCTS_BY_CATEGORY',
  'LIBRARY_ROOMS',
  'LIBRARY_ENTRIES',
  'DOSSIER_TITLES',
  'DOSSIER_CATEGORY',
  'LIBRARY_CAT_ICON',
  'ARTICLES_LIST',
  'NEWSLETTER_LIST',
  'PROMPTS_BY_CATEGORY',
  'RECOS_DETAIL',
  'SERVICES_DETAIL',
  'VENTURES_DETAIL',
  'COURSES_DETAIL',
  'LIBRARY_DOSSIERS',
  'ARTICLES_DETAIL',
  'NEWSLETTER_DETAIL',
  'EXHIBITS_DETAIL',
  'EXHIBITS_ORDER',
];

const OPEN = { '{': '}', '[': ']', '(': ')' };
const CLOSE = { '}': '{', ']': '[', ')': '(' };

/** Walk forward from `start` (index into src), respecting strings/comments,
 *  and return the index just past the matching closing bracket for the first
 *  opener encountered. */
function findStatementEnd(src, start) {
  let i = start;
  // Skip to first opener
  while (i < src.length && !'{[('.includes(src[i])) i++;
  if (i >= src.length) return -1;

  const stack = [];
  while (i < src.length) {
    const c = src[i];
    const c2 = src[i + 1];

    // line comment
    if (c === '/' && c2 === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    // block comment
    if (c === '/' && c2 === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    // string literals (single, double, template — template can nest ${...} but for v6 mockup we can ignore that complication, the runtime in the file doesn't use nested template-with-brackets in the data declarations we care about)
    if (c === '"' || c === '\'') {
      const quote = c;
      i++;
      while (i < src.length) {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === quote) { i++; break; }
        i++;
      }
      continue;
    }
    if (c === '`') {
      i++;
      while (i < src.length) {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === '`') { i++; break; }
        // template substitution ${...}
        if (src[i] === '$' && src[i + 1] === '{') {
          i += 2;
          let depth = 1;
          while (i < src.length && depth > 0) {
            if (src[i] === '{') depth++;
            else if (src[i] === '}') depth--;
            if (depth === 0) { i++; break; }
            i++;
          }
          continue;
        }
        i++;
      }
      continue;
    }
    // regex literal heuristic — skip if we're confident it's a regex (after `=`, `,`, `(`, `return`)
    // For data declarations this rarely matters; we'll skip a naive case.

    if (OPEN[c]) {
      stack.push(c);
    } else if (CLOSE[c]) {
      const expected = CLOSE[c];
      if (stack.length === 0 || stack[stack.length - 1] !== expected) {
        throw new Error(`Bracket mismatch at index ${i}: got ${c}`);
      }
      stack.pop();
      if (stack.length === 0) {
        return i + 1;
      }
    }
    i++;
  }
  return -1;
}

function extractDeclaration(src, name) {
  // Match `const NAME =` at any indentation
  const re = new RegExp(`(^|\\n)(\\s*)const\\s+${name}\\s*=\\s*`, 'm');
  const m = re.exec(src);
  if (!m) {
    console.warn(`  ⚠ ${name}: not found`);
    return null;
  }
  const startBody = m.index + m[0].length;
  // Special-case Set / Map: `new Set([...])` — we need to step past the constructor
  // Find first bracket-style opener after `=` (skipping `new SomeClass`)
  let j = startBody;
  while (j < src.length && !'{[('.includes(src[j])) j++;
  const end = findStatementEnd(src, j);
  if (end < 0) {
    console.warn(`  ⚠ ${name}: could not find end`);
    return null;
  }
  // Return the entire `const NAME = ...;` statement
  // Include the semicolon if present
  let endWithSemi = end;
  while (endWithSemi < src.length && /\s/.test(src[endWithSemi])) endWithSemi++;
  if (src[endWithSemi] === ';') endWithSemi++;
  return src.slice(m.index + m[1].length, endWithSemi);
}

function main() {
  const html = readFileSync(MOCKUP_PATH, 'utf8');
  mkdirSync(OUT_DIR, { recursive: true });

  const statements = [];
  const missing = [];
  for (const name of VAR_NAMES) {
    const decl = extractDeclaration(html, name);
    if (decl) {
      statements.push(decl);
      console.log(`  ✓ ${name}`);
    } else {
      missing.push(name);
    }
  }

  // Eval all statements in a sandbox. Stub Set/Map (native), and stub anything
  // browser-y that the declarations might reference (they shouldn't, but be safe).
  const sandbox = {
    Set,
    Map,
    Object,
    Array,
    JSON,
    String,
    Number,
    Boolean,
    console,
  };
  // Strip `const ` and the leading whitespace so each statement assigns to the
  // sandbox's global instead of a block-scoped local. (const/let don't escape
  // into the vm context object.)
  const stripped = statements
    .map((s) => s.replace(/^\s*const\s+/, ''))
    .join(';\n');
  const code = stripped + ';\n';
  const context = vm.createContext(sandbox);
  try {
    vm.runInContext(code, context, { filename: 'extracted-mockup-data.js' });
  } catch (err) {
    console.error('eval failed:', err.message);
    // Dump the concatenated code for debugging
    writeFileSync(join(OUT_DIR, '_DEBUG_concatenated.js'), code);
    process.exit(1);
  }

  // Serialise each variable. Sets become arrays.
  for (const name of VAR_NAMES) {
    if (missing.includes(name)) continue;
    const val = context[name];
    if (val === undefined) {
      console.warn(`  ⚠ ${name}: undefined after eval`);
      continue;
    }
    const serialisable = serialiseValue(val);
    writeFileSync(
      join(OUT_DIR, `${name}.json`),
      JSON.stringify(serialisable, null, 2)
    );
  }

  if (missing.length) {
    console.warn('\nMissing variables:', missing.join(', '));
  }
  console.log(`\nDone. Extracted ${VAR_NAMES.length - missing.length} variables to ${OUT_DIR}`);
}

function serialiseValue(v) {
  if (v instanceof Set) return Array.from(v);
  if (v instanceof Map) {
    const o = {};
    for (const [k, val] of v.entries()) o[String(k)] = serialiseValue(val);
    return o;
  }
  if (Array.isArray(v)) return v.map(serialiseValue);
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, val] of Object.entries(v)) o[k] = serialiseValue(val);
    return o;
  }
  return v;
}

main();
