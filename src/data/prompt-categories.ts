// Single source of truth for the 22 prompt-library categories shown on
// /prompts/ landing as paper-craft room-cards. Mirrors the v1 panels.js
// roster + the sb2 sidebar groupings (Business / Think & Communicate /
// Life & Career / Build / The Edge).
//
// `image` is the path under /public/ (omit leading slash). All 22 cover
// images are committed under public/section-rooms/.
// `count` is the number of prompts in that category (totals to 335).

export type PromptCategoryGroup =
  | 'The Edge'
  | 'Business'
  | 'Think & Communicate'
  | 'Life & Career'
  | 'Build';

export interface PromptCategoryMeta {
  title: string;
  line: string;
  count: number;
  image: string;
  group: PromptCategoryGroup;
}

export const PROMPT_CATEGORIES: Record<string, PromptCategoryMeta> = {
  'seans-edge':    { title: "Sean's Edge",  line: 'AI-first thinking · cognitive amplification', count: 20, image: 'section-rooms/prompts-edge.png',         group: 'The Edge' },

  'sales':         { title: 'Sales',        line: 'Close deals without the cringe',               count: 15, image: 'section-rooms/prompts-sales.png',        group: 'Business' },
  'marketing':     { title: 'Marketing',    line: 'Right audience, right message',                count: 15, image: 'section-rooms/prompts-marketing.png',    group: 'Business' },
  'finance':       { title: 'Finance',      line: 'Know your numbers, own your money',            count: 15, image: 'section-rooms/prompts-finance.png',      group: 'Business' },
  'operations':    { title: 'Operations',   line: 'Systems that run without you',                 count: 15, image: 'section-rooms/prompts-operations.png',   group: 'Business' },
  'hiring':        { title: 'Hiring',       line: 'Find people who actually deliver',             count: 15, image: 'section-rooms/prompts-hiring.png',       group: 'Business' },
  'customer':      { title: 'Customer',     line: 'Understand & delight customers',               count: 15, image: 'section-rooms/prompts-customer.png',     group: 'Business' },
  'legal':         { title: 'Legal',        line: 'Contracts & compliance simplified',            count: 15, image: 'section-rooms/prompts-legal.png',        group: 'Business' },

  'strategy':      { title: 'Strategy',     line: 'Think clearer, decide faster',                 count: 15, image: 'section-rooms/prompts-strategy.png',     group: 'Think & Communicate' },
  'frameworks':    { title: 'Frameworks',   line: 'Right model for the right problem',            count: 15, image: 'section-rooms/prompts-frameworks.png',   group: 'Think & Communicate' },
  'writing':       { title: 'Writing',      line: 'Write faster, clearer, better',                count: 15, image: 'section-rooms/prompts-writing.png',      group: 'Think & Communicate' },
  'research':      { title: 'Research',     line: 'Deep research in minutes',                     count: 15, image: 'section-rooms/prompts-research.png',     group: 'Think & Communicate' },
  'communication': { title: 'Communication',line: 'Say what you mean, get results',               count: 15, image: 'section-rooms/prompts-communication.png',group: 'Think & Communicate' },

  'life-design':   { title: 'Life Design',  line: 'Design the life you want',                     count: 15, image: 'section-rooms/prompts-life-design.png',  group: 'Life & Career' },
  'goals':         { title: 'Goals',        line: 'Goals you will actually hit',                  count: 15, image: 'section-rooms/prompts-goals.png',        group: 'Life & Career' },
  'creative':      { title: 'Creative',     line: 'Unlock ideas, break blocks',                   count: 15, image: 'section-rooms/prompts-creative.png',     group: 'Life & Career' },
  'career':        { title: 'Career',       line: 'Get hired, get paid, get ahead',               count: 15, image: 'section-rooms/prompts-career.png',       group: 'Life & Career' },

  'ai-tools':      { title: 'AI Tools',     line: 'Claude, Cursor & co. in depth',                count: 15, image: 'section-rooms/prompts-ai-tools.png',     group: 'Build' },
  'prompting':     { title: 'Prompting',    line: 'Better outputs from any AI',                   count: 15, image: 'section-rooms/prompts-prompting.png',    group: 'Build' },
  'coding':        { title: 'Coding',       line: 'Ship better code, faster',                     count: 15, image: 'section-rooms/prompts-coding.png',       group: 'Build' },
  'data':          { title: 'Data',         line: 'Numbers into clear decisions',                 count: 15, image: 'section-rooms/prompts-data.png',         group: 'Build' },
  'product-tech':  { title: 'Product',      line: 'Build things people actually use',             count: 15, image: 'section-rooms/prompts-product.png',      group: 'Build' },
};

// Display order on the landing — Edge first (flagship), then the 4 sb2 groups.
export const PROMPT_CATEGORY_ORDER: string[] = [
  'seans-edge',
  'sales', 'marketing', 'finance', 'operations', 'hiring', 'customer', 'legal',
  'strategy', 'frameworks', 'writing', 'research', 'communication',
  'life-design', 'goals', 'creative', 'career',
  'ai-tools', 'prompting', 'coding', 'data', 'product-tech',
];
