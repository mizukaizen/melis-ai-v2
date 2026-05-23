// Verbatim lift of product-detail data from the v6 mockup
// (lines 7536-8127). Keyed by slug for the [slug] template.

export interface ProductAboutBlock {
  icon: string; // Phosphor icon class e.g. "ph-target"
  head: string;
  body: string;
}

export interface ProductAboutModel {
  intro: string;
  blocks: ProductAboutBlock[];
}

export interface ProductWhyTile {
  icon: string;
  title: string;
  line: string;
}

// Includes per product slug — populates the "What's included" list in
// the Buy aside. Sourced from PRODUCT_INCLUDES at mockup line 7593.
export const PRODUCT_INCLUDES: Record<string, string[]> = {
  // Starter Kits
  'ai-workspace-starter-kit':  ['Custom system prompt template', '5 SKILL.md workflow files', '10-step activation guide', 'Prompt quick-reference card'],
  'business-os-starter-kit':   ['Business context prompt template', 'Department & SOP framework', 'Decision-making prompt stack', 'Setup guide'],
  'content-creator-kit':       ['Brand voice system prompt', 'Video script templates', 'Content calendar prompts', 'SEO optimisation skill'],
  'second-brain-starter-kit':  ['PARA structure prompt setup', 'Daily capture workflow', 'Weekly review prompts', 'Claude retrieval skill'],
  'sales-pro-kit':             ['Cold outreach prompt sequences', 'Objection handling framework', 'Discovery call prep prompts', 'Follow-up templates'],
  'freelancer-business-kit':   ['Proposal generator prompts', 'Project scoping framework', 'Client communication skill', 'Rate negotiation scripts'],
  'consultant-toolkit':        ['Strategy framework prompts', 'Deck structuring skill', 'Client discovery templates', 'Hypothesis-driven workflow'],
  'executive-briefing-kit':    ['Daily briefing prompt workflow', 'Priority-setting template', 'Notion log template', 'Calendar context skill'],
  'job-search-accelerator':    ['Resume tailoring prompts', 'Cover letter generator', 'Interview prep Q&A loop', 'Salary negotiation scripts'],
  'student-ai-toolkit':        ['Essay planning prompts', 'Research assistance workflow', 'Flashcard generator skill', 'Exam prep Q&A loop'],
  // Claude Skills
  'deep-research-skill':       ['SKILL.md file', 'Trigger phrase guide', 'Output format templates', 'Citation formatting rules'],
  'meeting-prep-skill':        ['SKILL.md file', 'Agenda generation prompt', 'Question suggestion system', 'Follow-up template'],
  'content-repurposing-skill': ['SKILL.md file', 'Platform prompt set', 'Brand voice anchoring guide', 'Output review checklist'],
  'proposal-generator-skill':  ['SKILL.md file', 'Proposal structure template', 'Notion editable template', 'Client input form'],
  'sales-email-writer-skill':  ['SKILL.md file', '5-email sequence template', 'Subject line variants', 'Persona targeting guide'],
  'social-media-manager-skill':['SKILL.md file', 'Platform content prompts', 'Weekly planning template', 'Tone calibration guide'],
  // AI Personas
  'marcus-business-strategist':['SOUL.md identity file', 'IDENTITY.md config', '20-prompt starter library', 'Setup walkthrough'],
  'elijah-financial-advisor':  ['SOUL.md identity file', 'IDENTITY.md config', 'Financial prompt library', 'Monthly review workflow'],
  'priya-creative-director':   ['SOUL.md identity file', 'IDENTITY.md config', 'Creative brief templates', 'Brand messaging prompts'],
  'lila-wellness-coach':       ['SOUL.md identity file', 'IDENTITY.md config', 'Habit tracking prompts', 'Wellness review workflow'],
  'ethan-career-coach':        ['SOUL.md identity file', 'IDENTITY.md config', 'Interview prep prompts', 'Salary negotiation scripts'],
  // Spreadsheets
  'business-finance-dashboard':['Google Sheets template', 'Excel (.xlsx) version', 'Pre-built formulas', 'Claude analysis prompt'],
  'marketing-analytics-tracker':['Google Sheets template', 'Excel (.xlsx) version', 'Auto-calculated KPIs', 'Claude summary prompt'],
  'project-management-sheet':  ['Google Sheets template', 'Excel (.xlsx) version', 'Status tracking formulas', 'Team view layout'],
  'life-goals-tracker':        ['Google Sheets template', 'Excel (.xlsx) version', 'OKR framework', 'Claude reflection prompt'],
  // Notion Covers
  'minimal-dark-series':       ['50 PNG covers', '1500×600px dimensions', 'Instant download ZIP', 'Commercial personal licence'],
  'bauhaus-ai-series':         ['50 PNG covers', '1500×600px dimensions', 'Instant download ZIP', 'Commercial personal licence'],
  'abstract-gradient-series':  ['50 PNG covers', 'Multiple palettes', '1500×600px dimensions', 'Instant download ZIP'],
  'ai-workspace-photography':  ['50 PNG covers', 'Studio photography style', '1500×600px dimensions', 'Instant download ZIP'],
  // Wall Art
  'ai-aesthetic-prints':       ['5 PNG files (high-res)', '5 print-ready PDFs', 'A3 and A2 sizes', 'Dark aesthetic'],
  'minimal-workspace-prints':  ['5 PNG files (high-res)', 'Dark + light versions', 'A3 and A2 sizes', 'Home office focused'],
  'terminal-code-art':         ['5 PNG files (high-res)', '5 print-ready PDFs', 'A3 and A2 sizes', 'Dark terminal aesthetic'],
  // Wallpapers
  'dark-minimal-pack':         ['20 wallpapers (ZIP)', 'iPhone all sizes', 'Desktop 1440p + 4K', 'Geometric + abstract styles'],
  'gradient-system-pack':      ['20 wallpapers (ZIP)', 'Matching lock + home pairs', 'iPhone all sizes', 'Desktop 1440p + 4K'],
  'ai-studio-pack':            ['20 wallpapers (ZIP)', 'iPhone all sizes', 'Desktop 1440p + 4K', 'AI + tech aesthetic'],
};

// Bespoke "About this kit" copy. Only ai-workspace-starter-kit has bespoke
// copy in the mockup — everything else uses the generic fallback hydrated
// from the product's hook + category.
export const PRODUCT_ABOUT_BLOCKS: Record<string, ProductAboutModel> = {
  'ai-workspace-starter-kit': {
    intro: 'The done-for-you version of what most people spend weeks building. Drop it in Claude Projects, spend 20 minutes personalising, ship.',
    blocks: [
      { icon: 'ph-target',    head: 'Built for how Claude actually works', body: "SKILL.md files in the format Claude uses natively. System prompt calibrated for real work, not a generic template wearing an AI costume." },
      { icon: 'ph-lightning', head: 'Ready in 20 minutes, not 20 hours',   body: "Skip the rabbit holes. The activation guide walks you through the first hour so you're operating from day one." },
      { icon: 'ph-hammer',    head: "Everything you need, nothing you don't", body: "Five workflow skills, one system prompt, one quick-reference card. No bloat, no half-finished YouTube tutorial energy." },
    ],
  },
};

// Generic fallback — hydrated per-product from hook + category at render time.
export function fallbackAboutModel(hook: string, category: string): ProductAboutModel {
  return {
    intro: hook,
    blocks: [
      { icon: 'ph-target',    head: 'Purpose-built, not retrofitted',   body: `Designed specifically for the ${category.toLowerCase()} workflow — every piece earns its place, nothing here is filler.` },
      { icon: 'ph-lightning', head: 'Working in minutes, not days',     body: "Drop it in, follow the activation guide, and you're operating the same afternoon. No multi-week setup tax." },
      { icon: 'ph-hammer',    head: 'Battle-tested before it shipped',  body: 'Built because Sean needed it first, then refined enough times to package. Real daily use, not theoretical.' },
    ],
  };
}

// "Take a look" gallery — fixed set of section-rooms paper-craft images.
export const PD_THUMBS: string[] = [
  '/section-rooms/products-templates.png',
  '/section-rooms/products-skills.png',
  '/section-rooms/products-frameworks.png',
  '/section-rooms/products-tools.png',
];

// "Why it works" 4-tile grid.
export const PD_WHY_TILES: ProductWhyTile[] = [
  { icon: 'ph-brain',            title: 'Built for AI work', line: 'Designed around how Claude actually works — not a generic template.' },
  { icon: 'ph-lightning',        title: 'Ready in minutes',  line: 'Structured so you can start using it immediately, not configure forever.' },
  { icon: 'ph-tree-structure',   title: 'Grows with you',    line: 'Modular pieces you can extend as your AI workflows evolve.' },
  { icon: 'ph-chat-circle-text', title: 'Prompts built in',  line: 'Every workflow includes the exact prompts to run it. No guessing.' },
];
