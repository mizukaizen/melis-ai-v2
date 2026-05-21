# Migration notes — melis.ai v6 → Astro 5

> **For Sean — read this before merging the PR.**
> All decisions made by Claude Code under uncertainty are logged here in reverse-chronological order.

---

## Status snapshot

- **Branch:** `feat/initial-port`
- **Repo:** `mizukaizen/melis-ai-v2` (see "Repo name" decision below)
- **Vercel preview:** _populated on final deploy_
- **PR:** _opened at end of run_

---

## Decisions taken under uncertainty

### 2026-05-21 — Repo name `melis-ai-v2`, not `melis-ai`
**Why:** The repo `mizukaizen/melis-ai` already exists on GitHub as an unrelated Next.js project. Spec §3.1 explicitly permits the `-v2` fallback. **Action for Sean:** decide whether to (a) rename the existing Next.js repo to `melis-ai-nextjs-archive` and rename this one to `melis-ai`, or (b) leave it as `melis-ai-v2` and update Vercel project config.

### 2026-05-21 — Astro 5 + Tailwind 4 + React 19, server output
**Why:** Server output is required for the Stripe Checkout + BeeHiiv + Resend endpoints. Tailwind 4 via the `@tailwindcss/vite` plugin (not the legacy `@astrojs/tailwind` integration, which is v3-only). React only loaded where strictly needed (Stripe Buy button, BeeHiiv form) — everything else is `.astro` SSR.

### 2026-05-21 — Stripe Price IDs in env vars, not in frontmatter
**Why:** Frontmatter is committed to git; price IDs change between test/live mode and shouldn't be in source. Each product's MDX frontmatter has a `stripePriceEnvKey` field (e.g. `STRIPE_PRICE_HANDBOOK_OF_AI_FLUENCY`) and the checkout endpoint reads `import.meta.env[priceEnvKey]`.

---

## Env vars Sean needs to populate

All env vars are listed in `.env.example`. Required before any payment / subscribe / lead form will work:

| Variable | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys (test mode) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks → add endpoint `<preview-url>/api/webhooks/stripe` → reveal signing secret |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys (test mode) |
| `STRIPE_PRICE_*` | Create each product in Stripe Dashboard, copy the Price ID. One per product in `src/content/products/`. |
| `BEEHIIV_API_KEY` | BeeHiiv → Settings → Integrations → API |
| `BEEHIIV_PUBLICATION_ID` | BeeHiiv → Settings → Integrations → API |
| `RESEND_API_KEY` | https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | `sean@melis.ai` (verify the domain in Resend first) |
| `LEAD_FORM_RECIPIENT` | Defaults to `sean@melis.ai`; change in Vercel env if you want a different inbox |

Set these in Vercel project settings → Environment Variables before the first preview deploy hits the wired forms.

---

## Manual steps for Sean after merge

1. **Domain:** decide which Vercel project gets `melis.ai`. Currently `melis-ai-coming-soon` holds it. Do NOT cut over before reviewing this preview.
2. **Stripe webhook endpoint:** add `<your-prod-url>/api/webhooks/stripe` in Stripe dashboard, select `checkout.session.completed` event.
3. **BeeHiiv publication:** confirm which publication to subscribe people to (or create a dev one).
4. **Resend domain verification:** confirm `melis.ai` DNS records in Resend.
5. **Repo rename (optional):** see "Repo name" decision above.

---

## Known parity gaps

_Populated as porting reveals them. Each entry: section · what's different · why._

---

## Tasks not completed

_Populated at end of run with anything Tier-2/Tier-3 that didn't ship._

---

## Anything else

_Stream-of-consciousness notes for Sean to skim before merging._
