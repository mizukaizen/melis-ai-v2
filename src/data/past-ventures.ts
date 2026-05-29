// The arc — every venture before melis.ai, 2007 → today. Copy ported
// verbatim from the v1 mockup's past-ventures page (quotes the 2018
// LinkedIn article "Overcoming The Dreaded Quarter-life Crisis").
// Rendered as an expandable archive at the foot of the ventures landing.

export const PAST_VENTURES_INTRO =
  "Most of what's on this site is current. This is everything that came before — the half-built sites, the wrong domains, the trademarks I bought that didn't belong to me, the freelance work I did before I was old enough to drive. The pattern is the same. The technology has changed.";

export const PAST_VENTURES_NOTE =
  "The 2017–2018 entries quote directly from a 2018 LinkedIn article — “Overcoming The Dreaded Quarter-life Crisis.”";

export type PastVenture = { name: string; period: string; body: string[] };

export const PAST_VENTURES: PastVenture[] = [
  {
    name: 'Sean Melis Studios',
    period: '2007 · age 14',
    body: [
      'The first venture, started at 14. Freelance graphic design, video editing, and animation, run as a one-person studio from a Brisbane bedroom for over five years. Clients included Beyond Blue, VideoZoo TV, AusCSP, GamerNet, PDT Architects, QUT Guild, UQ Union, UQSS, and several Counter-Strike: Source esports teams. Built a YouTube channel that did roughly 200,000 cumulative views.',
      'Lived at seanmelis.com — a hand-coded HTML and CSS site hosted off Dropbox, the first time the personal brand existed at its own domain. Already tracking the same instinct: own the domain, own the file, control the platform.',
      "This is the venture I forget to mention because it sounds too long ago to count. It counts. Every operating habit on this site — own the file, ship the brand, deal with clients, run the channel — was practised before I'd finished high school.",
    ],
  },
  {
    name: 'Prokure Australia',
    period: 'sourcing agency',
    body: [
      'Co-founded a sourcing agency that helped Australian businesses source, negotiate, and ship products from overseas suppliers. End-to-end import assistance — the same pattern that would resurface five years later as the dropshipping era, but at the wholesale layer rather than retail. Ran for just over a year. Useful as a first proper co-founder experience.',
    ],
  },
  {
    name: 'Bubble',
    period: 'never shipped',
    body: [
      "A design-led web concept that never shipped. PSDs and mood boards, no product. Worth mentioning because it existed — most people don't keep the file when something doesn't ship. Kept it.",
    ],
  },
  {
    name: 'dbp — Designed by PowerPoint',
    period: 'late 2017',
    body: [
      'Two parallel attempts at PowerPoint-adjacent products: an e-commerce store for templates and the roadmap for an AI-powered PowerPoint design platform, both run under the dbp brand. Spent over $5,000 on outsourced services that destroyed the front-end framework of the site. Spent another $1,000+ on business names and domains — all of which turned out to be Microsoft trademarks. Paid a startup lawyer in Mexico to tell me PowerPoint is a trademark of Microsoft. Kept the receipts.',
    ],
  },
  {
    name: 'Dropshipping era — round one',
    period: '2017',
    body: [
      'Two stores, eight Instagram accounts, ten thousand followers in two months, overall loss. TakeMyFuckingMoney.com — yes, that was the actual name. The bet: novelty domain, novelty products, Instagram-led acquisition. AudioKaizen.com — audio gear and lifestyle accessories niche.',
      'What I learned: how to deal with international manufacturers, automate product fulfilment, run Facebook Ads, and growth-hack Instagram. What I lost: time, ad spend, and the belief that a clever domain rescues a crowded niche.',
    ],
  },
  {
    name: 'Crypto trading',
    period: '2017',
    body: [
      'Made a small fortune day-trading cryptocurrency in 2017. Flew to Melbourne to compete in a crypto-trading tournament (lol). Lost most of the fortune on a series of bad trades. Got terribly depressed. Learnt about portfolio management, technical trades, stop-losses, and patience — the hard way. The Polymarket bots running today are downstream of this lesson, eight years on.',
    ],
  },
  {
    name: 'bot·hello',
    period: 'Dec 2017 – Sept 2023',
    body: [
      'The first venture from the post-consulting phase that survived. Co-founded one of Australia’s first conversational AI companies in December 2017. Profitable within five months, ran for nearly six years, delivered 50+ projects.',
      'Notable clients: Maybelline New York, Lancôme, Kiehl’s, CeraVe, Anytime Fitness, Brisbane Lions, Splendour in the Grass, Falls Festival, Culture Amp, Goodlife Health Clubs, Youfoodz, SkinCeuticals, Inner Health Plus, Gold Coast Suns. Partnerships with Intercom, ManyChat, and UneeQ for digital humans.',
    ],
  },
  {
    name: 'CryptoBro',
    period: 'early 2018 · unshipped',
    body: [
      "The unshipped bot·hello product I’m most proud of in retrospect. The plan: the first Facebook Messenger chatbot you could talk to about live Bitcoin prices, market context, and trading commentary. Mascot designed, mindmap drafted, decks shipped to early partners. Never went live. Eight years later, every AI assistant does exactly this. We were just early — and conversational AI in 2018 wasn’t actually capable of the experience the deck promised.",
    ],
  },
  {
    name: 'Toklyf',
    period: '2022 · dropshipping round two',
    body: [
      'Round two of dropshipping, while still running bot·hello. A TikTok-led store called Toklyf. The bet was that the entire dropshipping playbook had migrated from Instagram + Facebook Ads (2017–18) to TikTok organic + Spark Ads (2022). It had — but the margins had moved with it, and the same lessons from round one applied harder. Worth mentioning because the pattern repeats: same operator, same instinct, same playbook applied to the new channel, similar outcome. Each attempt is cheaper tuition than the last.',
    ],
  },
];
