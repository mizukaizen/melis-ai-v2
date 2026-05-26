// Recos v7 — normalisation + derivation helpers for the shelf+table
// detail page. Keeps the [slug].astro template thin: pass it a reco
// CollectionEntry, get back a fully-defaulted view model.
//
// Defaults applied here (so un-migrated MDX still renders cleanly):
//   id          → kebab(name)
//   monogram    → first letter of name + first letter of next word, else "·"
//   coverVariant→ 'abstract'
//   coverPalette→ deterministic hash(monogram) → one of TEN palettes
//   chip        → derived from legacy `cta` field where possible
//   oneLiner    → first sentence of `take` if missing
//   meta        → `attr` if missing
//   highlight   → false
//   cadence     → undefined (no dot rendered)
//   sectionId   → 'all' (collapses into the synthetic single-section view)
//
// All defaults are non-destructive — original frontmatter is preserved.

import { getCollection } from 'astro:content';

// The 10 named palettes shipped in the canonical mockup. The recos.css
// file declares the matching .cover-<name> classes. New palettes must
// be added BOTH here and in recos.css.
export const RECO_PALETTES = [
  'claude',
  'cowork',
  'cursor',
  'perplexity',
  'cloudflare',
  'vercel',
  'supabase',
  'linear',
  'notion',
  'obsidian',
] as const;
export type RecoPalette = typeof RECO_PALETTES[number];

// Avatar tint classes used on the table row avatars. Same 10 named tints
// shipped in the mockup. We reuse the palette name as the tint key.
export const RECO_AVATAR_KEYS = [
  'cl', 'cw', 'cr', 'px', 'cf', 'vc', 'sb', 'ln', 'no', 'ob',
  'el', 'rw', 'ts', 'ry', 'st', 'rs', 'sl', 'tg',
] as const;

export type ChipKind = 'affiliate' | 'open' | 'free' | 'paid' | 'free-tier';
export type CadenceKind = 'daily' | 'weekly' | 'monthly';
export type CoverVariant = 'abstract' | 'real' | 'portrait';

export interface NormalisedTool {
  id: string;
  name: string;
  oneLiner: string;
  take: string;
  url: string | null;
  monogram: string;
  avatarKey: string;
  coverVariant: CoverVariant;
  coverAsset: string | null;
  coverPalette: RecoPalette;
  cadence: CadenceKind | null;
  chip: ChipKind | null;
  highlight: boolean;
  sectionId: string;
  meta: string;
  maker: string;
  linkLabel: string;
  mustHave: boolean;
  // Originating category slug — useful on cross-category pages
  // (e.g. /recos/must-haves/) so we can label or link back per item.
  categorySlug: string;
  categoryTitle: string;
}

export interface NormalisedSection {
  id: string;
  title: string;
  // Phosphor icon name driving the shelf-header glyph (replaces the
  // earlier italic violet roman numeral). Defaults to ph-folder for
  // legacy / un-iconed sections.
  icon: string;
  eyebrow?: string;
  label?: string;
  items: NormalisedTool[];      // ALL items (used for the table)
  shelfItems: NormalisedTool[]; // highlight=true subset (used for the shelf)
}

export interface SisterCategory {
  slug: string;
  title: string;
  count: number;
  lede: string;
  current: boolean;
}

export interface NormalisedReco {
  title: string;
  titleHtml: string | null;
  eyebrow: string;
  lede: string;
  category: string;
  volume: string | null;
  sections: NormalisedSection[];
  totalItems: number;
  totalShelfItems: number;
  sisterCategories: SisterCategory[];
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Deterministic palette pick from a 2-char monogram. Sum of char codes
// mod 10 → index into RECO_PALETTES. Same monogram always lands on the
// same palette across categories, so e.g. "Cl" always = cover-claude.
function paletteForMonogram(monogram: string): RecoPalette {
  if (!monogram) return RECO_PALETTES[0];
  let sum = 0;
  for (const ch of monogram.toLowerCase()) sum += ch.charCodeAt(0);
  return RECO_PALETTES[sum % RECO_PALETTES.length];
}

// 2-char avatar key, lowercase, used in <div class="row-avatar cl">.
// Falls through RECO_AVATAR_KEYS so any monogram lands on a known tint.
function avatarKeyForMonogram(monogram: string): string {
  const lc = (monogram || '').toLowerCase().slice(0, 2).padEnd(2, '·');
  // Prefer the avatar key whose 2 chars match the monogram (case-insensitive)
  // — gives Claude → "cl" the named claude-violet palette in the table.
  const directMatch = RECO_AVATAR_KEYS.find((k) => k === lc);
  if (directMatch) return directMatch;
  // Otherwise stable hash → one of the named tints (deterministic per monogram).
  let sum = 0;
  for (const ch of lc) sum += ch.charCodeAt(0);
  return RECO_AVATAR_KEYS[sum % RECO_AVATAR_KEYS.length];
}

function deriveMonogram(name: string): string {
  // First-letter-of-each-of-first-two-words, capitalised. Fallback to
  // first two letters of the name. Final fallback "·".
  const cleaned = name.replace(/[^A-Za-z0-9\s]/g, '').trim();
  if (!cleaned) return '··';
  const words = cleaned.split(/\s+/);
  if (words.length >= 2 && words[0].length > 0 && words[1].length > 0) {
    return (words[0][0] + words[1][0].toLowerCase());
  }
  if (cleaned.length >= 2) return cleaned[0].toUpperCase() + cleaned[1].toLowerCase();
  return cleaned[0].toUpperCase() + '·';
}

function chipFromCta(cta?: string): ChipKind | null {
  if (!cta) return null;
  const key = cta.toLowerCase().trim();
  if (key === 'affiliate') return 'affiliate';
  if (key.includes('open')) return 'open';
  if (key === 'free' || key.includes('free trial')) return 'free';
  if (key.includes('free tier')) return 'free-tier';
  if (key === 'paid' || key.includes('subscription')) return 'paid';
  return null;
}

function firstSentence(s: string | undefined): string {
  if (!s) return '';
  const m = s.match(/^([^.!?]+[.!?])/);
  return (m ? m[1] : s).trim();
}

function linkLabelForUrl(url: string | null, override?: string): string {
  if (override) return override;
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

interface RawTool {
  name: string;
  attr?: string;
  take?: string;
  cta?: string;
  url?: string;
  id?: string;
  oneLiner?: string;
  monogram?: string;
  coverVariant?: CoverVariant;
  coverAsset?: string;
  coverPalette?: string;
  cadence?: CadenceKind;
  chip?: ChipKind;
  highlight?: boolean;
  sectionId?: string;
  meta?: string;
  maker?: string;
  linkLabel?: string;
  mustHave?: boolean;
}

interface RawSection {
  id: string;
  title: string;
  icon?: string;
  eyebrow?: string;
  label?: string;
}

interface RawRecoData {
  title: string;
  titleHtml?: string;
  eyebrow?: string;
  lede?: string;
  category: string;
  volume?: string;
  tools?: RawTool[];
  sections?: RawSection[];
}

// Default Phosphor glyph for sections that didn't declare an icon.
// Plain folder is the calmest fallback — won't read as wrong if the
// MDX author forgets, and trivial to override.
const DEFAULT_SECTION_ICON = 'ph-folder';

export function normaliseTool(
  raw: RawTool,
  categorySlug: string = '',
  categoryTitle: string = '',
): NormalisedTool {
  const monogram = raw.monogram || deriveMonogram(raw.name);
  const url = raw.url || null;
  const palette = (raw.coverPalette && (RECO_PALETTES as readonly string[]).includes(raw.coverPalette))
    ? (raw.coverPalette as RecoPalette)
    : paletteForMonogram(monogram);
  const chip = raw.chip || chipFromCta(raw.cta);
  return {
    id: raw.id || kebab(raw.name),
    name: raw.name,
    oneLiner: raw.oneLiner || firstSentence(raw.take),
    take: raw.take || '',
    url,
    monogram,
    avatarKey: avatarKeyForMonogram(monogram),
    coverVariant: raw.coverVariant || 'abstract',
    coverAsset: raw.coverAsset || null,
    coverPalette: palette,
    cadence: raw.cadence || null,
    chip,
    highlight: raw.highlight || false,
    sectionId: raw.sectionId || 'all',
    meta: raw.meta || raw.attr || '',
    maker: raw.maker || (raw.attr ? raw.attr.split('·')[0].trim() : ''),
    linkLabel: linkLabelForUrl(url, raw.linkLabel),
    mustHave: raw.mustHave || false,
    categorySlug,
    categoryTitle,
  };
}

export async function normaliseReco(data: RawRecoData, currentSlug: string): Promise<NormalisedReco> {
  const tools = (data.tools || []).map((t) => normaliseTool(t, currentSlug, data.category));

  // If author declared sections, group by sectionId. Otherwise collapse
  // into one synthetic "All" section so the table still renders.
  let rawSections: RawSection[];
  if (data.sections && data.sections.length) {
    rawSections = data.sections;
  } else {
    rawSections = [{ id: 'all', title: data.title, label: 'All entries' }];
  }

  const sections: NormalisedSection[] = rawSections.map((s) => {
    const items = tools.filter((t) => (data.sections ? t.sectionId === s.id : true));
    return {
      id: s.id,
      title: s.title,
      icon: s.icon || DEFAULT_SECTION_ICON,
      eyebrow: s.eyebrow,
      label: s.label,
      items,
      shelfItems: items.filter((t) => t.highlight),
    };
  });

  // Sister categories — every other live reco, with totals from its tools array.
  const allRecos = await getCollection('recos');
  const sisterCategories: SisterCategory[] = allRecos
    .filter((r) => !r.data.draft)
    .map((r) => ({
      slug: r.slug,
      title: r.data.category || r.data.title,
      count: (r.data.tools || []).length,
      lede: (r.data.lede || '').replace(/\s+/g, ' ').trim().split('. ')[0] || '',
      current: r.slug === currentSlug,
    }))
    // Sort: current first, then by count desc as a useful default
    .sort((a, b) => {
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;
      return b.count - a.count;
    });

  return {
    title: data.title,
    titleHtml: data.titleHtml || null,
    eyebrow: data.eyebrow || `My recos · ${data.category}`,
    lede: data.lede || '',
    category: data.category,
    volume: data.volume || null,
    sections,
    totalItems: tools.length,
    totalShelfItems: tools.filter((t) => t.highlight).length,
    sisterCategories,
  };
}

// Collect every mustHave:true tool across all live recos, annotated with
// originating category. Used by /recos/must-haves/ — the cross-category
// "what I'd refuse to give up" page.
export async function collectMustHaves(): Promise<NormalisedTool[]> {
  const all = await getCollection('recos');
  const out: NormalisedTool[] = [];
  for (const r of all) {
    if (r.data.draft || r.data.status === 'coming-soon') continue;
    const tools = (r.data.tools || []) as RawTool[];
    for (const t of tools) {
      if (!t.mustHave) continue;
      out.push(normaliseTool(t, r.slug, r.data.category));
    }
  }
  return out;
}
