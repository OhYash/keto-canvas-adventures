import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '@/data/blogData';
import { getTravelStoryById } from '@/data/travelStories';
import { SECTION_SEO_CONFIGS, SITE_URL, OG_IMAGE, SectionSEOConfig } from '@/data/sections';

interface SEOProps {
  sectionId: string;
  articleSlug?: string | null;
  storyId?: string | null;
}

const SEO: React.FC<SEOProps> = ({ sectionId, articleSlug, storyId }) => {
  const article = articleSlug ? getPostBySlug(articleSlug) : null;
  const travelStory = storyId ? getTravelStoryById(storyId) : null;
  const baseConfig = SECTION_SEO_CONFIGS[sectionId] || SECTION_SEO_CONFIGS.home;

  let config: SectionSEOConfig = baseConfig;

  if (article) {
    config = {
      title: `${article.title} | OhYa.sh`,
      description: article.summary,
      path: `/writing/${article.slug}`,
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Writing & Essays', item: `${SITE_URL}/writing` },
        { name: article.title, item: `${SITE_URL}/writing/${article.slug}` },
      ],
    };
  } else if (travelStory) {
    config = {
      title: `${travelStory.title} – Travel Story | OhYa.sh`,
      description: travelStory.description,
      path: `/travel/${travelStory.id}`,
      breadcrumbs: [
        { name: 'Home', item: SITE_URL },
        { name: 'Personal', item: `${SITE_URL}/personal` },
        { name: 'Travel', item: `${SITE_URL}/travel` },
        { name: travelStory.title, item: `${SITE_URL}/travel/${travelStory.id}` },
      ],
    };
  }

  const canonicalUrl = `${SITE_URL}${config.path === '/' ? '' : config.path}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yash Yadav',
    jobTitle: 'Senior Backend Engineer & Founder',
    url: SITE_URL,
    sameAs: [
      'https://github.com/OhYash',
      'https://linkedin.com/in/ohyash',
      'https://x.com/ohyash',
    ],
  };

  const pageSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.summary,
        url: canonicalUrl,
        datePublished: article.date,
        author: {
          '@type': 'Person',
          name: 'Yash Yadav',
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: config.title,
        description: config.description,
        url: canonicalUrl,
        mainEntity: {
          '@type': 'Person',
          name: 'Yash Yadav',
        },
      };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: config.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="author" content="Yash Yadav" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
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
