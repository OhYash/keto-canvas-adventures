export interface GridPosition {
  col: number;
  row: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface SectionSEOConfig {
  title: string;
  description: string;
  path: string;
  breadcrumbs: { name: string; item: string }[];
}

export interface SitemapConfig {
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod: string;
}

export interface SectionDefinition {
  id: string;
  title: string;
  subtitle: string;
  breadcrumbName: string;
  grid: GridPosition;
  color: string;
  gradient: string;
  icon: string;
  direction?: 'right' | 'left' | 'up' | 'down';
  parent?: string;
  alwaysExpanded?: boolean;
  seo: SectionSEOConfig;
  sitemap: SitemapConfig;
}

export interface Section extends SectionDefinition {
  position: Position;
}

export const SITE_URL = 'https://ohya.sh';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SECTIONS: SectionDefinition[] = [
  {
    id: 'home',
    title: 'OhYa.sh Portfolio',
    subtitle: 'Senior Backend Engineer · Founder in progress.',
    breadcrumbName: 'Home',
    grid: { col: 0, row: 0 },
    color: 'from-cyan-500 to-blue-500',
    gradient: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
    icon: '🏠',
    alwaysExpanded: true,
    seo: {
      title: 'Yash Yadav – Senior Backend Engineer | OhYa.sh',
      description: 'Yash Yadav is a senior Python and Django backend engineer based in India, specializing in high-throughput distributed systems and scalable cloud APIs.',
      path: '/',
      breadcrumbs: [{ name: 'Home', item: SITE_URL }],
    },
    sitemap: {
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'work',
    title: 'My Work Life',
    subtitle: 'What I do professionally, and how I think about tech.',
    breadcrumbName: 'Work',
    grid: { col: 1, row: 0 },
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    icon: '💼',
    direction: 'right',
    seo: {
      title: 'Work & Experience | Yash Yadav · OhYa.sh',
      description: 'Professional backend engineering experience by Yash Yadav. 7+ years building high-scale Python and Django distributed systems, APIs, and cloud infrastructure.',
      path: '/work',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Work', item: `${SITE_URL}/work` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.9',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'writing',
    title: 'Writing & Essays',
    subtitle: 'Thoughts on backend engineering, system design, and building products.',
    breadcrumbName: 'Writing & Essays',
    grid: { col: 2, row: 0 },
    color: 'from-sky-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-sky-500/20 to-blue-600/20',
    icon: '✍️',
    direction: 'right',
    seo: {
      title: 'Writing & Essays | Yash Yadav · OhYa.sh',
      description: 'Technical essays and system architecture notes by Yash Yadav on high-throughput backend services, Python and Django engineering, and infinite canvas design.',
      path: '/writing',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Writing & Essays', item: `${SITE_URL}/writing` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'personal',
    title: 'Who I Am',
    subtitle: 'A little about me, my journey, and what makes me tick.',
    breadcrumbName: 'Personal Life',
    grid: { col: -1, row: 0 },
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    icon: '🧍‍♂️',
    direction: 'left',
    seo: {
      title: 'About Me & Life | Yash Yadav · OhYa.sh',
      description: 'Personal background, engineering philosophy, and life journey of Yash Yadav — senior backend engineer based in India, builder, reader, and world traveler.',
      path: '/personal',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Personal', item: `${SITE_URL}/personal` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'travel',
    title: 'Travel Stories',
    subtitle: 'Adventures & Memories',
    breadcrumbName: 'Travel Stories',
    grid: { col: -2, row: 0 },
    color: 'from-green-500 to-teal-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-teal-500/20',
    icon: '✈️',
    direction: 'left',
    parent: 'personal',
    seo: {
      title: 'Travel Stories & Notes | OhYa.sh',
      description: 'Travel stories, field notes, and photo memories from exploring mountains, deserts, fjords, and ancient trails across Japan, Iceland, Peru, and beyond.',
      path: '/travel',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Personal', item: `${SITE_URL}/personal` },
        { name: 'Travel', item: `${SITE_URL}/travel` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'keto',
    title: 'My Cat, Keto',
    subtitle: "Yes, he's real. Yes, he runs the show here.",
    breadcrumbName: 'Meet Keto',
    grid: { col: 0, row: -1 },
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    icon: '🐱',
    direction: 'up',
    seo: {
      title: 'Keto the Cat | Yash Yadav · OhYa.sh',
      description: 'Meet Keto, the golden Persian cat and honorary CEO behind OhYa.sh. Photos, morning pigeon-stalking stories, terrace sunbathing routines, and daily antics.',
      path: '/keto',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Keto', item: `${SITE_URL}/keto` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'ataco',
    title: 'Ataco',
    subtitle: 'My first motorcycle — a khaki green Triumph Scrambler 400X.',
    breadcrumbName: 'Ataco',
    grid: { col: 0, row: -2 },
    color: 'from-lime-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-lime-500/20 to-emerald-600/20',
    icon: '🏍️',
    direction: 'up',
    seo: {
      title: 'Ataco – Scrambler 400X | Yash Yadav · OhYa.sh',
      description: 'Meet Ataco, Yash Yadav\'s khaki green Triumph Scrambler 400X motorcycle. Real photos, custom modifications, gear setup, specs, and riding stories from India.',
      path: '/ataco',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Ataco', item: `${SITE_URL}/ataco` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'hobbies',
    title: 'Just for Fun',
    subtitle: 'Things I build, explore, and obsess over outside work.',
    breadcrumbName: 'Hobbies & Projects',
    grid: { col: 0, row: 1 },
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
    icon: '🎨',
    direction: 'down',
    seo: {
      title: 'Hobbies & Exploration | Yash Yadav · OhYa.sh',
      description: 'Things Yash Yadav builds, explores, and obsesses over outside work — side experiments, motorcycle touring across India, reading lists, and creative hobbies.',
      path: '/hobbies',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Hobbies', item: `${SITE_URL}/hobbies` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'projects',
    title: 'Personal Projects',
    subtitle: 'Code & Creativity',
    breadcrumbName: 'Personal Projects',
    grid: { col: 0, row: 2 },
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
    icon: '🚀',
    direction: 'down',
    parent: 'hobbies',
    seo: {
      title: 'Projects & Code | Yash Yadav · OhYa.sh',
      description: 'Open-source software, developer tools, and projects built by Yash Yadav, including the Solanum Pomodoro timer and INR Finance Compass financial platform.',
      path: '/projects',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Hobbies', item: `${SITE_URL}/hobbies` },
        { name: 'Projects', item: `${SITE_URL}/projects` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'now',
    title: "What I'm Up To",
    subtitle: "Current focus, projects, and what's on my plate lately.",
    breadcrumbName: "What I'm Doing Now",
    grid: { col: 1, row: 1 },
    color: 'from-yellow-500 to-amber-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
    icon: '⚡',
    direction: 'down',
    seo: {
      title: "What I'm Doing Now | Yash Yadav · OhYa.sh",
      description: 'A live snapshot of what Yash Yadav is building, reading, and learning right now. Updated regularly with current backend engineering focus and active projects.',
      path: '/now',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Now', item: `${SITE_URL}/now` },
      ],
    },
    sitemap: {
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: '2026-08-13',
    },
  },
  {
    id: 'contact',
    title: "Get in touch.",
    subtitle: 'Reach out about roles, freelance work, or collaboration.',
    breadcrumbName: 'Contact Me',
    grid: { col: -1, row: 1 },
    color: 'from-indigo-500 to-violet-500',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20',
    icon: '📧',
    direction: 'down',
    seo: {
      title: "Contact Yash Yadav | OhYa.sh",
      description: 'Get in touch with Yash Yadav. Available for senior Python and Django backend engineering roles, technical advisory, freelance consulting, or a chat.',
      path: '/contact',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Contact', item: `${SITE_URL}/contact` },
      ],
    },
    sitemap: {
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2026-08-13',
    },
  },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

const SECTIONS_BY_ID = new Map(SECTIONS.map((s) => [s.id, s]));

export const getSectionById = (id: string): SectionDefinition | undefined => {
  return SECTIONS_BY_ID.get(id);
};

export const isValidSectionId = (id: string): boolean => {
  return SECTIONS_BY_ID.has(id);
};

export const getSectionDisplayName = (id: string): string => {
  const section = SECTIONS_BY_ID.get(id);
  return section ? section.breadcrumbName : id;
};

export const getSectionFromPath = (pathname: string): string => {
  if (pathname === '/' || !pathname) return 'home';
  const pathSegments = pathname.split('/').filter(Boolean);
  const sectionId = pathSegments[0];
  if (sectionId && SECTIONS_BY_ID.has(sectionId)) {
    return sectionId;
  }
  return 'home';
};

export const getPathFromSection = (sectionId: string): string => {
  if (sectionId === 'home') return '/';
  return `/${sectionId}`;
};

export const SECTION_SEO_CONFIGS: Record<string, SectionSEOConfig> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s.seo])
);

export const SECTION_ROUTES: string[] = SECTIONS.map((s) => (s.id === 'home' ? '/' : `/${s.id}`));

export const SECTION_SITEMAP_CONFIGS: Record<string, SitemapConfig> = Object.fromEntries(
  SECTIONS.map((s) => [s.id === 'home' ? '/' : `/${s.id}`, s.sitemap])
);
