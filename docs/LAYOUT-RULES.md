# Layout rules — melis.ai v2

The single source of truth for hero + body + cards across every route. These rules are baked into `src/styles/tokens.css` + the **CANONICAL LAYOUT** block in `src/styles/global.css`. If you find yourself adding a per-page rule that targets `.section-hero`, `.section-body`, `.section-title`, `.card-grid` or similar — **don't**. Either the canon is wrong (fix it in one place) or your page is doing something the canon needs to support (extend the tokens).

## Tokens (tokens.css)

| Token | Value | Used for |
|---|---|---|
| `--content-max-prose` | `min(720px, calc(100% - 48px))` | PROSE tier — long-form reading column (~65ch). Used by `/articles/[slug]`, `/newsletter/[slug]`, `/dossiers/[cat]/[slug]`. |
| `--content-max-wide` | `min(1280px, calc(100% - 120px))` | WIDE tier — showcase column. Used by home, all landings, and all non-prose detail pages (courses, products, prompts, recos, ventures, services, about, lab). |
| `--content-max` | `var(--content-max-wide)` | Default alias for the wide tier (most pages). |
| `--content-padding-x` | `clamp(24px, 3vw, 56px)` | Shared horizontal padding for hero-content + section-body. |
| `--hero-min-h-landing` | `clamp(320px, 38vh, 440px)` | Landing-page hero shell height. |
| `--hero-min-h-detail` | `clamp(440px, 60vh, 640px)` | Detail-page (in-room) hero shell — taller, cinematic. |
| `--hero-fade` | `linear-gradient(to bottom, #000 0%, #000 25%, transparent 95%)` | mask-image gradient that dissolves the bottom 70% of the cover image into `var(--bg)`. |
| `--section-title-size` | `clamp(44px, 4.4vw, 64px)` | h1 size everywhere. 64px max at 1440. |
| `--section-eyebrow-size` | `11px` | Hero eyebrow (uppercase mono). |
| `--section-lead-size` | `17px` | Body lead paragraph. |
| `--card-title-size` | `clamp(20px, 1.6vw, 28px)` | All cards — room, flat, coming-soon. Featured cards have their own scale. |
| `--card-eyebrow-size` | `10px` | Card eyebrow (uppercase mono). |
| `--card-line-size` | `13px` | Card descriptor line. |
| `--card-padding` | `22px` | Card padding (where text sits on top of image, use this). |

## Two content-width tiers — pick one per page, don't mix

Reading prose wants a narrow column (~65ch / ~720px) — Medium, Substack, NYT, the Atlantic, Wired. Showcase layouts (cards, grids, hero galleries) want a wide column (~1280px). Don't try to do both on the same page — the eye reads a jagged left edge as broken, even when each individual block is internally consistent.

| Tier | Width | Pages |
|---|---|---|
| **PROSE** | ~720px | `/articles/[slug]`, `/newsletter/[slug]`, `/dossiers/[category]/[slug]` |
| **WIDE** | ~1280px | Home, all landings (`/courses`, `/articles`, `/products`, etc.), all non-prose detail pages (`/courses/[slug]`, `/products/[slug]`, `/prompts/[slug]`, `/recos/[slug]`, `/ventures/[slug]`, `/services/[slug]`, `/lab/[slug]`, `/about`) |

**The tier governs the entire page** — hero `section-header-inner` AND `section-body` AND every grid/article/lead inside the body. The prose tier is enforced globally via `.pane.in-room[data-pane="articles|newsletter|library"] { ... max-width: var(--content-max-prose) }` in `global.css`. Every other page inherits the wide default.

**Never mix tiers within one page.** If you put a 720px body block inside a 1280px hero, the left edges won't align and the page reads as jaggedy. Pick the tier and stick to it.

## Hero invariants

1. **`SectionHero` renders only**: `eyebrow` + `h1` + optional 1-line `byline`. It silently ignores any `lede` prop. Long descriptions go in `<section class="section-body">`.
2. **Cover image fades** to `var(--bg)` via `mask-image: var(--hero-fade)`. Do not add `::after` overlay — it creates a double-fade.
3. **All text left-aligned.** No `text-align: center`, no `margin: 0 auto` on hero contents anywhere.
4. **h1 = `var(--section-title-size)`** — 64px max at 1440. Italic on `<em>` (sized by token), colour `var(--accent)` only on `<em>`.

## Body invariants

1. **`section-body` shares `--content-max` + `--content-padding-x`** with `section-header-inner`. Their left edges are pixel-identical at every viewport.
2. **Hero eyebrow left = body h2 left = card grid left.** All measured at 1440: 575.2px. Detail pages with intentional wider/narrower layouts (e.g. `pane[data-pane="courses"].in-room { max-width: 1180px }`) maintain internal alignment.
3. **No `landing-intro` centering.** That wrapper exists for spacing but `margin: 0 0 2em; max-width: none` so it inherits body alignment. Never `margin: 0 auto` on it.
4. **All body text left-aligned.** No centering anywhere on landings or details (except where prose intentionally narrows — `article-content` at max-width: 720 is a content-width choice, not a layout violation).

## Card invariants

1. **Eyebrow top-left** of `.room-card-meta` (inside cover image bottom area).
2. **Badge / pill top-right** of card (e.g. `.room-card-group-pill`, `.room-card-badge`).
3. **Title bottom-left**, sized via `--card-title-size`.
4. **Descriptor `.room-card-line` directly under title**.
5. **Arrow top-right or top-corner**, small (~24px), low-opacity at rest.
6. **Featured cards** (FCC / FPC) have their own larger scale via component-local `<style>` — that's intentional and pinned. Regular cards never grow to featured size.

## Prohibited patterns

| Pattern | Why it breaks |
|---|---|
| `lede="..."` on `<SectionHero>` (passing long description) | Renders nothing (prop ignored). Use `<p class="body-lead">` in section-body instead. |
| `text-align: center` on hero or body | Breaks the left-edge alignment invariant. |
| `margin: 0 auto` on `.section-body`, `.landing-intro`, `.featured-card`, `.h2`, `.article-content`, `.course-content`, `.product-mdx-body`, `.dossier-content` etc. | Inside the wide-tier `section-body` the wrapper gets auto-centred and falls 20px right of the hero left edge. Use `margin: 0` (or `margin: 0 0 N` for vertical spacing only). |
| Mixing prose-tier blocks (720px) inside wide-tier pages (1280px) | Eye reads the mismatched left edges as jagged. Pick one tier per page. |
| Per-pane `max-width` override on `.section-header-inner` or `.section-body` (without matching the OTHER) | Breaks eyebrow=h2 alignment. If you must change width, change BOTH. |
| `.section-header::after` (overlay rectangle) | Creates a double-fade with the mask. Mask is canonical; ::after is disabled. |
| Per-page `.section-title { font-size: ... }` | Use the token. If you need a different size, add a new tier token. |
| Reaching into card internals (`.room-card-title { font-size: 30px }`) | Use the token. |

## How to add a new page

```astro
---
import AppLayout from '../layouts/AppLayout.astro';
import SectionHero from '../components/SectionHero.astro';
---

<AppLayout title="Page" pane="..." description="...">
  <SectionHero
    cover="/path/to/cover.png"
    eyebrow="Resources · the catalogue"
    title="Page Title"
    titleHtml='Page <em>Title</em>'
  />

  <section class="section-body">
    <h2 class="h2">The intro h2 — left-aligned with the eyebrow above.</h2>
    <p class="body-lead">Long-form description goes here, not on the cover.</p>

    <div class="room-grid">
      {/* card grid */}
    </div>
  </section>

  <div class="footer">
    <div>melis.ai · 2026</div>
    <div>Operator-built · Australia</div>
  </div>
</AppLayout>
```

No per-page CSS. The canon handles alignment, hero fade, sizing, spacing.

## Verifying alignment

Run this Playwright snippet against any new or modified page at 1440×760. It should print a single x-coordinate for hero eyebrow, body h2, body-lead, and first grid child:

```python
page.evaluate('''() => ({
  eyebrow: document.querySelector(".pane .section-eyebrow")?.getBoundingClientRect().left,
  h1:      document.querySelector(".pane h1.section-title")?.getBoundingClientRect().left,
  bodyH2:  document.querySelector(".pane .section-body .h2")?.getBoundingClientRect().left,
  lead:    document.querySelector(".pane .section-body .body-lead")?.getBoundingClientRect().left,
  grid:    document.querySelector(".pane .section-body .room-grid > a, .pane .section-body .flat-list-grid > a")?.getBoundingClientRect().left,
})''')
```

All values should be equal (within ±2px). If they're not, find the per-page override that's fighting the canon and delete it.

## When the canon is wrong

If a real design need requires the canon to change:

1. Update the token in `tokens.css`, not the page.
2. Update this doc.
3. Re-run the verification snippet on at least 5 landings + 2 details.

Don't add a one-off override "just for this page".
