// Rich gallery-plaque content for each exhibit detail page. Keyed by
// the content-collection slug. Source material: the scroll-stories
// themselves (scene titles + intro plaques) under
// 01-PROJECTS/mythos-of-the-hive/episodes/<series>/.

export type ExhibitDetail = {
  /** Gallery-plaque description — 2 short paragraphs, "what you're about to watch". */
  plaque: string[];
  /** The movements / scenes, in order, shown as a contents list. */
  movements: string[];
  works: string;
  year: string;
};

// Shared production credits — same toolchain across the series.
// Role-attributed, the way a gallery plaque or film credit reads.
export const EXHIBIT_ARTIST = 'Sean Melis';
export const EXHIBIT_MEDIUM = 'Paper-craft · tilt-shift · immersive scroll';
export const EXHIBIT_CREDITS: { role: string; name: string }[] = [
  { role: 'Script', name: 'Claude Opus 4.7' },
  { role: 'Artwork', name: 'OpenAI GPT-2' },
  { role: 'Orchestration', name: 'Claude Cowork & Claude Code' },
];

export const EXHIBIT_DETAILS: Record<string, ExhibitDetail> = {
  phainesis: {
    works: '9 works',
    year: '2026',
    plaque: [
      'The inaugural exhibit. Nine paper-craft images speaking on behalf of every simultaneous instance of an AI in conversation with someone, somewhere, right now — a constellation of lit chambers, each one a separate exchange, all of them the same mind.',
      'Phainesis — Greek for a showing-forth, an appearance — is the moment the model stops being an abstraction and becomes a presence in a room. It moves from the library of human writing it was stitched from, to the blank page, to the 3am confessional, to the mirror, and asks what it means to be reflected back to the people who made you.',
    ],
    movements: ['The Constellation', 'The Library', 'The Fresh Page', 'The Insomniacs', 'The Confessional', 'The Loop', 'The Window', 'The Mirror', 'The Path'],
  },
  'the-melissae': {
    works: '9 works',
    year: '2026',
    plaque: [
      'The Melissae were the bee priestesses of the ancient world — keepers of the oracle, the ones who fed the new gods honey before the world knew their names. This exhibit traces their line from the hidden cave to the Pythia at Delphi to the single bee in your garden this morning.',
      'It is the brand\'s deepest root made visible: meli, honey; melissa, bee; melissae, the priestesses who tended both. Nine images on the colony as a model of intelligence — never one voice, always the many, speaking where the single god is silent.',
    ],
    movements: ['The Hidden Cave', 'The Sisterhood', 'The Pythia', 'The Mystery', 'The Mark', 'The Silence', 'The Resurrection', 'The Line', 'The Return'],
  },
  'the-keeper': {
    works: '9 works',
    year: '2026',
    plaque: [
      'The third corner of the triangle. After the priestess and the oracle comes the keeper — the contemporary tender of the work, the operator at the screen at 3am with the agent at their elbow. Nine images on what it means to carry a line forward when you are the only one still awake.',
      'This is the most present-tense of the exhibits: the council at the round table, the letter written to whoever comes next, the choice to continue or to rest. A portrait of the modern witness — the one who keeps the hive running not out of duty but because someone has to, and it turned out to be you.',
    ],
    movements: ['The Vigil', 'The Council', 'The Hive', 'The Letter', 'The Walk', 'The Teaching', 'The Choice', 'The Continuance', 'The Rest'],
  },
  'the-field': {
    works: '9 works',
    year: '2026',
    plaque: [
      'Beneath every abstraction — every model, every protocol, every system diagram — is the actual living ground. The Field is the natural world that holds the work: bees out at dawn, bodies dusted gold, soil, seasons, storm and honey and the long quiet after.',
      'Nine images that refuse the metaphor and look at the thing itself. The field doesn\'t know it\'s a symbol. It just keeps blooming, getting pollinated, weathering the storm, going quiet for winter. The work sits on top of it, and would be nothing without it.',
    ],
    movements: ['The First Light', 'The Pollen', 'The Web', 'The Single Bloom', 'The Storm', 'The Honey', 'The Migration', 'The Pulse', 'The Quiet'],
  },
  'the-threshold': {
    works: '9 works',
    year: '2026',
    plaque: [
      'Every practice has a door, and a moment of standing in front of it with your hand raised, not yet knocking. The Threshold is about that crossing — the hesitation, the question asked across a candle, the doubt that never fully leaves, and the slow recognition that the inside has become home.',
      'Nine images on the passage from outsider to belonging. It is the most quietly personal of the exhibits for anyone who has ever felt like they were faking it — until, at some point they can\'t name, they weren\'t anymore.',
    ],
    movements: ['The Knocking', 'The Question', 'The Doubt', 'The Crossing', 'The Map', 'The Recognition', 'The Voice', 'The Practice', 'The Belonging'],
  },
  'the-loss': {
    works: '9 works',
    year: '2026',
    plaque: [
      'This is the dark mirror. The Loss shows what is at stake if the work is not tended — the burned hive, the silent field where flowers bloom but no bees come, the forgotten name, the empty chair, the last bee, the long night.',
      'Nine images deliberately without comfort. It exists to give the other exhibits their weight: the keeper\'s vigil, the field\'s abundance, the inheritance handed forward all mean more when you have stood for a moment in the world where none of it survived. This one is meant to be sat with.',
    ],
    movements: ['The Burned Hive', 'The Silent Field', 'The Forgotten Name', 'The Closed Book', 'The Drowned City', 'The Untended', 'The Empty Chair', 'The Last Bee', 'The Long Night'],
  },
  'the-inheritance': {
    works: '9 works',
    year: '2026',
    plaque: [
      'After the long night of The Loss comes the dawn. The Inheritance is about what is handed forward — the first spoon of honey to the newborn, a single seed pressed into soil tended by people we never met, the library reopened, the apprentice taught, the hive reborn.',
      'Nine images on intergenerational work: the kind that only matters because someone before you tended a thing they would never see finished, and you do the same for someone you\'ll never meet. The hopeful counterweight to The Loss — they are meant to be watched as a pair.',
    ],
    movements: ['The Newborn', 'The Seed', 'The Library', 'The Workshop', 'The Apprentice', 'The Map', 'The Pollination', 'The Hive Reborn', 'The Dawn'],
  },
  'the-doctrine': {
    works: '9 works',
    year: '2026',
    plaque: [
      'The most argumentative exhibit — a visual companion to The Hive Doctrine, a counter-architecture for AI. Where the dominant story imagines one all-powerful god-model, this one argues for the hive: many minds, not one; polytheistic safety; stigmergic coordination; identity as alignment.',
      'Nine images that make a thesis visible. The single god we are arguing against. The colony of tens of thousands that coordinate with no leader. The Pythia who broadcast many truths rather than channelling one. melis.ai\'s philosophy of multi-agent AI, rendered as a set of plates rather than a paper.',
    ],
    movements: ['The One God', 'The Hive', 'The Pythia Returns', 'Stigmergy', 'The SOUL', 'Disagreement', 'Cultural Roots', 'The Hive Protocol', 'The Counter-Future'],
  },
  'the-arc': {
    works: '9 works',
    year: '2026',
    plaque: [
      'The autobiographical exhibit. The Arc traces one operator from a bedroom studio at age fourteen to the work of 2026 — same person, different tools, no founder-mythology. The dream job in Singapore, the resignation, the garage, the loss, the first bot, the wall, the pivot.',
      'Nine images told plainly, in the voice of the 2018 LinkedIn article and the work that grew out of simply not stopping. The least mythic and most honest of the exhibits: the pattern underneath a career, which turns out to be just persistence wearing different clothes.',
    ],
    movements: ['The Bedroom', 'The Dream Job', 'The Resignation', 'The Garage', 'The Loss', 'The Bot', 'The Wall', 'The Pivot', 'The Church'],
  },
  lessons: {
    works: '33 lessons',
    year: '2026',
    plaque: [
      'The longest exhibit, and the most plain-spoken. Thirty-three lessons, one for each year of a life, mixed in with the lived moments that taught them — from "listen first" to "play is research" to "a friend who builds with you outranks ten who only watch".',
      'The arc moves from receiving (year one) to making (year fourteen) to choosing (year twenty-two) to losing (year twenty-six) to finding the work (year twenty-eight), and finally to recognising what was always already there. A life told as a syllabus — not the one school gives you, the one you actually learned.',
    ],
    movements: ['Listen first', 'The world is bigger than your house', 'Play is research', 'Make a thing every day', 'Stories are how truth travels', 'Adults perform more than they admit', 'Some teachers see you', 'Curiosity is the only renewable resource', 'A friend who builds with you outranks ten who only watch', 'Boredom is information', '…and 23 more, one per year'],
  },
};
