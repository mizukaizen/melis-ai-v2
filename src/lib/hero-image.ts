// Resolve which paper-craft image to use for a given section / item.
// Uses the v6 mockup's ROOM_IMAGE_OVERRIDES map + per-section file
// conventions. The mockup itself uses card-<section>-v1.png at the
// public root for section landings (verified by grepping the mockup
// HTML for section-hero-bg) — we honour that.

import { ROOM_IMAGE_OVERRIDES } from '../data/room-images';

type SectionMap = Record<string, string>;
const overrides = ROOM_IMAGE_OVERRIDES as Record<string, SectionMap>;

/** Section → landing-hero image. Verified against the mockup. */
const LANDING_FALLBACKS: Record<string, string> = {
  home: '/hero-v1.png',
  courses: '/card-courses-v1.png',       // warm cozy reader scene
  articles: '/card-articles-v1.png',     // warm reading library
  newsletter: '/card-articles-v1.png',   // mockup uses card-articles for newsletter too
  products: '/card-products-v1.png',     // warm wood-workshop with tools
  prompts: '/card-products-v1.png',      // mockup uses card-products fallback
  recos: '/card-services-v1.png',
  services: '/card-services-v1.png',
  ventures: '/card-projects-v1.png',
  projects: '/card-projects-v1.png',
  exhibits: '/card-projects-v1.png',
  about: '/hero-about.png',
  'about-studio': '/about-bg.png',
  library: '/library-rooms/lib-landing.png',
  dossiers: '/library-rooms/lib-landing.png',
};

/** Return the landing-hero image path for a section. */
export function landingHero(section: string): string {
  return LANDING_FALLBACKS[section] || '/card-products-v1.png';
}

/** Per-item special-case heroes that don't fit the convention. */
const ITEM_SPECIAL: Record<string, Record<string, string>> = {
  products: {
    // The Complete Arsenal — the candlelit-altar scene from the mockup's
    // updated comparison capture. The earlier products-bundles.png was
    // the gift-box scene; user explicitly flagged it as wrong.
    'complete-arsenal': '/section-rooms/exhibits/hive.jpg',
  },
};

/** Return the per-item hero image path. */
export function itemHero(section: string, title: string, slug: string): string {
  // 1) Hard-coded special cases (Complete Arsenal etc.)
  const special = ITEM_SPECIAL[section]?.[slug];
  if (special) return special;

  // File prefix per section — assets in public/section-rooms/ are named
  // by section _scope_ rather than by `data-pane` (the ventures pane is
  // `data-pane="projects"` for legacy reasons, but the files are
  // `ventures-<slug>.png`, etc.).
  const FILE_PREFIX: Record<string, string> = {
    projects: 'ventures',
    ventures: 'ventures',
    services: 'services',
    recos:    'recos',
  };
  const prefix = FILE_PREFIX[section] || section;

  // 2) Mockup override map (title → image basename)
  const sectionOverrides = overrides[section];
  if (sectionOverrides && sectionOverrides[title]) {
    const basename = sectionOverrides[title];
    return `/section-rooms/${prefix}-${basename}.png`;
  }
  // 3) Per-section slug-based conventions
  if (section === 'products') {
    return `/section-rooms/products/${slug}.png`;
  }
  if (section === 'exhibits') {
    return `/section-rooms/exhibits/${slug}.png`;
  }
  if (section === 'courses') {
    return `/section-rooms/courses-${slug}.png`;
  }
  if (section === 'projects' || section === 'ventures') {
    return `/section-rooms/ventures-${slug}.png`;
  }
  // 4) Fallback to landing
  return landingHero(section);
}

/** Return the hero image for a dossier category page. */
export function dossierCategoryHero(category: string): string {
  return `/library-rooms/lib-${category}.png`;
}

/** Return the hero image for a single dossier — same as the category
 *  cover, since the mockup uses category-level paper-craft for every
 *  dossier in that category. */
export function dossierHero(category: string): string {
  return `/library-rooms/lib-${category}.png`;
}
