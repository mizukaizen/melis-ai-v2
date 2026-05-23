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
      persona: z.string().optional(),
      bestFor: z.string().optional(),
      prompt: z.string(),
      cover: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .passthrough(),
});

// ─── Recos ───────────────────────────────────────────────────
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
      affiliateUrl: z.string().url().optional(),
      tools: z
        .array(
          z.object({
            name: z.string(),
            attr: z.string().optional(),
            take: z.string().optional(),
            cta: z.string().optional(),
            url: z.string().url().optional(),
          }),
        )
        .optional(),
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
