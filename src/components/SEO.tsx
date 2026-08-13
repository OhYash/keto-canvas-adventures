import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '@/data/blogData';

interface SEOProps {
  sectionId: string;
  articleSlug?: string | null;
}

interface SectionSEOConfig {
  title: string;
  description: string;
  path: string;
  breadcrumbs: { name: string; item: string }[];
}

const SITE_URL = 'https://ohya.sh';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const SECTION_CONFIGS: Record<string, SectionSEOConfig> = {
  home: {
    title: 'OhYa.sh – Senior Backend Engineer',
    description: "Yash Yadav – Senior Backend Engineer. 7+ years in Python and Django, shipping production infra at scale. Open for freelance and senior roles.",
    path: '/',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL }
    ]
  },
  work: {
    title: 'Work & Backend Engineering | OhYa.sh',
    description: 'Professional backend engineering experience, systems architecture, distributed systems, and technical philosophy of Yash Yadav.',
    path: '/work',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Work', item: `${SITE_URL}/work` }
    ]
  },
  personal: {
    title: 'About Me & Background | OhYa.sh',
    description: 'Personal background, core engineering principles, languages spoken, and interests of Yash Yadav.',
    path: '/personal',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Personal', item: `${SITE_URL}/personal` }
    ]
  },
  now: {
    title: "What I'm Doing Now | OhYa.sh",
    description: "What Yash Yadav is currently working on, reading, building, and focused on right now.",
    path: '/now',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Now', item: `${SITE_URL}/now` }
    ]
  },
  keto: {
    title: 'Keto the Cat | OhYa.sh',
    description: "Meet Keto, the CEO cat behind OhYa.sh. Photos, story, and daily shenanigans on the canvas.",
    path: '/keto',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Keto', item: `${SITE_URL}/keto` }
    ]
  },
  hobbies: {
    title: 'Hobbies & Exploration | OhYa.sh',
    description: 'Creative projects, side experiments, reading, and exploration outside software engineering.',
    path: '/hobbies',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Hobbies', item: `${SITE_URL}/hobbies` }
    ]
  },
  projects: {
    title: 'Personal Projects & Code | OhYa.sh',
    description: 'Side projects and open-source software built by Yash Yadav, including Solanum Enhanced and INR Finance Compass.',
    path: '/projects',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Hobbies', item: `${SITE_URL}/hobbies` },
      { name: 'Projects', item: `${SITE_URL}/projects` }
    ]
  },
  writing: {
    title: 'Writing & Essays | OhYa.sh',
    description: 'Essays, technical deep dives into backend architecture, system design, and software engineering by Yash Yadav.',
    path: '/writing',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Work', item: `${SITE_URL}/work` },
      { name: 'Writing', item: `${SITE_URL}/writing` }
    ]
  },
  contact: {
    title: "Let's Talk & Collaborate | OhYa.sh",
    description: 'Get in touch with Yash Yadav for senior backend roles, freelance consulting, technical advisory, or collaborations.',
    path: '/contact',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Contact', item: `${SITE_URL}/contact` }
    ]
  },
  travel: {
    title: 'Travel Stories & Memories | OhYa.sh',
    description: 'Travel stories, memories, and photos from trips around the world.',
    path: '/travel',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Personal', item: `${SITE_URL}/personal` },
      { name: 'Travel', item: `${SITE_URL}/travel` }
    ]
  },
  ataco: {
    title: 'Ataco – Triumph Scrambler 400X | OhYa.sh',
    description: 'Khaki green Triumph Scrambler 400X motorcycle — specs, setup, and riding stories.',
    path: '/ataco',
    breadcrumbs: [
      { name: 'Home', item: SITE_URL },
      { name: 'Keto', item: `${SITE_URL}/keto` },
      { name: 'Ataco', item: `${SITE_URL}/ataco` }
    ]
  }
};

export const SEO: React.FC<SEOProps> = ({ sectionId, articleSlug }) => {
  const article = articleSlug ? getPostBySlug(articleSlug) : null;
  const baseConfig = SECTION_CONFIGS[sectionId] || SECTION_CONFIGS.home;

  const config: SectionSEOConfig = article
    ? {
        title: `${article.title} | OhYa.sh`,
        description: article.summary,
        path: `/writing/${article.slug}`,
        breadcrumbs: [
          { name: 'Home', item: SITE_URL },
          { name: 'Work', item: `${SITE_URL}/work` },
          { name: 'Writing', item: `${SITE_URL}/writing` },
          { name: article.title, item: `${SITE_URL}/writing/${article.slug}` }
        ]
      }
    : baseConfig;

  const canonicalUrl = `${SITE_URL}${config.path === '/' ? '' : config.path}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Yash Yadav',
    'jobTitle': 'Senior Backend Engineer & Founder',
    'url': SITE_URL,
    'sameAs': [
      'https://github.com/OhYash',
      'https://linkedin.com/in/ohyash',
      'https://x.com/ohyash'
    ]
  };

  const pageSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': article.title,
        'description': article.summary,
        'url': canonicalUrl,
        'datePublished': article.date,
        'author': {
          '@type': 'Person',
          'name': 'Yash Yadav'
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'name': config.title,
        'description': config.description,
        'url': canonicalUrl,
        'mainEntity': {
          '@type': 'Person',
          'name': 'Yash Yadav'
        }
      };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': config.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': crumb.name,
      'item': crumb.item
    }))
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="author" content="Yash Yadav" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content="OhYa.sh" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:site" content="@ohyash" />
      <meta name="twitter:creator" content="@ohyash" />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};

export default SEO;
