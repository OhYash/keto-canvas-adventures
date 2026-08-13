export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  videoUrl?: string; // YouTube embed URL, Vimeo, or MP4 video URL
  content: string;   // Markdown content string
}

/**
 * Robust frontmatter parser that extracts YAML headers and markdown content.
 */
function parseFrontmatter(rawContent: string, fallbackSlug: string): BlogPost {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return {
      slug: fallbackSlug,
      title: fallbackSlug,
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      summary: '',
      tags: [],
      content: rawContent.trim(),
    };
  }

  const [, yamlBlock, markdownBody] = match;
  const metadata: Record<string, unknown> = {};

  yamlBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Clean leading and trailing quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse array tags e.g. ["React", "TypeScript"]
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const jsonVal = value.replace(/'/g, '"');
          metadata[key] = JSON.parse(jsonVal);
        } catch {
          metadata[key] = value
            .slice(1, -1)
            .split(',')
            .map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      } else {
        metadata[key] = value;
      }
    }
  });

  return {
    slug: metadata.slug || fallbackSlug,
    title: metadata.title || fallbackSlug,
    date: metadata.date || new Date().toISOString().split('T')[0],
    readTime: metadata.readTime || '5 min read',
    summary: metadata.summary || '',
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    videoUrl: metadata.videoUrl || undefined,
    content: markdownBody.trim(),
  };
}

// Dynamically discover all .md files in src/data/posts/ at build time
const postFiles = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const BLOG_POSTS: BlogPost[] = Object.entries(postFiles)
  .filter(([filepath]) => {
    const filename = filepath.split('/').pop() || '';
    return !filename.startsWith('HOW_TO_') && !filename.startsWith('_') && !filename.startsWith('README');
  })
  .map(([filepath, rawContent]) => {
    const filename = filepath.split('/').pop() || '';
    const slug = filename.replace(/\.md$/, '');
    return parseFrontmatter(rawContent, slug);
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getAllPosts = (): BlogPost[] => {
  return BLOG_POSTS;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug);
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  BLOG_POSTS.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet);
};
