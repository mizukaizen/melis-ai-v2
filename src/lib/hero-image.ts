// Resolve which paper-craft image to use for a given section / item.
// Uses the v6 mockup's ROOM_IMAGE_OVERRIDES map + per-section file
// conventions. Falls back to a sensible default if no specific image
// exists.
//
// Conventions in public/section-rooms/:
//   <section>-landing.png    — landing page (where it exists)
//   <section>-<slug>.png     — per-item, by basename (where it exists)
// And public/library-rooms/:
//   lib-<category>.png       — dossier category hero
//   lib-landing.png          — dossiers landing

import { ROOM_IMAGE_OVERRIDES } from '../data/room-images';

type SectionMap = Record<string, string>;
const overrides = ROOM_IMAGE_OVERRIDES as Record<string, SectionMap>;

const LANDING_FALLBACKS: Record<string, string> = {
  home: '/hero-v1.png',
  courses: '/section-rooms/courses-landing.png',
  articles: '/section-rooms/articles-landing.png',
  newsletter: '/section-rooms/news-landing.png',
  products: '/section-rooms/products-landing.png',
  prompts: '/section-rooms/prompts-ai-tools.png', // no prompts-landing.png in assets
  recos: '/card-services-v1.png',
  services: '/card-services-v1.png',
  ventures: '/card-projects-v1.png',
  exhibits: '/section-rooms/products-landing.png',
  about: '/hero-about.png',
  'about-studio': '/about-bg.png',
  library: '/library-rooms/lib-landing.png',
  dossiers: '/library-rooms/lib-landing.png',
};

/** Return the landing-hero image path for a section. */
export function landingHero(section: string): string {
  return LANDING_FALLBACKS[section] || '/card-products-v1.png';
}

/** Return the per-item hero image path. Section is e.g. 'products', 'courses'.
 *  title is the exact title as it appears in the mockup's map keys.
 *  slug is the kebab-case slug used in the URL. */
export function itemHero(section: string, title: string, slug: string): string {
  // 1) Mockup override map (title → image basename)
  const sectionOverrides = overrides[section];
  if (sectionOverrides && sectionOverrides[title]) {
    const basename = sectionOverrides[title];
    return `/section-rooms/${section}-${basename}.png`;
  }
  // 2) Per-section slug-based conventions
  if (section === 'products') {
    return `/section-rooms/products/${slug}.png`;
  }
  if (section === 'exhibits') {
    // exhibits use .png or .jpg under section-rooms/exhibits/
    return `/section-rooms/exhibits/${slug}.png`;
  }
  // 3) Fallback to landing
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
