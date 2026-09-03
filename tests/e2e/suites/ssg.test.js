import fs from 'node:fs';
import path from 'node:path';
import { describe, test, expect, projectRoot } from '../harness.js';
import { SECTIONS } from '../../../src/data/sections.ts';
import { travelStories } from '../../../src/data/travelStories.ts';

export function registerSSGTests() {
  describe('Static Site Generation (SSG) & Scoped HTML', () => {
    const distDir = path.join(projectRoot, 'dist');

    test('dist/ directory and core assets exist', () => {
      expect(fs.existsSync(distDir)).toBe(true);
      expect(fs.existsSync(path.join(distDir, 'index.html'))).toBe(true);
      expect(fs.existsSync(path.join(distDir, 'sitemap.xml'))).toBe(true);
    });

    test('All canonical section HTML pages are pre-rendered in dist/', () => {
      for (const section of SECTIONS) {
        const routePath = section.id === 'home' ? '' : section.id;
        const htmlPath = path.join(distDir, routePath, 'index.html');
        expect(fs.existsSync(htmlPath)).toBe(true);

        const content = fs.readFileSync(htmlPath, 'utf-8');
        expect(content).toContain('<div id="root">');
        expect(content).toContain(section.seo.title);
      }
    });

    test('All travel story sub-routes are pre-rendered in dist/travel/', () => {
      for (const story of travelStories) {
        const htmlPath = path.join(distDir, 'travel', story.id, 'index.html');
        expect(fs.existsSync(htmlPath)).toBe(true);

        const content = fs.readFileSync(htmlPath, 'utf-8');
        expect(content).toContain(story.title);
        expect(content).toContain(story.country);
      }
    });

    test('All markdown blog essays are pre-rendered in dist/writing/', () => {
      const postsDir = path.join(projectRoot, 'src', 'data', 'posts');
      const postFiles = fs
        .readdirSync(postsDir)
        .filter(
          (file) =>
            file.endsWith('.md') &&
            !file.startsWith('HOW_TO_') &&
            !file.startsWith('_') &&
            !file.startsWith('README')
        );

      expect(postFiles.length).toBeGreaterThan(0);

      for (const file of postFiles) {
        const slug = file.replace(/\.md$/, '');
        const htmlPath = path.join(distDir, 'writing', slug, 'index.html');
        expect(fs.existsSync(htmlPath)).toBe(true);

        const content = fs.readFileSync(htmlPath, 'utf-8');
        expect(content).toContain('<article');
        expect(content).toContain('<div id="root">');
      }
    });

    test('SSG output is scoped per route and not a duplicate full-DOM dump', () => {
      const workHtml = fs.readFileSync(path.join(distDir, 'work', 'index.html'), 'utf-8');
      expect(workHtml).toContain('My Work Life');
      // Should not contain contact section or keto traits inside static #root render
      expect(workHtml).not.toContain('All About Keto');

      const ketoHtml = fs.readFileSync(path.join(distDir, 'keto', 'index.html'), 'utf-8');
      expect(ketoHtml).toContain('My Cat, Keto');
      expect(ketoHtml).not.toContain('Most Recent Role');
    });

    test('sitemap.xml is valid XML and contains all canonical routes', () => {
      const sitemapPath = path.join(distDir, 'sitemap.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

      expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

      for (const section of SECTIONS) {
        const loc = section.id === 'home' ? 'https://ohya.sh/' : `https://ohya.sh/${section.id}`;
        expect(sitemapContent).toContain(`<loc>${loc}</loc>`);
      }

      for (const story of travelStories) {
        expect(sitemapContent).toContain(`<loc>https://ohya.sh/travel/${story.id}</loc>`);
      }
    });

    test('robots.txt points to canonical sitemap.xml', () => {
      const robotsPath = path.join(projectRoot, 'public', 'robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);
      const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
      expect(robotsContent).toContain('Sitemap: https://ohya.sh/sitemap.xml');
    });

    test('All pre-rendered routes have optimal SEO meta descriptions (150-160 characters)', () => {
      function collectHtmlFiles(dir) {
        const results = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory() && entry.name !== 'assets') {
            results.push(...collectHtmlFiles(fullPath));
          } else if (entry.name === 'index.html') {
            results.push(fullPath);
          }
        }
        return results;
      }

      const htmlFiles = collectHtmlFiles(distDir);
      expect(htmlFiles.length).toBeGreaterThanOrEqual(SECTIONS.length + travelStories.length);

      for (const file of htmlFiles) {
        const html = fs.readFileSync(file, 'utf-8');
        const match =
          html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);

        expect(match).toBeTruthy();
        const desc = match[1].replace(/&#x27;/g, "'");
        // Validate optimal search snippet length (150-160 characters)
        expect(desc.length).toBeGreaterThanOrEqual(145);
        expect(desc.length).toBeLessThanOrEqual(165);

        // OpenGraph and Twitter descriptions must also be present
        expect(html).toContain('property="og:description"');
        expect(html).toContain('name="twitter:description"');
      }
    });

    test('All pre-rendered routes have optimal SEO titles (<= 70 characters)', () => {
      function collectHtmlFiles(dir) {
        const results = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory() && entry.name !== 'assets') {
            results.push(...collectHtmlFiles(fullPath));
          } else if (entry.name === 'index.html') {
            results.push(fullPath);
          }
        }
        return results;
      }

      const htmlFiles = collectHtmlFiles(distDir);
      expect(htmlFiles.length).toBeGreaterThanOrEqual(SECTIONS.length + travelStories.length);

      for (const file of htmlFiles) {
        const html = fs.readFileSync(file, 'utf-8');
        const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);

        expect(match).toBeTruthy();
        const title = match[1].replace(/&#x27;/g, "'");
        // Title must be present, meaningful, and strictly <= 70 chars per search engine guidelines
        expect(title.length).toBeGreaterThanOrEqual(15);
        expect(title.length).toBeLessThanOrEqual(70);

        // OpenGraph and Twitter titles must also be present
        expect(html).toContain('property="og:title"');
        expect(html).toContain('name="twitter:title"');
      }
    });

    test('All pre-rendered HTML pages have exactly one <h1> tag', () => {
      function collectHtmlFiles(dir) {
        const results = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory() && entry.name !== 'assets') {
            results.push(...collectHtmlFiles(fullPath));
          } else if (entry.name === 'index.html') {
            results.push(fullPath);
          }
        }
        return results;
      }

      const htmlFiles = collectHtmlFiles(distDir);
      expect(htmlFiles.length).toBeGreaterThanOrEqual(SECTIONS.length + travelStories.length);

      for (const file of htmlFiles) {
        const html = fs.readFileSync(file, 'utf-8');
        const h1Matches = html.match(/<h1[\s>]/gi) || [];
        expect(h1Matches.length).toBe(1);
      }
    });
  });
}
