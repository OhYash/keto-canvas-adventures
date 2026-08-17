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
      title: 'OhYa.sh – Senior Backend Engineer',
      description: 'Yash Yadav – Senior Backend Engineer. 7+ years in Python and Django, shipping production infra at scale. Open for freelance and senior roles.',
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
      title: 'Work & Backend Engineering | OhYa.sh',
      description: 'Professional backend engineering experience, systems architecture, distributed systems, and technical philosophy of Yash Yadav.',
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
    parent: 'work',
    seo: {
      title: 'Writing & Essays | OhYa.sh',
      description: 'Essays, technical deep dives into backend architecture, system design, and software engineering by Yash Yadav.',
      path: '/writing',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Work', item: `${SITE_URL}/work` },
        { name: 'Writing', item: `${SITE_URL}/writing` },
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
      title: 'About Me & Background | OhYa.sh',
      description: 'Personal background, core engineering principles, languages spoken, and interests of Yash Yadav.',
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
      title: 'Travel Stories & Memories | OhYa.sh',
      description: 'Travel stories, memories, and photos from trips around the world.',
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
      title: 'Keto the Cat | OhYa.sh',
      description: "Meet Keto, the CEO cat behind OhYa.sh. Photos, story, and daily shenanigans on the canvas.",
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
    parent: 'keto',
    seo: {
      title: 'Ataco – Triumph Scrambler 400X | OhYa.sh',
      description: 'Khaki green Triumph Scrambler 400X motorcycle — specs, setup, and riding stories.',
      path: '/ataco',
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Keto', item: `${SITE_URL}/keto` },
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
      title: 'Hobbies & Exploration | OhYa.sh',
      description: 'Creative projects, side experiments, reading, and exploration outside software engineering.',
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
      title: 'Personal Projects & Code | OhYa.sh',
      description: 'Side projects and open-source software built by Yash Yadav, including Solanum Enhanced and INR Finance Compass.',
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
      title: "What I'm Doing Now | OhYa.sh",
      description: "What Yash Yadav is currently working on, reading, building, and focused on right now.",
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
    title: "Let's Talk",
    subtitle: 'Reach out about roles, freelance work, or collaboration.',
    breadcrumbName: 'Contact Me',
    grid: { col: -1, row: 1 },
    color: 'from-indigo-500 to-violet-500',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20',
    icon: '📧',
    direction: 'down',
    seo: {
      title: "Let's Talk & Collaborate | OhYa.sh",
      description: 'Get in touch with Yash Yadav for senior backend roles, freelance consulting, technical advisory, or collaborations.',
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
