// Astro content collection schemas.
// One collection per major repeatable data array in the v6 mockup.
// Add fields here as porting reveals them — keep Zod strict.

import { defineCollection, z } from 'astro:content';

// ─── Articles ────────────────────────────────────────────────
const articles = defineCollection({
  type: 'content',
  schema: z.object({
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
    draft: z.boolean().default(false),
  }),
});

// ─── Newsletter ──────────────────────────────────────────────
const newsletter = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleHtml: z.string().optional(),
    eyebrow: z.string().optional(),
    byline: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    issue: z.number().optional(),
    publishedAt: z.string().optional(),
    readingMinutes: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Products ────────────────────────────────────────────────
const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleHtml: z.string().optional(),
    eyebrow: z.string().optional(),
    byline: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    category: z.string(),
    price: z.number(), // in cents (USD by default)
    currency: z.enum(['USD', 'AUD', 'EUR', 'GBP']).default('USD'),
    stripePriceEnvKey: z.string().optional(), // e.g. "STRIPE_PRICE_HANDBOOK_OF_AI_FLUENCY"
    paymentLinkUrl: z.string().url().optional(), // fallback if no Stripe Price configured yet
    deliverable: z.enum(['pdf', 'notion', 'course', 'physical', 'service']).default('pdf'),
    badge: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Prompts ─────────────────────────────────────────────────
const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    category: z.string(),
    persona: z.string().optional(), // which AI persona it's tuned for
    bestFor: z.string().optional(),
    prompt: z.string(), // the actual prompt text — for copy-to-clipboard
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Recos (affiliate recommendations) ───────────────────────
const recos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    category: z.string(),
    affiliateUrl: z.string().url(),
    vendor: z.string().optional(),
    pricing: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Services ────────────────────────────────────────────────
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    duration: z.string().optional(), // e.g. "1 hour", "Two weeks"
    startingPrice: z.string().optional(), // free text, e.g. "From $1,200"
    bookingMode: z.enum(['lead-form', 'direct-link', 'waitlist']).default('lead-form'),
    bookingUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Ventures ────────────────────────────────────────────────
const ventures = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    stage: z.enum(['concept', 'building', 'live', 'archived']).default('building'),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Courses ─────────────────────────────────────────────────
const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    status: z.enum(['live', 'coming-soon', 'cohort-based']).default('coming-soon'),
    price: z.number().optional(), // cents
    currency: z.enum(['USD', 'AUD']).default('USD'),
    stripePriceEnvKey: z.string().optional(),
    waitlistEnabled: z.boolean().default(true),
    durationLabel: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Dossiers (Library) ──────────────────────────────────────
const dossiers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleHtml: z.string().optional(),
    eyebrow: z.string(),
    byline: z.string(),
    category: z.enum([
      'books', 'essays', 'letters', 'speeches', 'manifestos', 'poems',
      'short-stories', 'scientific-papers', 'thought-experiments',
      'mental-models', 'ai-concepts', 'vocabulary', 'remarkable-people',
      'conversations',
    ]),
    lede: z.string(),
    quote: z.object({ text: z.string(), cite: z.string() }).optional(),
    whyItMatters: z.string().optional(),
    keyIdeas: z.array(z.string()).default([]),
    takeForward: z.string().optional(),
    keyConcept: z.object({ name: z.string(), desc: z.string() }).optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Exhibits (Lab) ──────────────────────────────────────────
const exhibits = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    cover: z.string().optional(),
    status: z.enum(['live', 'archived', 'concept']).default('live'),
    techStack: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
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
