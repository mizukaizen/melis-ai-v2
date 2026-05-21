# melis.ai

Sean Melis's AI education brand — Astro 5 production port of the v6 single-file HTML mockup.

## Stack

- **Astro 5** + TypeScript + content collections
- **Tailwind 4** (via `@tailwindcss/vite`)
- **MDX** for long-form content (articles, newsletter, products, courses, dossiers, exhibits)
- **Phosphor Icons** for all iconography
- **Cormorant Garamond** (display) + **Inter** (body) + **JetBrains Mono** (chrome)
- **Stripe Checkout** (hosted) for products + courses
- **BeeHiiv** for newsletter signups
- **Resend** for post-purchase + lead-form transactional email
- **Vercel** for hosting (server output via `@astrojs/vercel`)

## Local dev

```bash
pnpm install
cp .env.example .env.local
# populate .env.local with real keys (see MIGRATION-NOTES.md)
pnpm dev
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, ticker, portal grid |
| `/articles/[slug]` | Articles |
| `/newsletter/[slug]` | Newsletter posts + subscribe form |
| `/products/[slug]` | Products with Stripe Checkout |
| `/prompts/[slug]` | Prompt library with copy-to-clipboard |
| `/recos/[slug]` | Affiliate recommendations (UTM-tagged) |
| `/services/[slug]` | Services + lead form |
| `/ventures/[slug]` | Ventures |
| `/courses/[slug]` | Courses with Stripe Checkout |
| `/dossiers/[category]/[slug]` | Library dossiers — 3-level routing |
| `/lab/`, `/lab/exhibits/[slug]` | Lab + Exhibits |
| `/about/`, `/about/sean/`, `/about/melis-ai/` | About |
| `/api/checkout/[productSlug]` | Stripe Checkout session creation |
| `/api/subscribe` | BeeHiiv subscribe endpoint |
| `/api/webhooks/stripe` | Stripe webhook receiver |
| `/api/lead` | Services lead form receiver |

## Migration notes

See `MIGRATION-NOTES.md` for the full porting log, env-var checklist, manual steps, and known parity gaps.
