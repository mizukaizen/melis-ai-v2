// Astro content collection schemas.
// One collection per major repeatable data array in the v6 mockup.
// Schemas are intentionally permissive (`.passthrough()`) so unported fields
// don't break builds — but the named fields are typed correctly for the
// renderer. As porting reveals more shape, add named fields here.

import { defineCollection, z } from 'astro:content';

// Reusable
const quoteSchema = z
  .object({ text: z.string(), cite: z.string() })
  .partial({ cite: true });

const stripCell = z.object({ lbl: z.string(), val: z.string() });
const stat = z.object({
  icon: z.string().optional(),
  val: z.string(),
  lbl: z.string().optional().default(''),
});
const cta = z.object({ icon: z.string().optional(), label: z.string() });
const pill = z.object({ label: z.string(), cls: z.string().optional() });

// ─── Articles ────────────────────────────────────────────────
// `status` gates detail-route generation:
//   live        → real body, /articles/<slug>/ built, card is clickable
//   coming-soon → stub body, NO detail route built, card shows "Coming soon"
//                 badge + renders as <div> (non-clickable) on index + sb2.
const articles = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      byline: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      category: z.string().optional(),
      publishedAt: z.string().optional(),
      readingMinutes: z.number().optional(),
      tags: z.array(z.string()).default([]),
      status: z.enum(['live', 'coming-soon']).default('coming-soon'),
    })
    .passthrough(),
});

// ─── Newsletter ──────────────────────────────────────────────
const newsletter = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      byline: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      issue: z.number().optional(),
      publishedAt: z.string().optional(),
      readingMinutes: z.number().optional(),
      status: z.enum(['live', 'coming-soon']).default('coming-soon'),
    })
    .passthrough(),
});

// ─── Products ────────────────────────────────────────────────
const products = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      byline: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      category: z.string(),
      price: z.number(), // in cents
      currency: z.string().default('USD'),
      stripePriceEnvKey: z.string().optional(),
      paymentLinkUrl: z.string().url().optional(),
      deliverable: z.string().default('pdf'),
      badge: z.string().optional(),
      breakdown: z.array(z.object({ name: z.string(), count: z.string() })).optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Prompts ─────────────────────────────────────────────────
const prompts = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      category: z.string(),
      categorySlug: z.string().optional(),
      categoryGroup: z.enum(['Business', 'Think & Communicate', 'Life & Career', 'Build', 'Featured']).optional(),
      subcategory: z.string().optional(),
      payoff: z.enum(['save', 'money', 'decide', 'create', 'grow']).optional(),
      icon: z.string().optional(),
      tier: z.string().optional(),
      sourceId: z.string().optional(),
      persona: z.string().optional(),
      bestFor: z.string().optional(),
      prompt: z.string(),
      cover: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Recos ───────────────────────────────────────────────────
// Cadence drives the coloured cadence-dot on cards + table rows
// (teal=daily, amber=weekly, grey=monthly). Chip drives the
// affiliate/open/free/paid pill. coverVariant + coverPalette feed
// the RecoCard component; A=abstract gradient + monogram (default),
// B=real cover art (img), C=portrait silhouette.
const recoCadence = z.enum(['daily', 'weekly', 'monthly']).optional();
const recoChip = z.enum(['affiliate', 'open', 'free', 'paid', 'free-tier']).optional();
const recoCoverVariant = z.enum(['abstract', 'real', 'portrait']).default('abstract');

const recoTool = z
  .object({
    // Legacy v1 fields — kept for backward compat with un-migrated MDX.
    name: z.string(),
    attr: z.string().optional(),
    take: z.string().optional(),
    cta: z.string().optional(),
    url: z.string().url().optional(),
    // v7 shelf+table fields (all optional — sensible defaults applied
    // by src/lib/recos.ts so un-migrated entries still render).
    id: z.string().optional(),
    oneLiner: z.string().optional(),          // shorter than `take`, used on cards
    monogram: z.string().optional(),          // 2-char string, defaults to name initials
    coverVariant: recoCoverVariant.optional(),
    coverAsset: z.string().optional(),        // public/recos/<file> for variant B/C
    coverPalette: z.string().optional(),      // one of the 10 named palettes; default = hash(monogram)
    cadence: recoCadence,
    chip: recoChip,
    highlight: z.boolean().optional(),        // true = appears on a shelf; all items appear in table
    sectionId: z.string().optional(),         // groups by section in shelf + table
    meta: z.string().optional(),              // mono detail line on card footer ("$20/mo", "open source")
    maker: z.string().optional(),             // table column 3 — maker · category
    linkLabel: z.string().optional(),         // overrides domain-from-url in the table link
  })
  .passthrough();

const recoSection = z
  .object({
    id: z.string(),
    romanNumeral: z.string(),                 // "I.", "II.", ...
    title: z.string(),
    eyebrow: z.string().optional(),
    label: z.string().optional(),             // small-caps shelf-label under the rack
  });

const recos = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      category: z.string(),
      status: z.enum(['live', 'coming-soon']).default('live'),
      affiliateUrl: z.string().url().optional(),
      tools: z.array(recoTool).optional(),
      // v7: ordered section list. If omitted, lib/recos.ts collapses to
      // one synthetic "All" section so existing un-migrated recos still
      // render (table only, no shelves).
      sections: z.array(recoSection).optional(),
      // Optional per-page mockup-style "Vol. 06" suffix on the hero eyebrow.
      volume: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Services ────────────────────────────────────────────────
const services = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      strip: z.array(stripCell).optional(),
      whatYouGet: z.array(z.unknown()).optional(),
      howItWorks: z.array(z.unknown()).optional(),
      bookingMode: z.enum(['lead-form', 'direct-link', 'waitlist']).default('lead-form'),
      bookingUrl: z.string().url().optional(),
      status: z.enum(['live', 'coming-soon']).default('live'),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Ventures ────────────────────────────────────────────────
const ventures = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      strip: z.array(stripCell).optional(),
      pill: pill.optional(),
      stage: z.enum(['concept', 'building', 'live', 'archived']).default('building'),
      status: z.enum(['live', 'coming-soon']).default('live'),
      groupV1: z.enum(['Live', 'Building', 'Research', 'Paused', 'Archived', 'Past']).optional(),
      url: z.string().url().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Courses ─────────────────────────────────────────────────
const courses = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      subtitle1: z.string().optional(),
      subtitle2: z.string().optional(),
      stats: z.array(stat).optional(),
      ctas: z
        .object({
          primary: cta.optional(),
          secondary: cta.optional(),
        })
        .partial()
        .optional(),
      trailer: z.unknown().optional(),
      modules: z.array(z.unknown()).optional(),
      status: z.enum(['live', 'coming-soon', 'cohort-based']).default('coming-soon'),
      price: z.number().optional(),
      currency: z.string().default('USD'),
      stripePriceEnvKey: z.string().optional(),
      waitlistEnabled: z.boolean().default(true),
      durationLabel: z.string().optional(),
      // Metadata chips — render as a mono-uppercase row between the title
      // and the description on featured/detail cards (mockup line ~10880).
      // Mirrors the "28h · LIVE · 2026 · PREMIUM · LECTURE 1.2" strip.
      duration: z.string().optional(),
      liveStatus: z.string().optional(),
      year: z.string().optional(),
      tier: z.string().optional(),
      lectureMarker: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Dossiers ────────────────────────────────────────────────
// 14 categories — matches LIBRARY_ROOMS + the two empty ones that have
// dossiers but no landing card (short-stories, conversations).
const dossierCategory = z.enum([
  'books', 'essays', 'letters', 'speeches', 'manifestos', 'poems',
  'short-stories', 'scientific-papers', 'thought-experiments',
  'mental-models', 'ai-concepts', 'vocabulary', 'remarkable-people',
  'conversations',
]);

const dossiers = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      titleHtml: z.string().optional(),
      eyebrow: z.string(),
      byline: z.string(),
      category: dossierCategory,
      lede: z.string(),
      quote: quoteSchema.optional(),
      whyItMatters: z.string().optional(),
      keyIdeas: z.array(z.string()).default([]),
      takeForward: z.string().optional(),
      keyConcept: z.object({ name: z.string(), desc: z.string() }).optional(),
      cover: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Exhibits ────────────────────────────────────────────────
const exhibits = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      cover: z.string().optional(),
      status: z.enum(['live', 'archived', 'concept']).default('live'),
      techStack: z.array(z.string()).default([]),
      liveUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

export const collections = {
  articles,
  newsletter,
  products,
  prompts,
  recos,
  services,
  ventures,
  courses,
  dossiers,
  exhibits,
};
