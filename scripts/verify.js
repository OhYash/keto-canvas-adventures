#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import {
  projectRoot,
  ensurePreviewServer,
  launchBrowser,
  runAllTests,
  testSuites,
  beforeAll,
  afterAll,
} from '../tests/e2e/harness.js';
import { registerAllSuites } from '../tests/e2e/index.js';

// Parse command-line arguments
const args = process.argv.slice(2);

function getArgValue(name, shortName) {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith(`--${name}=`)) {
      return arg.split('=')[1];
    }
    if (arg === `--${name}` || (shortName && arg === `-${shortName}`)) {
      return args[i + 1] || true;
    }
  }
  return null;
}

const hasFlag = (name) => args.some((arg) => arg === `--${name}` || arg.startsWith(`--${name}=`));

const port = Number(getArgValue('port', 'p')) || 4173;
const browserType = getArgValue('browser', 'b') || process.env.BROWSER || 'firefox';
const filter = getArgValue('filter', 'f') || getArgValue('grep', 'g') || null;
const suiteFilter = getArgValue('suite', 's') || null;
const isHeaded = hasFlag('headed');
const noBuild = hasFlag('no-build');

async function main() {
  const distDir = path.join(projectRoot, 'dist');

  // Ensure production build exists
  if (!noBuild && (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html')))) {
    console.log('📦 Building project for E2E verification ("npm run build")...');
    execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
  }

  let serverHandle = null;
  let browser = null;
  let page = null;

  try {
    // 1. Ensure preview server is available
    console.log(`🌐 Connecting to preview server on port ${port}...`);
    serverHandle = await ensurePreviewServer(port);
    console.log(`   └─ Preview server ready at ${serverHandle.baseUrl}`);

    // 2. Launch browser
    console.log(`🦊 Launching browser (${browserType}, headless: ${!isHeaded})...`);
    browser = await launchBrowser({ browser: browserType, headed: isHeaded });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // 3. Register all test suites
    registerAllSuites();

    // Attach shared browser page and server context to each suite
    for (const suite of testSuites) {
      suite.beforeAllHooks.unshift(async (ctx) => {
        ctx.browser = browser;
        ctx.page = page;
        ctx.baseUrl = serverHandle.baseUrl;
        ctx.port = port;
      });
    }

    // 4. Run tests
    const passed = await runAllTests({
      filter,
      suite: suiteFilter,
    });

    if (!passed) {
      process.exit(1);
    }
  } catch (err) {
    console.error('\n❌ Fatal error running E2E verification:', err);
    process.exit(1);
  } finally {
    if (page) {
      try {
        await page.close();
      } catch {}
    }
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
    if (serverHandle && serverHandle.managed) {
      serverHandle.stop();
    }
  }
}

main().catch((err) => {
  console.error('Unhandled verification error:', err);
  process.exit(1);
});
