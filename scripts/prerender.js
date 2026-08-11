import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const globalNpmPath = `${process.env.HOME}/.npm-global/lib/node_modules/`;
const require = createRequire(globalNpmPath);
const puppeteer = require('puppeteer-core');

const routes = [
  '/',
  '/work',
  '/personal',
  '/keto',
  '/hobbies',
  '/projects',
  '/now',
  '/contact',
  '/travel',
  '/ataco'
];

// Simple static file server for dist directory
function createStaticServer(port) {
  return http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url.split('?')[0]);
    if (filePath.endsWith('/')) {
      filePath = path.join(filePath, 'index.html');
    }
    
    // Fallback to dist/index.html if file doesn't exist yet (SPA routing)
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.pdf': 'application/pdf'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
}

async function prerender() {
  console.log(' Starting static site pre-rendering (SSG)...');

  if (!fs.existsSync(distDir)) {
    console.error(' Error: dist/ directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  const PORT = 4174;
  const server = createStaticServer(PORT);

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(` Static preview server running at http://localhost:${PORT}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      browser: 'firefox',
      executablePath: '/usr/bin/firefox',
      headless: true
    });
  } catch (err) {
    console.log('Firefox launch failed, trying Vivaldi browser...', err.message);
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/vivaldi',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(` Pre-rendering ${route}...`);
    
    await page.goto(url, { waitUntil: 'networkidle0' });
    // Allow animation/hydration settling
    await new Promise((r) => setTimeout(r, 1000));

    const htmlContent = await page.content();

    // Verify h1 tag exists in pre-rendered markup
    const hasH1 = htmlContent.includes('<h1');
    console.log(`  └─ Route ${route} -> h1 tag present: ${hasH1 ? 'YES ✅' : 'NO ❌'}`);

    const routeSubDir = route === '/' ? distDir : path.join(distDir, route);
    if (!fs.existsSync(routeSubDir)) {
      fs.mkdirSync(routeSubDir, { recursive: true });
    }

    const targetHtmlFile = path.join(routeSubDir, 'index.html');
    fs.writeFileSync(targetHtmlFile, htmlContent, 'utf-8');
    console.log(`  └─ Saved static HTML to ${path.relative(projectRoot, targetHtmlFile)}`);
  }

  await browser.close();
  server.close();
  console.log(' Pre-rendering complete! Static HTML files created for all 10 routes.');
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
