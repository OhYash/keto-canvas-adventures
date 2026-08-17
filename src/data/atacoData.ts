// Content for the Ataco page. Update this file, not the component.
// Source material: dev/research/ataco-page-content.md

export interface AtacoStory {
  title: string;
  description: string;
}

export interface AtacoPhoto {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
}

export const atacoQuickFacts = [
  'Triumph Scrambler 400X',
  'Khaki green',
  'Since April 2026',
  '~1800 km',
];

export const atacoPhotos: AtacoPhoto[] = [
  {
    src: '/personal/ataco_offroad.jpg',
    alt: 'Triumph Scrambler 400X motorcycle on an off-road trail with mountain backdrop',
    caption: 'Ataco Off-Road',
    objectPosition: 'object-center',
  },
  {
    src: '/personal/ataco_w_me.jpg',
    alt: 'Yash Yadav standing with his Triumph Scrambler 400X motorcycle',
    caption: 'Ataco & Me',
    objectPosition: 'object-bottom',
  },
];

export const atacoStories: AtacoStory[] = [
  {
    title: 'The Last 400',
    description:
      'Bought on April 6, 2026 from Jaipur — the showroom\'s last 400cc piece before the lineup in India moved to 349cc. You can\'t buy this exact motorcycle fresh anymore. I didn\'t plan the exclusivity; I\'ll take it.',
  },
  {
    title: 'The Overthinking Years',
    description:
      "I watched YouTube riding content for years before I owned a motorcycle. The shortlist kept growing: Yezdi Scrambler, Royal Enfield Scram, Himalayan, Classic, Hero Xpulse. Each one had a nickel I couldn't swallow — not enough power, or spoked wheels which means tubed tyres, or in Yezdi's case, after-sales support that just wasn't there. The TVS RTX 300 made the list too, but no showroom could give me a test ride. I don't buy a motorcycle I haven't ridden. That rule is non-negotiable, so that was that.",
  },
  {
    title: 'First Summer',
    description:
      "I took delivery in April, which in Alwar means riding straight into a furnace. Who rides summers in India? Most days it just stood parked. Still clocked about 1000 km in the first three months — rides around the city, the occasional run to Delhi. Bigger trips wait for weather that cooperates.",
  },
  {
    title: 'Daylight Rules',
    description:
      "I ride in the daytime, full stop. At night, on two wheels, any animal can appear out of nowhere. In daylight at least we see each other coming.",
  },
  {
    title: 'The Almost-Drop',
    description:
      "Haven't dropped it yet. Came close once, parking — I'd turned the bars away from the side stand. The stand holds the bike so upright there's barely any margin in the stance. Lesson burned in: bars go toward the stand, every single time.",
  },
  {
    title: 'First Ride That Meant Something',
    description:
      "Rode the Distinguished Gentleman's Ride on May 17, 2026 — classic and custom motorcycles raising money through Movember for men's mental health. A month into ownership and already part of something.",
  },
];
