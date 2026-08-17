import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
const baseHtmlPath = path.join(distDir, 'index.html');

async function prerender() {
  console.log(' Starting Component-Driven Vite SSR Static Pre-rendering...');

  if (!fs.existsSync(distDir)) {
    console.error(' Error: dist/ directory does not exist. Run "vite build" first.');
    process.exit(1);
  }

  if (!fs.existsSync(serverEntryPath)) {
    console.error(` Error: Server entry missing at ${serverEntryPath}. Run "vite build --ssr" first.`);
    process.exit(1);
  }

  if (!fs.existsSync(baseHtmlPath)) {
    console.error(' Error: dist/index.html is missing.');
    process.exit(1);
  }

  // Import rendered module from dist/server/entry-server.js
  const serverModule = await import(pathToFileURL(serverEntryPath).href);
  const render = serverModule.render;
  const SECTION_ROUTES = serverModule.SECTION_ROUTES || [];
  const SECTION_SITEMAP_CONFIGS = serverModule.SECTION_SITEMAP_CONFIGS || {};
  const travelStories = serverModule.travelStories || [];

  if (typeof render !== 'function') {
    console.error(' Error: render function not exported from entry-server.js');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

  // Derive static section routes directly from canonical registry
  const routes = [...SECTION_ROUTES];

  // Discover travel story sub-routes
  for (const story of travelStories) {
    routes.push(`/travel/${story.id}`);
  }

  // Discover blog post routes dynamically from src/data/posts/
  const postsDir = path.join(projectRoot, 'src', 'data', 'posts');
  if (fs.existsSync(postsDir)) {
    const postFiles = fs
      .readdirSync(postsDir)
      .filter((file) => file.endsWith('.md') && !file.startsWith('HOW_TO_') && !file.startsWith('_') && !file.startsWith('README'));
    for (const file of postFiles) {
      const slug = file.replace(/\.md$/, '');
      routes.push(`/writing/${slug}`);
    }
  }

  console.log(` Render targets: ${routes.length} routes (from canonical section registry)`);

  for (const routePath of routes) {
    try {
      const { html: appHtml, helmet } = render(routePath);

      // Clean default title/meta tags from template to prevent duplicates
      let html = baseHtml;
      html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
      html = html.replace(/<meta[^>]*name=["']description["'][^>]*\/?>/gi, '');
      html = html.replace(/<meta[^>]*name=["']author["'][^>]*\/?>/gi, '');

      // Extract helmet tags
      const headTags = [
        helmet?.title?.toString() || '',
        helmet?.meta?.toString() || '',
        helmet?.link?.toString() || '',
        helmet?.script?.toString() || '',
        helmet?.style?.toString() || '',
      ]
        .filter(Boolean)
        .join('\n    ');

      // Inject helmet head tags
      html = html.replace('<head>', `<head>\n    ${headTags}`);

      // Inject rendered app HTML into #root
      html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);

      // Determine output filepath
      const routeSubDir = routePath === '/' ? distDir : path.join(distDir, routePath.substring(1));
      if (!fs.existsSync(routeSubDir)) {
        fs.mkdirSync(routeSubDir, { recursive: true });
      }

      const targetHtmlFile = path.join(routeSubDir, 'index.html');
      fs.writeFileSync(targetHtmlFile, html, 'utf-8');
      console.log(`  └─ Static HTML generated: ${routePath} -> ${path.relative(projectRoot, targetHtmlFile)}`);
    } catch (err) {
      console.error(`  ❌ Error pre-rendering route ${routePath}:`, err);
    }
  }

  // Clean up temporary server bundle
  const serverBuildDir = path.join(distDir, 'server');
  if (fs.existsSync(serverBuildDir)) {
    fs.rmSync(serverBuildDir, { recursive: true, force: true });
  }

  // Extract real publish/update dates from blog post frontmatter
  const postDates = {};
  if (fs.existsSync(postsDir)) {
    const postFiles = fs
      .readdirSync(postsDir)
      .filter((file) => file.endsWith('.md') && !file.startsWith('HOW_TO_') && !file.startsWith('_') && !file.startsWith('README'));
    for (const file of postFiles) {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const dateMatch = content.match(/^date:\s*["']?([\d-]+)["']?/m);
      if (dateMatch) {
        postDates[`/writing/${slug}`] = dateMatch[1];
      }
    }
  }

  const sitemapEntries = routes.map((routePath) => {
    const config = SECTION_SITEMAP_CONFIGS[routePath] || {
      changefreq: routePath.startsWith('/writing/') || routePath.startsWith('/travel/') ? 'monthly' : 'monthly',
      priority: routePath.startsWith('/writing/') ? '0.8' : routePath.startsWith('/travel/') ? '0.6' : '0.7',
      lastmod: '2026-08-13',
    };
    const loc = routePath === '/' ? 'https://ohya.sh/' : `https://ohya.sh${routePath}`;
    const lastmod = postDates[routePath] || config.lastmod || '2026-08-13';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`;

  const publicSitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
  const distSitemapPath = path.join(distDir, 'sitemap.xml');

  // Idempotently update public/sitemap.xml only if content has changed
  const existingPublicSitemap = fs.existsSync(publicSitemapPath) ? fs.readFileSync(publicSitemapPath, 'utf-8') : '';
  if (existingPublicSitemap !== sitemapXml) {
    fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  }

  fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
  console.log(` 🗺️  Sitemap generated & synchronized: ${routes.length} URLs -> public/sitemap.xml & dist/sitemap.xml`);

  console.log(' Static site pre-rendering (SSG) completed successfully!');
}

prerender().catch((err) => {
  console.error(' Pre-render execution failed:', err);
  process.exit(1);
});
