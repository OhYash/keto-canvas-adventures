import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import http from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const SITE_URL = 'https://ohya.sh';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const routeConfigs = [
  {
    path: '/',
    id: 'home',
    title: 'OhYa.sh – Everything Yash. Filtered.',
    h1: "I'm Yash. Engineer today, founder in progress.",
    description: "Interactive portfolio of Yash Yadav. Senior backend engineer & founder in progress. Work, projects, cat Keto, and adventures.",
    canonical: SITE_URL
  },
  {
    path: '/work',
    id: 'work',
    title: 'Work & Backend Engineering | OhYa.sh',
    h1: 'My Work Life',
    description: 'Professional backend engineering experience, systems architecture, distributed systems, and technical philosophy of Yash Yadav.',
    canonical: `${SITE_URL}/work`
  },
  {
    path: '/personal',
    id: 'personal',
    title: 'About Me & Background | OhYa.sh',
    h1: 'Who I Am',
    description: 'Personal background, core engineering principles, languages spoken, and interests of Yash Yadav.',
    canonical: `${SITE_URL}/personal`
  },
  {
    path: '/now',
    id: 'now',
    title: "What I'm Doing Now | OhYa.sh",
    h1: "What I'm Up To",
    description: "What Yash Yadav is currently working on, reading, building, and focused on right now.",
    canonical: `${SITE_URL}/now`
  },
  {
    path: '/keto',
    id: 'keto',
    title: 'Keto the Cat | OhYa.sh',
    h1: 'My Cat, Keto',
    description: "Meet Keto, the CEO cat behind OhYa.sh. Photos, story, and daily shenanigans on the canvas.",
    canonical: `${SITE_URL}/keto`
  },
  {
    path: '/hobbies',
    id: 'hobbies',
    title: 'Hobbies & Exploration | OhYa.sh',
    h1: 'Just for Fun',
    description: 'Creative projects, side experiments, reading, and exploration outside software engineering.',
    canonical: `${SITE_URL}/hobbies`
  },
  {
    path: '/projects',
    id: 'projects',
    title: 'Personal Projects & Code | OhYa.sh',
    h1: 'Personal Projects',
    description: 'Side projects and open-source software built by Yash Yadav, including INR Finance Compass.',
    canonical: `${SITE_URL}/projects`
  },
  {
    path: '/contact',
    id: 'contact',
    title: "Let's Talk & Collaborate | OhYa.sh",
    h1: "Let's Talk",
    description: 'Get in touch with Yash Yadav for senior backend roles, freelance consulting, technical advisory, or collaborations.',
    canonical: `${SITE_URL}/contact`
  },
  {
    path: '/travel',
    id: 'travel',
    title: 'Travel Stories & Memories | OhYa.sh',
    h1: 'Travel Stories',
    description: 'Travel stories, memories, and photos from trips around the world.',
    canonical: `${SITE_URL}/travel`
  },
  {
    path: '/ataco',
    id: 'ataco',
    title: 'Ataco – Triumph Scrambler 400X | OhYa.sh',
    h1: 'Ataco',
    description: 'Khaki green Triumph Scrambler 400X motorcycle — specs, setup, and riding stories.',
    canonical: `${SITE_URL}/ataco`
  },
  {
    path: '/writing',
    id: 'writing',
    title: 'Writing & Essays | OhYa.sh',
    h1: 'Writing & Essays',
    description: 'Essays, technical deep dives into backend architecture, system design, and software engineering by Yash Yadav.',
    canonical: `${SITE_URL}/writing`
  },
  {
    path: '/writing/building-an-infinite-canvas-portfolio',
    id: 'writing-building-an-infinite-canvas-portfolio',
    title: 'Building an Infinite Canvas Portfolio with React & TypeScript | OhYa.sh',
    h1: 'Building an Infinite Canvas Portfolio with React & TypeScript',
    description: 'How I built a 2D spatial canvas portfolio using React, CSS translate3d, and custom viewport management.',
    canonical: `${SITE_URL}/writing/building-an-infinite-canvas-portfolio`
  },
  {
    path: '/writing/designing-high-throughput-backend-systems',
    id: 'writing-designing-high-throughput-backend-systems',
    title: 'Designing High-Throughput Backend Systems | OhYa.sh',
    h1: 'Designing High-Throughput Backend Systems',
    description: 'Patterns for building low-latency, scalable microservices in Node.js and Go.',
    canonical: `${SITE_URL}/writing/designing-high-throughput-backend-systems`
  }
];

// Injects head tags cleanly without creating duplicates
function injectHeadTags(baseHtml, config) {
  let html = baseHtml;

  // 1. Remove existing title, meta description, and canonical tags to prevent duplicates
  html = html.replace(/<title>.*?<\/title>/gi, '');
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/gi, '');
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi, '');
  html = html.replace(/<meta\s+property="og:.*?"\s+content=".*?"\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name="twitter:.*?"\s+content=".*?"\s*\/?>/gi, '');

  // 2. Build single canonical head tags block
  const headExtra = `
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <link rel="canonical" href="${config.canonical}" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:url" content="${config.canonical}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="OhYa.sh" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ohyash" />
    <meta name="twitter:creator" content="@ohyash" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <script type="application/ld+json">
    ${JSON.stringify({
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
    })}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      'name': config.title,
      'description': config.description,
      'url': config.canonical,
      'mainEntity': {
        '@type': 'Person',
        'name': 'Yash Yadav'
      }
    })}
    </script>
  `;

  // Insert into <head>
  html = html.replace('<head>', `<head>\n${headExtra}`);

  // 3. Inject pre-rendered h1 container inside #root if #root is empty
  if (html.includes('<div id="root"></div>')) {
    const rootBodyContent = `
    <div id="root">
      <header style="padding: 2rem; max-width: 800px; margin: 0 auto; color: #f8fafc; font-family: system-ui, sans-serif;">
        <h1 style="font-size: 1.875rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem;">${config.h1}</h1>
        <p style="color: #94a3b8; font-size: 1rem; line-height: 1.5;">${config.description}</p>
      </header>
    </div>
    `;
    html = html.replace('<div id="root"></div>', rootBodyContent);
  }

  return html;
}

function fallbackTemplatePrerender() {
  console.log(' Running template-based static pre-rendering fallback...');
  const baseHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error(' Error: dist/index.html missing.');
    return;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

  for (const config of routeConfigs) {
    const html = injectHeadTags(baseHtml, config);

    const routeSubDir = config.path === '/' ? distDir : path.join(distDir, config.path.substring(1));
    if (!fs.existsSync(routeSubDir)) {
      fs.mkdirSync(routeSubDir, { recursive: true });
    }

    const targetHtmlFile = path.join(routeSubDir, 'index.html');
    fs.writeFileSync(targetHtmlFile, html, 'utf-8');
    console.log(`  └─ Saved static pre-rendered HTML for ${config.path} -> ${path.relative(projectRoot, targetHtmlFile)}`);
  }

  console.log(' Template pre-rendering completed successfully!');
}

async function tryPuppeteerPrerender() {
  let puppeteerModule;

  try {
    puppeteerModule = (await import('puppeteer-core')).default;
  } catch (e1) {
    try {
      const globalNpmPath = `${process.env.HOME}/.npm-global/lib/node_modules/`;
      const require = createRequire(globalNpmPath);
      puppeteerModule = require('puppeteer-core');
    } catch (e2) {
      console.log(' puppeteer-core not found in environment. Using static template pre-render fallback.');
      return false;
    }
  }

  try {
    const PORT = 4174;
    const server = http.createServer((req, res) => {
      let filePath = path.join(distDir, req.url.split('?')[0]);
      if (filePath.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distDir, 'index.html');
      }
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        }
      });
    });

    await new Promise((resolve) => server.listen(PORT, resolve));

    let browser;
    try {
      browser = await puppeteerModule.launch({
        browser: 'firefox',
        executablePath: '/usr/bin/firefox',
        headless: true
      });
    } catch (err) {
      browser = await puppeteerModule.launch({
        executablePath: '/usr/bin/vivaldi',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    const page = await browser.newPage();

    for (const config of routeConfigs) {
      const url = `http://localhost:${PORT}${config.path}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 800));
      
      let rawHtml = await page.content();
      // Ensure exactly 1 set of meta tags
      rawHtml = injectHeadTags(rawHtml, config);

      const routeSubDir = config.path === '/' ? distDir : path.join(distDir, config.path.substring(1));
      if (!fs.existsSync(routeSubDir)) {
        fs.mkdirSync(routeSubDir, { recursive: true });
      }

      const targetHtmlFile = path.join(routeSubDir, 'index.html');
      fs.writeFileSync(targetHtmlFile, rawHtml, 'utf-8');
      console.log(`  └─ Pre-rendered ${config.path} -> ${path.relative(projectRoot, targetHtmlFile)}`);
    }

    await browser.close();
    server.close();
    console.log(' Puppeteer pre-rendering completed successfully!');
    return true;
  } catch (err) {
    console.log(' Puppeteer execution encountered an error:', err.message);
    return false;
  }
}

async function main() {
  console.log(' Starting static site pre-rendering (SSG)...');

  if (!fs.existsSync(distDir)) {
    console.error(' Error: dist/ directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  const success = await tryPuppeteerPrerender();
  if (!success) {
    fallbackTemplatePrerender();
  }
}

main().catch((err) => {
  console.error(' Pre-render script error:', err);
  process.exit(0);
});
