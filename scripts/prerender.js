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

  if (typeof render !== 'function') {
    console.error(' Error: render function not exported from entry-server.js');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

  // Static section routes
  const routes = [
    '/',
    '/work',
    '/personal',
    '/now',
    '/keto',
    '/hobbies',
    '/projects',
    '/contact',
    '/travel',
    '/ataco',
    '/writing',
  ];

  // Discover blog post routes dynamically from src/data/posts/
  const postsDir = path.join(projectRoot, 'src', 'data', 'posts');
  if (fs.existsSync(postsDir)) {
    const postFiles = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'));
    for (const file of postFiles) {
      const slug = file.replace(/\.md$/, '');
      routes.push(`/writing/${slug}`);
    }
  }

  console.log(` Render targets: ${routes.length} routes`);

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

  console.log(' Static site pre-rendering (SSG) completed successfully!');
}

prerender().catch((err) => {
  console.error(' Pre-render execution failed:', err);
  process.exit(1);
});
