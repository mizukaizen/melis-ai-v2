# Migration notes — melis.ai v6 → Astro 5

> **For Sean — read this before merging the PR.**
> All decisions made by Claude Code under uncertainty are logged here in reverse-chronological order.

---

## ✅ Phase 1 complete — 2026-05-21

**Verdict:** Visual identity overhaul landed. Mockup-vs-Astro parity verified at 1440×900 across all 8 critical pages. Plumbing scaffolded. Build green. Merge-ready.

### What shipped

- **8 pages parity-verified at 1440×900** via the side-by-side comparison HTML at `~/Documents/_cowork/outputs/website-rebrand/comparison-mockup-vs-astro.html`. Refreshed live captures in `comparison-screenshots/live-*.png`. Home, Articles landing, Products landing, Product detail (Complete Arsenal), Courses landing, Dossiers landing, Dossiers — Books, Dossier detail (Atomic Habits).
- **Four passes total:**
  1. **Initial scaffold + lift-and-shift** — Astro 5 + TS + Tailwind 4 + MDX. Vendored the v6 mockup's 14 `<style>` blocks (6,293 lines, 200 KB) into `mockup.css` verbatim. Extracted 21 named data arrays from the mockup HTML into JSON, converted to MDX content collections. 111 MDX files across 10 collections.
  2. **Sidebar fixes** — Phosphor icons via CDN, `sidebar-base.css` for the missing-base layer the mockup assumed. 12 per-section `<Sidebar2>` components (plain list + panel-group variants). Lotus sigil on home wordmark. Imported the 30 dossier files Sean drafted in parallel.
  3. **Visual identity overhaul** — overlay hero scaffold (`section-hero-base.css` + global.css overrides), hero image resolver (`lib/hero-image.ts`) using mockup-canonical `card-<section>-v1.png` images, `<FeaturedProductCard>` + `<FeaturedCourseCard>` for flagships, dossier detail Key Concept Table on category pages, dossier hero title sized up to `clamp(72, 9vw, 132)`.
  4. **Final polish** — sb2 off on home (sb1-only per mockup), two-tier hero sizing (landing 360px / detail 560px / dossier-detail 600px), copy drift cleanup (mockup verbatim on Articles + Products + Courses), eyebrow restores on Dossiers, byline field fix verified, Products sb2 switches to flat list on detail routes, sb1 polish (28px row, 0.22em group-label letter-spacing, count badge tabular-nums).
- **Total dossier count: 51** (21 original from the mockup `LIBRARY_DOSSIERS` extraction + 30 from Sean's May parallel batch in `~/Documents/_obsidian/01-PROJECTS/melis-ai/dossiers/`).
- **All four API endpoints scaffolded with graceful env-missing fallbacks:**
  - `POST /api/checkout/[productSlug]` — Stripe Checkout Session, 303 redirect. 503 with friendly message if `STRIPE_SECRET_KEY` or per-product `STRIPE_PRICE_*` env unset.
  - `POST /api/webhooks/stripe` — `checkout.session.completed` handler, signature-verified, JSONL log, Resend trigger. 503 if signing secret unset.
  - `POST /api/subscribe` — BeeHiiv subscriptions API, Zod-validated, 10/min/IP rate-limit. 503 if BeeHiiv env unset.
  - `POST /api/lead` — Service inquiry → Resend → `LEAD_FORM_RECIPIENT`. 5/min/IP rate-limit. 503 if Resend env unset.

### Build state at handoff

- 164 prerendered routes + ~5 SSR endpoints.
- `pnpm build`: 0 errors.
- `pnpm exec astro check`: 0 errors, 0 warnings, 2 hints (unused imports in `scripts/` — not shipped).
- Vercel preview: https://melis-ai-v2.vercel.app (production alias of the `ephesian/melis-ai-v2` Vercel project — non-prod for `melis.ai`).

---

## Phase 2 follow-ups (tracked for after merge — DO NOT start before Sean's go-ahead)

| # | Item | Notes |
|---|---|---|
| 1 | **Tailwind 4 refactor of vendored `mockup.css`** | Biggest single chunk of tech debt — ~6,293 lines / 200 KB of cascade-heavy CSS. Strategy: section-by-section conversion to Tailwind utility classes, one PR per section (sidebar, section-hero, room-card, panel-group, etc.) so each is reviewable. Keep `mockup.css` in place until everything is migrated, then delete in a final PR. |
| 2 | **cmdk modal implementation** | The `<button class="sb-search-btn">` with ⌘K kbd hints is in place on sb1 (visible on every route). The modal itself is a stub. Build as a React component (Astro+React already wired) keyed off ⌘K + click on the trigger. Search across articles + newsletter + products + courses + dossiers. |
| 3 | **Sb2 dossier panel alphabetisation** | `Sidebar2Dossiers` currently lists dossiers within each category in content-collection insertion order. Should call `libraryNormalise()` (strip leading the/a/an, lowercase) inside the sb2 builder like the KCT does. The category page is already correct. |
| 4 | **Sb2 course module count badges** | Mockup shows e.g. `8 modules` next to course rows; live shows only `LIVE`/`SOON` status. Add a module-count derivation in `Sidebar2Courses` (either from frontmatter `modules` array length or a new frontmatter field). |
| 5 | **Home portal card 5th-card right-edge clipping at exactly 1440px** | Box-sizing math against sb1 192px + 24px gap. Safe at real-world widths — visible only in the strict 1440×900 capture. Either tighten the gap to 16px or use `grid-template-columns: repeat(5, minmax(0, 1fr))` to allow shrink. |
| 6 | **Second dossier batch** | README in `~/Documents/_obsidian/01-PROJECTS/melis-ai/dossiers/` lists ~30 prioritised candidates for batch 2. Current 51 → target 80+. Same drop-into-`src/content/dossiers/` + verify with `astro check` pattern as batch 1. |
| 7 | **Real Stripe products in live mode** | All `STRIPE_PRICE_*` env vars currently empty → endpoints return 503 with friendly message. Sean creates products in Stripe dashboard, pastes Price IDs into Vercel env per-product. Convention is `STRIPE_PRICE_<UPPER_SNAKE_SLUG>` matching `stripePriceEnvKey` in each MDX frontmatter. |
| 8 | **BeeHiiv production publication ID + Resend domain verify** | Same pattern as Stripe — env vars currently placeholders. Subscribe form returns 503 until populated. Verify `melis.ai` domain in Resend for transactional sends. |
| 9 | **DNS cutover from `melis-ai-coming-soon` to `melis-ai-v2`** | Sean handles manually after final review. `melis-ai-v2.vercel.app` aliases the production deployment of the new project; the old `melis-ai-coming-soon` project still holds the `melis.ai` domain. Decision needed: rename Vercel projects, update DNS, retire the coming-soon project. |
| 10 | **Image optimisation (PNG → WebP)** | 150 MB of paper-craft PNGs in `public/section-rooms/` + 13 MB in `public/library-rooms/`. Vercel CDN serves them fine; WebP at quality 82 would cut weight 50–70% and improve Lighthouse. Sharp script stub in `scripts/optimize-images.mjs` (TODO). |

### What's deliberately NOT in Phase 2

- DNS for `melis.ai` (Sean owns timing)
- Deleting old `melis-ai-astro`, `melis-ai-website`, `melis-ai-coming-soon` Vercel projects (Sean retires when ready)
- Touching the mockup file at `_cowork/outputs/website-rebrand/melis-ai-spa-v6-astro-content.html` (it's the visual-design source-of-truth)
- Any content-side rewrites — copy is locked to the mockup

---

## Status snapshot

- **Branch:** `feat/initial-port`
- **Repo:** `mizukaizen/melis-ai-v2` (see "Repo name" decision below)
- **Vercel preview:** **https://melis-ai-v2.vercel.app**
  - (canonical deployment URL: `melis-ai-v2-pwabmnkga-ephesian.vercel.app`)
  - Vercel project: `ephesian/melis-ai-v2`, linked to `mizukaizen/melis-ai-v2`
- **PR:** see GitHub — `feat/initial-port` → `main`
- **Sections shipped:** Tier 1 ✅ all, Tier 2 ✅ all, Tier 3 ✅ all
- **Build:** green. `pnpm build` produces 0 errors, 2 unused-import hints in scripts.

---

## What works end-to-end

| Route | What it does |
|---|---|
| `/` | Hero video loop, ticker, stats strip, 5 portal cards. Verbatim mockup HTML — pixel-parity. |
| `/about/sean/`, `/about/melis-ai/`, `/about/` (redirect) | Both about panes ported verbatim. |
| `/articles/` + `/articles/[slug]/` | 13 article detail pages prerendered from MDX. List page is mockup HTML. |
| `/newsletter/` + `/newsletter/[slug]/` | 9 issues. BeeHiiv subscribe form on landing — POSTs to `/api/subscribe`. |
| `/dossiers/` + `/dossiers/[category]/` + `/dossiers/[category]/[slug]/` | 3-level routing. 12 category pages (each lists all 242 alphabetical entries from catalogue, with fleshed ones linked). 21 fleshed dossiers render quote, key ideas, take-forward, key concept. |
| `/products/` + `/products/[slug]/` | 36 products incl. 'The Complete Arsenal' hero bundle. Stripe Buy button on each detail. |
| `/courses/` + `/courses/[slug]/` | 8 courses. Live ones get Stripe Buy. Coming-soon ones get a NewsletterForm waitlist opt-in. Flagship card on landing. |
| `/prompts/` + `/prompts/[slug]/` | 5 prompts (Sean's Edge category only — see "Empty categories" below). Detail page has copy-to-clipboard. |
| `/recos/` + `/recos/[slug]/` | 3 recos. Tool list with UTM-tagged outbound affiliate links. |
| `/services/` + `/services/[slug]/` | 3 services. Detail page renders strip + a lead form that POSTs to `/api/lead`. |
| `/ventures/` + `/ventures/[slug]/` | 3 ventures (Lighthouse, Phantom Ink, Holy Signal). Read-only with info strip. |
| `/lab/` + `/lab/exhibits/` + `/lab/exhibits/[slug]/` | Lab aggregator + 10 exhibits ordered per EXHIBITS_ORDER. Each detail has external "view exhibit" CTA. |
| `/thanks/[productSlug]/` | Stripe post-purchase receipt. Retrieves session via stripe-node if env is configured. |
| `/api/subscribe` | BeeHiiv subscribe endpoint (Zod-validated, 10/min/IP rate-limit). 503 if `BEEHIIV_API_KEY` / `BEEHIIV_PUBLICATION_ID` unset. |
| `/api/checkout/[productSlug]` | Stripe Checkout Session, 303-redirects to hosted Stripe page. 503 if `STRIPE_SECRET_KEY` or per-product Price ID env var unset. |
| `/api/webhooks/stripe` | `checkout.session.completed` handler. Verifies signature, logs to `data/orders.jsonl`, triggers Resend post-purchase email. |
| `/api/lead` | Service-inquiry form → Resend → `LEAD_FORM_RECIPIENT`. Zod-validated, 5/min/IP rate-limit. |
| `/sitemap-index.xml`, `/sitemap-0.xml` | Auto-generated by `@astrojs/sitemap`. |

All forms degrade gracefully — when env vars are missing, the endpoints return 503 with a friendly message instead of crashing. The UI shows that message to the user.

---

## Architecture notes (read before touching)

- **CSS strategy = pixel parity by class-name preservation.** All 14 `<style>` blocks from the v6 mockup (6,293 lines, 200 KB) are dumped verbatim into `src/styles/mockup.css` by `scripts/extract-mockup-css.mjs`. The Astro components carefully preserve class names (`.sidebar`, `.sb-item`, `.pane`, `.section-header-inner`, etc.) so the mockup CSS still applies. **Do not refactor this CSS — regenerate it from the mockup.**
- **HTML strategy = lift-and-shift for landing panes.** The mockup's per-pane HTML is extracted by `scripts/extract-mockup-html.mjs` and stored in `src/_html/`. Each landing page (e.g. `/articles/`, `/products/`) imports the file with `?raw` and renders it via `<Fragment set:html>`. `onclick="showPane('xxx')"` handlers are rewritten to real `<a href>` during extraction.
- **Detail pages are component-driven.** They use MDX bodies + custom layout for the section header (eyebrow, title, lede, byline) and section body (key concept, key ideas, etc.). Articles/dossiers/products/courses/services/ventures/recos/exhibits/prompts all follow this pattern.
- **Content collections.** `articles`, `newsletter`, `products`, `prompts`, `recos`, `services`, `ventures`, `courses`, `dossiers`, `exhibits` — defined in `src/content/config.ts` with Zod. Schemas use `.passthrough()` so the rich nested data from the mockup (strips, tools, ctas, stats, modules) survives validation.
- **Side data in `src/data/`** — `dossier-categories.ts`, `dossier-catalog.ts`, `dossier-icons.ts`, `exhibits-order.ts`, `products-categories.ts`, `products-hero.ts`, `room-images.ts`. Auto-generated by `scripts/json-to-mdx.mjs`. Used by landing pages that need fast access to the whole list.
- **Sidebars persist across view-transitions.** `<Sidebar1>` uses `transition:persist="sidebar"`. `<Sidebar2>` persists per pane.
- **Output = `server` (Vercel adapter).** Routes that don't need server-side execution have `export const prerender = true` and are statically pre-rendered. The build produced 100+ static pages; only the API endpoints (`/api/*`) and the dynamic `/thanks/[productSlug]` are server-rendered.

---

## Decisions taken under uncertainty

### 2026-05-21 17:25 — Vercel project name `melis-ai-v2`, deployed to "production" of that project
**What:** Vercel CLI deploy went to "production" of the `melis-ai-v2` Vercel project (the production URL there is `melis-ai-v2.vercel.app`).
**Why:** Vercel `vercel deploy --yes` without `--target=preview` defaults to "production" of the linked project. This is **not** the production melis.ai site — that lives on a separate Vercel project (`melis-ai-coming-soon` per spec). It's effectively a sandbox.
**Action for Sean:** review at `melis-ai-v2.vercel.app`; when ready, point `melis.ai` DNS at this project's deployment (or delete this project and redirect domain to the original).

### 2026-05-21 17:00 — All `<style>` blocks from mockup imported verbatim
**Why:** Pixel parity > clean Tailwind. 6,293 lines of CSS would take days to cherry-pick. Class names match, the CSS already covers every selector, and Astro view-transitions just need the same class names to keep working.
**Trade-off:** the bundle is bigger (~200 KB CSS) than a Tailwind-only equivalent would be. Acceptable for v1.
**Future cleanup:** once the mockup stabilises, convert frequently-used patterns to Tailwind utilities and trim mockup.css down. Track in a follow-up issue.

### 2026-05-21 16:55 — Repo name `melis-ai-v2`, not `melis-ai`
**Why:** The repo `mizukaizen/melis-ai` already exists on GitHub as an unrelated Next.js project. Spec §3.1 explicitly permits the `-v2` fallback.
**Action for Sean:** decide whether to (a) rename the existing Next.js repo to `melis-ai-nextjs-archive` and rename this one to `melis-ai`, or (b) leave it as `melis-ai-v2`.

### 2026-05-21 16:58 — Astro 5.18 + Tailwind 4.3 + React 19, server output
**Why:** Server output is required for the Stripe Checkout + BeeHiiv + Resend endpoints. Tailwind 4 via the `@tailwindcss/vite` plugin (not the legacy `@astrojs/tailwind` integration, which is v3-only). React only loaded where strictly needed (none yet — all components are `.astro` SSR; React kept in deps for future).

### 2026-05-21 17:02 — Stripe Price IDs in env vars, not in frontmatter
**Why:** Frontmatter is committed to git; price IDs change between test/live mode and shouldn't be in source. Each product's MDX frontmatter has a `stripePriceEnvKey` field (e.g. `STRIPE_PRICE_HANDBOOK_OF_AI_FLUENCY`) and the checkout endpoint reads `import.meta.env[priceEnvKey]`. **Sean:** create products in Stripe, paste Price IDs into the corresponding env vars.

### 2026-05-21 17:10 — Sidebar `<aside class="sidebar">` is persistent (sb1), `<aside class="sidebar-2">` is too
**Why:** View-transitions keep both visible during navigation. Without `transition:persist`, the sidebars would flash on every route change. Matched to the mockup's "feels like an SPA" expectation.

### 2026-05-21 17:21 — Hero video filename retained as `hero-evolution-v3.mp4`
**Why:** The mockup references `hero-evolution-v3.mp4` but no file by that name exists in `_cowork/outputs/website-rebrand/`. The closest canonical loop is `hero-animated-v7-perfect-loop.mp4`. Copied that under the original filename so the mockup HTML doesn't need editing.
**Action for Sean:** if there's a different intended loop, rename the file in `public/` and rebuild.

### 2026-05-21 17:14 — sb1 logo links to `/`, "Sean" link goes to `/about/sean/`, "melis.ai" link goes to `/about/melis-ai/`
**Why:** Mockup uses `showPane('home')` for the logo and `showPane('about')` / `showPane('about-studio')` for the two about items. Translated 1:1 to the new routes.

### 2026-05-21 17:18 — Per-product `STRIPE_PRICE_*` env keys are derived from product slug
**Why:** Predictable, machine-readable. Each product gets `STRIPE_PRICE_<UPPER_SNAKE_SLUG>` (e.g. `STRIPE_PRICE_AI_WORKSPACE_STARTER_KIT`). `.env.example` lists the convention; Sean fills in the real values one by one as Stripe products are created.

---

## Env vars Sean needs to populate

All env vars are listed in `.env.example`. Required before any payment / subscribe / lead form will work:

| Variable | Where to get it |
|---|---|
| `PUBLIC_SITE_URL` | Set to `https://melis-ai-v2.vercel.app` (or final domain) in Vercel env |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys (test mode) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks → add endpoint `<preview-url>/api/webhooks/stripe` → reveal signing secret |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys (test mode) |
| `STRIPE_PRICE_*` | Create each product in Stripe Dashboard, copy the Price ID. One per product in `src/content/products/` + each live course. The full list of expected keys is in the MDX frontmatter of each product/course — search the repo for `stripePriceEnvKey:`. |
| `BEEHIIV_API_KEY` | BeeHiiv → Settings → Integrations → API |
| `BEEHIIV_PUBLICATION_ID` | BeeHiiv → Settings → Integrations → API |
| `RESEND_API_KEY` | https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | `sean@melis.ai` (verify the domain in Resend first) |
| `LEAD_FORM_RECIPIENT` | Defaults to `sean@melis.ai`; change in Vercel env if you want a different inbox |

Set these in **Vercel project settings → Environment Variables** before the first preview deploy hits the wired forms. Without them, the relevant endpoints return 503 with a friendly message — the UI does not crash.

---

## Manual steps for Sean after merge

1. **Domain:** decide which Vercel project gets `melis.ai`. Currently `melis-ai-coming-soon` holds it. Do NOT cut over before reviewing this preview thoroughly.
2. **Stripe webhook endpoint:** add `<your-prod-url>/api/webhooks/stripe` in Stripe dashboard, select `checkout.session.completed` event, paste signing secret into `STRIPE_WEBHOOK_SECRET`.
3. **Stripe products:** create one product per item in `src/content/products/` (36 of them + the hero bundle + 1 live course). Paste each Price ID into the matching `STRIPE_PRICE_*` env var.
4. **BeeHiiv publication:** confirm which publication to subscribe people to (or create a dev one). Set `BEEHIIV_PUBLICATION_ID` + `BEEHIIV_API_KEY`.
5. **Resend domain verification:** confirm `melis.ai` DNS records in Resend so `sean@melis.ai` can send transactional mail.
6. **Repo rename (optional):** see "Repo name" decision above.
7. **Run a smoke test:** with all env vars in place, buy a product in Stripe test mode, confirm the webhook fires and a Resend email arrives.

---

## Known parity gaps

| Section | What's different from mockup | Why |
|---|---|---|
| `/articles/` landing | Renders the mockup's hardcoded 6-item list, **not** the 13 MDX-extracted articles | The mockup's landing pane uses static HTML rows ("No. 01 The only prompt structure you actually need…") that don't map 1:1 to the 13 ARTICLES_DETAIL entries. Detail pages all work; landing list is currently the mockup's curated 6. **Fix later:** replace with a `getCollection('articles')` map. |
| `/newsletter/` landing | Same pattern — mockup HTML for the list, MDX-driven detail pages | Same as articles. |
| Sb2 active state | sb2 panel-items don't update their `.active` class on navigation | The mockup's per-section sb2 had inline JS that synced active state; we wire panel-group expand/collapse but not per-item active. **Fix later:** add a tiny script that matches `location.pathname` against `data-route` on sb2-items. |
| Dossier hero title shift | Not implemented | The mockup's runtime title-alignment via `--dossier-hero-shift` is referenced in CSS but the JS that measures it was tied to the SPA's `openLibraryDossier` handler. The Astro version uses a centred title block. **Fix later:** port the measurement script to run on `astro:page-load`. |
| Command palette (⌘K) | Stubbed — search button is non-interactive | The mockup's cmdk modal needs porting to a React component. Not in Tier 1. Sidebar's "Search ⌘K" button is visually present but doesn't open anything yet. |
| Hero email-input | The home page hero has an email input that just looks like a hero CTA | Not wired to BeeHiiv (yet). The dedicated newsletter page form **is** wired. |

---

## Tasks not completed

| Task | Reason / next step |
|---|---|
| `scripts/optimize-images.mjs` (PNG → WebP) | Spec mentioned this as a nice-to-have. Skipped to ship Tier 1 + 2 + 3. 150 MB of PNGs are served as-is; Vercel CDN caches them. Run sharp to convert to WebP at quality 82 in a follow-up. |
| Tests | Spec said nothing about tests. No tests written. Adding Vitest + a smoke test for `/api/subscribe` `/api/checkout` `/api/lead` `/api/webhooks/stripe` is a sensible follow-up. |
| Lighthouse audit | Not run. Spec wanted >90 on home. Sean to run locally on the preview URL. |
| Mobile pass at 380px | Layout uses the mockup's responsive rules but not exhaustively tested at small viewports. Spot-check on a phone after deploy. |

---

## Anything else

- Two Tailwind 4 + Vite plugins are installed but **no Tailwind utility classes are used yet**. The mockup CSS is the actual styling layer. Tailwind is wired for future utility additions.
- `pnpm exec astro check` reports 0 errors. Two `ts(6133)` hints flag unused imports in `scripts/json-to-mdx.mjs` and `scripts/extract-mockup-html.mjs` — script files, not shipped code.
- The `.env.example` file lists every env var with a `# TODO: ask Sean` comment so it's obvious what's still missing.
- `data/orders.jsonl` is gitignored — Stripe webhook writes appended orders here. On Vercel serverless, the filesystem write may fail silently (logs warning); migrate to Vercel KV or Postgres when traffic warrants it.
- The legacy Next.js repo at `mizukaizen/melis-ai` is **not** touched. The melis-ai-astro and melis-ai-website Vercel projects are **not** touched. The mockup file at `_cowork/outputs/website-rebrand/melis-ai-spa-v6-astro-content.html` is **not** touched (it stays as source-of-truth).
- All commits on `feat/initial-port` are co-authored by Claude (Opus 4.7, 1M context).

---

## Pass 4 lessons learned

1. **The "visible on every route" override from pass 2 was wrong.** Sean's instruction applied to non-home routes only. Home is sb1-only per the mockup. Fix: conditional render in `AppLayout.astro` (no `<Sidebar2>` on `/`) + `.app.is-home > sb2 { display:none }` + `.app.no-sb2 > main.content { margin-left: var(--sidebar-w) }`.

2. **Landing vs. detail hero tier.** Pass 3 made all heroes 560px+ which pushed body cards below the 900px fold. Pass 4 split into two tiers: landing 360px / detail 560px / dossier-detail 600px. Title clamps follow: landing `clamp(52, 6vw, 88)`, detail `clamp(72, 9vw, 132)`.

3. **mock copy precedence.** The mockup HTML is the gold standard. When pass 3 paraphrased ("An apprenticeship for the AI-native operator…"), the audit caught it. Pass 4 forces exact mockup strings. Lesson: when in doubt, `grep` the mockup HTML for the section's pane HTML and lift verbatim — don't invent.

4. **MDX frontmatter wins over resolver.** Setting `cover:` in the MDX short-circuits `hero-image.ts` overrides. If you want a special-case override, edit the frontmatter directly.

5. **Products sb2 must switch behaviour by route.** Landing = panel-group categories; detail = flat alphabetical list. Detected via `Astro.url.pathname` match.

6. **Pass-3 "cathedral" misread.** Sean's pass-3 audit described the Complete Arsenal mockup hero as a "candlelit altar scene with figures." I read that as the hive.jpg cathedral, but the actual mockup uses products-bundles.png (a figure standing inside an open gift box with a glowing violet flower) — also altar-like. Mockup canonical wins; restore bundles.png. Use the actual mockup file as the visual reference, not the prose description.

---

## Pass 5 — polish nits closed (2026-05-22)

Five small fixes on top of pass 4. Build green, `astro check` clean, screenshots recaptured.

1. **Articles list cards with paper-craft thumbnails.** `/articles/` was rendering text-only `item-row` rows. Replaced with the mockup's `.flat-card` grid (2-col, 16:10 aspect, bottom-veil meta — matching the runtime-rendered `renderFlatList()` in the mockup). Added `cover` + `category` + `publishedAt` to the three Sean-drafted articles (`how-i-run-9-agents…`, `on-the-two-way-door`, `the-operator-s-toolkit`) so all 13 entries have a thumbnail. Existing covers re-used for the trio: `articles-8` (tear-down), `articles-5` (field note), `articles-6` (essay).

2. **Shorter landing heroes site-wide.** `min-height` 360 → 320 on `.pane .section-header` + `.section-header-inner`; padding tightened 64/40 → 48/32. Section-body padding-top on landings dropped from `clamp(48,6vh,96)` → `clamp(12,2vh,28)` so the fold pulls more cards above 900px. Detail/in-room heroes (`.pane.in-room`) keep the cinematic 560/600. Newsletter/Recos/Services/Ventures inherit automatically — all still return 200 OK.

3. **Single Buy CTA on `/products/[slug]/`.** Moved the Stripe button inline next to the price/badge pill at the top of `product-detail`; dropped the redundant bottom `.product-cta` block. One buy entry-point per product, per mockup.

4. **AI Mastery 2026 CTA copy.** `ctas.primary.label` in the MDX frontmatter changed from "Enrol on Udemy" → "Enrol — be the first" (em-dash). Threads through both `FeaturedCourseCard` on `/courses/` and the Stripe button on the detail page.

5. **Dossiers landing fold.** Six+ category cards now sit above 900px (was 3). Combined effects: hero shorter (#2), `library-landing` body-lead shortened + tightened to 60ch, eyebrow/h2/body-lead margins reduced.

### Notes

- **Capture script PROJECT_ROOT made portable.** `scripts/capture-live.py` previously hardcoded the Cowork VM path `/sessions/friendly-nice-darwin/mnt/Documents/_cowork/…`. Now derives from `Path(__file__)`, so it runs the same way on macOS native and inside the VM.

- **"Enrol — be the first" vs. mockup data.** The mockup's `COURSES_DETAIL` actually has `"Enrol on Udemy"`. Sean's pass-5 brief specified "Enrol — be the first" verbatim, so I followed the explicit instruction over the literal mockup data. Flag this back to Sean if it's the wrong direction.

---

## Pass 6 — wider-viewport regressions closed (2026-05-22)

Three regressions Sean caught at 1920×1080 that were invisible to the 1440×900 capture script. All closed. Capture script now shoots both viewports so the next audit catches this class of bug.

1. **Home phantom 280px gap at ≥1920.** `mockup.css` line 3468 `.app:has(.pane.active.is-direct-view) > main.content { margin-left: calc(sidebar-w + sidebar-w2) !important }` was firing on `/` because `AppLayout` applied `is-direct-view` to the home pane. `:has()` lifts the rule's specificity above the plain `.app.is-home > main.content` override, so home ended up shifted right by sb2's width even though sb2 was hidden. Fix: don't apply `is-direct-view` to home (AppLayout.astro) + a defensive `.is-home.is-home` + `body[data-pane="home"] main.content` override in global.css that wins regardless of which classes land on the pane. Verified at 1920×1080 — computed `margin-left = 192px` (one sidebar), zero gap between sb1 right edge and hero image.

2. **Sb2 panel-item icons + count badges restored.** `Sidebar2Dossiers`, `Sidebar2Products`, and `Sidebar2Prompts` were rendering `.panel-item` with only `.pi-body` — both the leading `<i class="ph ph-X pi-icon">` and trailing `.pi-dot` were missing, so each row looked like flat text. Added per-category icon + colour maps mirroring the mockup's `LIBRARY_CAT_ICON` (line 8751-8765), `wireProductsRooms` `CAT_ICON` (line 7687-7696), and the per-Prompts-category palette. Each panel-item now renders the tri-column `<i> + <pi-body> + <pi-dot>` the mockup CSS expects.

3. **Sb1 hand-drawn inline SVGs instead of Phosphor.** The mockup uses bespoke inline SVGs (`<svg class="ico" viewBox="0 0 24 24" ...>`) for every sb-item — open-book Courses, two-curves Articles, envelope-with-line Newsletter, two-books Dossiers, dots-grid Products, curve-with-dot Prompts, clock-face Sean's Recos, hexagon Ventures, picture-frame Exhibits, globe Services, person Sean, concentric circles melis.ai. Phosphor was wrong — the hand-drawn voice is brand-tied. Lifted each SVG verbatim from `melis-ai-spa-v6-astro-content.html` (lines 4954-4999). Socials too — X / YouTube / LinkedIn as inline SVGs.

### Capture-script change

- `scripts/capture-live.py` now iterates a `VIEWPORTS` list (1440×900 + 1920×1080) and writes `live-<slug>.png` + `live-<slug>-1920.png` per page. Stops viewport-dependent bugs from slipping past audits.

### What I noticed while in there

- **Articles, Newsletter, Recos, Services, Ventures, Courses, Exhibits sb2 use `.sb2-item` (not `.panel-item`).** These don't need icons per the mockup — they're a different list pattern (`.sb2-row` + `.sb2-desc`). Left untouched.
- **Sb2 sidebar width is fine at all tested widths** — no regressions on the other 7 pages.
- **Prompt categories collapse to one (`Sean's Edge`).** The MDX content only has the Sean's Edge category; the other four (Business / Think & Communicate / Life & Career / Build) are placeholders in the mockup. CAT_ICON map covers all five so future imports just work.

---

## Pass 7 — white-glove polish (2026-05-22)

Final pre-merge sweep — closed all 5 CRITICAL issues + 5 of the 6 IMPORTANT ones from Sean's pass-7 audit. Skipped Issue 8 (panel-group IA on Prompts/Recos/Ventures sb2) because the current content only has one category per section; adding empty group placeholders would harm UX.

### CRITICAL — all closed

1. **Product detail full body (Issue 1).** `/products/[slug]/` was rendering ~370 chars of body. New `src/components/ProductDetail.astro` renders the full mockup v2 layout: chip row (Category / Instant delivery / 30-day guarantee), "About this kit" with 3 mini-blocks + Sean pull-quote, sticky Buy aside (5★ rating, price + $44 strikethrough + Save 33%, Stripe CTA, trust list, "What's included" from PRODUCT_INCLUDES), "Take a look" 4-up gallery, "Why it works" 4-tile grid, and "More kits from the operator desk" siblings grid (4 from same category). New `src/data/products.ts` lifts PRODUCT_INCLUDES (35 entries), PRODUCT_ABOUT_BLOCKS (bespoke for ai-workspace-starter-kit; fallback otherwise), PD_THUMBS, and PD_WHY_TILES from the mockup. Complete Arsenal keeps its bundle-breakdown table above the v2 layout — its unique selling point.

2. **Sb2 click-active sync (Issue 2).** AppLayout now runs `syncSb2Active()` on DOMContentLoaded + astro:after-swap. Toggles `.active` on each `a.panel-item` / `a.sb2-item` whose href matches `location.pathname` (trailing-slash normalised). When a match lands inside a `.panel-group`, the script also auto-expands the group so the active row is visible. Landing-page fallback: light up the first sb2 row.

3. **Prompts detail HTML + room-prompt footer (Issue 3).** Detail template was HTML-escaping the prompt body, so `<span class="pv-var">[TOKEN]</span>` rendered as literal text. Switched to `set:html`; copy button strips the spans first so the user pastes clean `[TOKEN]` text. Added the room-prompt-meta header + Copy/Expand footer from the mockup's room-prompt-card pattern (lines 248-289). Expand toggles the mask + max-height.

4. **About Sean + melis.ai chapter TOC + scroll-spy (Issues 4 + 11).** Sidebar2About now renders a chapter list under the sub-page links when on `/about/sean` (12 entries: Opening + ch01–09 + Career Timeline + What Drives Me) or `/about/melis-ai` (4 entries). Anchor IDs match existing div ids in `src/_html/pane-about*.html`. Inline script wires smooth-scroll on click + IntersectionObserver scroll-spy (rootMargin `-15% 0px -55% 0px`). Hero images swapped to the purpose-built `/hero-about.png` + `/about-bg.png` from generic card-services / card-projects.

5. **Services + Ventures detail bodies (Issue 5).** `src/data/services.ts` (SERVICES_DETAIL from mockup line 11889) + `src/data/ventures.ts` (VENTURES_DETAIL from line 11947) keyed by slug. Services [slug] renders the 4-step "How it works" numbered grid above the LeadForm. Ventures [slug] renders the 3 What-Why-Where sections + status pill + closing CTA.

### IMPORTANT — 5 of 6 closed

6. **Course detail body (Issue 6).** `src/data/courses.ts` (COURSES_DETAIL from line 12008) keyed by slug. AI Mastery 2026 detail page now renders: subtitle h2 ("Future-Proof Your Career, Income & Decisions"), Problem block + 6-bullet pain list, Outcomes 6-card grid, Right-Fit two-column for-you/not-for-you, Ready-To-Start closing block. Coming-soon courses (Claude Cowork etc.) render the mockup's `soonLine` as a single notification card above the waitlist form — Claude Cowork keeps its "RECORDING · FLAGSHIP" badge variant.

7. **Card paper-craft images on landings (Issue 7).** Recos / Services / Ventures / Exhibits landings switched from flat dark cards to the room-card pattern (paper-craft bg + veil + arrow + meta block). Per-section slug → cover maps point at the existing `/section-rooms/<section>-<slug>.png` assets. Exhibits resolves base = `slug.replace(/^the-/, '')` to match files in `public/section-rooms/exhibits/`.

8. **Sb2 IA panel-groups (Issue 8).** SKIPPED — Prompts has 5 entries all in "Sean's Edge"; Ventures has 3 items; Recos has 3 series. Adding empty placeholder categories would create dead UX. Category map already in place; will activate once content grows.

9. **Newsletter landing hero + 3-up grid (Issue 9).** Hero title `Newsletter` → `Soul of the <em>Machine</em>` with the three-threads subhead. Body switches from item-list (text rows) to flat-list-grid (2-col paper-craft cards) using news-1.png..news-6.png cycled by index. Filter dropdown rewired against `.flat-card`.

10. **Prompts landing hero + Sean's Edge featured card (Issue 10).** Hero title `Prompts` → `The Prompt <em>Library</em>` with library-specific eyebrow + lede. New featured card above the category grid picks up the first Sean's Edge prompt as flagship. Category sections gain a header icon + count badge using the same `CAT_ICON` palette as Sidebar2Prompts.

11. (closed under Issue 4.)

### Verification

- `pnpm build` → 0 errors, 164 prerendered routes
- `pnpm exec astro check` → 0 errors, 0 warnings, 3 hints (unused imports in `scripts/` + one unused param in newsletter cover helper)
- Capture script now covers 29 pages × 2 viewports = 58 captures. All 200 OK.
- 1440×900 + 1920×1080 captures walked: home/articles/products/courses/dossiers/services/ventures/about/lab parity all hold.

---

## Pass 8 — interaction polish + missing animation (2026-05-22)

Three small but visible nits Sean's eye caught on final pre-merge review:

1. **Missing CSS tokens caused the home stat dividers to vanish.** The v6 mockup CSS uses `var(--border)` (and `var(--border-light)` and `var(--text)`) without the numeric suffix throughout — most notably the `.pane[data-pane="home"] .stat { border-right: 1px solid var(--border); }` rule that draws the vertical lines between the 5 home stats. `tokens.css` defined `--border-1/2/3` and `--text-1/2/3` but no fallback aliases, so every `var(--border)` reference resolved to the property's initial value and rendered with no colour. Added three aliases under `:root` (`--border → --border-2`, `--border-light → --border-1`, `--text → --text-1`) so the mockup rules paint correctly. No other CSS changes needed — the dividers, ticker border-bottom, and panel-group separators all light up once the tokens resolve.

2. **Cursor pointer on interactive chrome.** Sb1 nav items, sb2 panel-items and sb2-items, panel-group headers, the wordmark, the sb-search-btn, every card variant (`room-card` / `flat-card` / `pd-sibling-card` / `pd-look-card` / `exhibit-card`), the featured cards (`featured-product-card` / `featured-course-card` / `featured-prompt-card`), the `about-toc-item` rows, and the home `.card` portal tiles all behave as buttons/links. Default text/arrow cursor over `<a>`/`<div onclick>` made them feel non-interactive. Added `cursor: pointer` for each, plus `cursor: inherit` on nested `.count` / `.pi-dot` / `.sb2-count` / `.flat-card-tag` badges so each row reads as a single hit area.

3. **AI ticker marquee.** The mockup CSS for `.ticker-brands` was static (`white-space: nowrap; overflow: hidden` on the parent, no animation). Pass-8 brief called for the scroll-loop, so added `melis-ticker-scroll` @keyframes translating `.ticker-track` from `0` to `-50%` over 60s linear infinite. Duplicated the brand list inside the track (second copy `aria-hidden="true"`) so the loop is seamless at the `-50%` snap-back point. Feathered the ticker container with a horizontal mask-image gradient so brands fade in/out at the edges instead of clipping hard. Honours `prefers-reduced-motion: reduce` — animation halts for users who've opted out.

### What I noticed while in there

- **The token aliases also fix invisible borders elsewhere.** The mockup CSS references `var(--border)` in dozens of places (panel-group separators, group-eyebrow underline, sb2-header bottom-rule, etc.). All of those silently rendered colourless before this pass. Now they paint at `--border-2 = rgba(255,255,255,0.06)`. Worth re-walking the comparison HTML — some "missing border" parity gaps from earlier passes may now self-heal.
- **No other ticker / marquee patterns in the mockup** — the only `@keyframes` were `filterMenuIn`, `paneFadeIn`, `sb2SlideIn`, `cta-shimmer`, `checkoutSpin`, `cec-pulse`, `cmdk-in`. Of those, `paneFadeIn` and `sb2SlideIn` belong to the SPA's pane-swap behaviour (Astro view-transitions replace that). The others are tied to features not yet ported (cart, cmdk, cta-shimmer button variant). Left untouched — porting them now would create dead chrome.
