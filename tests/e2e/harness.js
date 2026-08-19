import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const projectRoot = path.resolve(__dirname, '..', '..');

// ==========================================
// Browser & Puppeteer Resolution
// ==========================================

export async function getPuppeteer() {
  try {
    const mod = await import('puppeteer-core');
    return mod.default || mod;
  } catch {
    const { createRequire } = await import('node:module');
    const globalPath = `${process.env.HOME}/.npm-global/lib/node_modules/`;
    const globalReq = createRequire(globalPath);
    return globalReq('puppeteer-core');
  }
}

export async function launchBrowser(options = {}) {
  const puppeteer = await getPuppeteer();
  const browserType = options.browser || process.env.BROWSER || 'firefox';
  const isHeaded = options.headed || process.env.HEADED === 'true' || process.argv.includes('--headed');

  let executablePath = options.executablePath;
  if (!executablePath) {
    if (browserType === 'firefox') {
      executablePath = fs.existsSync('/usr/bin/firefox') ? '/usr/bin/firefox' : 'firefox';
    } else if (browserType === 'vivaldi') {
      executablePath = fs.existsSync('/usr/bin/vivaldi') ? '/usr/bin/vivaldi' : 'vivaldi';
    } else {
      executablePath = fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : '/usr/bin/chromium';
    }
  }

  const launchArgs = {
    headless: !isHeaded,
    ...options,
  };

  if (browserType === 'firefox') {
    launchArgs.browser = 'firefox';
    launchArgs.executablePath = executablePath;
  } else {
    launchArgs.executablePath = executablePath;
    launchArgs.args = ['--no-sandbox', '--disable-setuid-sandbox', ...(options.args || [])];
  }

  return await puppeteer.launch(launchArgs);
}

// ==========================================
// Preview Server Lifecycle Management
// ==========================================

function isPortActive(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const req = http.request({ host, port, path: '/', method: 'HEAD', timeout: 800 }, (res) => {
      resolve(true);
      res.destroy();
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

let managedServerProcess = null;

export async function ensurePreviewServer(port = 4173) {
  const active = await isPortActive(port);
  if (active) {
    return {
      baseUrl: `http://localhost:${port}`,
      managed: false,
      stop: () => {},
    };
  }

  // Check that dist/ exists
  const distPath = path.join(projectRoot, 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('dist/ directory not found. Please run "npm run build" before running E2E tests.');
  }

  const serverProc = spawn('npx', ['vite', 'preview', '--port', String(port), '--host', '127.0.0.1'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });

  managedServerProcess = serverProc;

  const cleanup = () => {
    if (managedServerProcess) {
      try {
        managedServerProcess.kill('SIGTERM');
      } catch {}
      managedServerProcess = null;
    }
  };

  process.on('exit', cleanup);
  process.on('SIGINT', () => {
    cleanup();
    process.exit(130);
  });
  process.on('SIGTERM', () => {
    cleanup();
    process.exit(143);
  });

  // Poll until active
  const startTime = Date.now();
  while (Date.now() - startTime < 10000) {
    await new Promise((r) => setTimeout(r, 250));
    if (await isPortActive(port)) {
      return {
        baseUrl: `http://localhost:${port}`,
        managed: true,
        stop: cleanup,
      };
    }
  }

  cleanup();
  throw new Error(`Preview server failed to start on port ${port} within 10 seconds.`);
}

export function stopManagedServer() {
  if (managedServerProcess) {
    try {
      managedServerProcess.kill('SIGTERM');
    } catch {}
    managedServerProcess = null;
  }
}

// ==========================================
// Assertions & Matchers
// ==========================================

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function expect(actual) {
  const isNot = false;

  const matchers = (not = false) => ({
    toBe(expected) {
      const pass = Object.is(actual, expected);
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected value not to be ${JSON.stringify(expected)}`
            : `Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`,
          actual,
          expected
        );
      }
    },
    toEqual(expected) {
      const actualStr = JSON.stringify(actual);
      const expectedStr = JSON.stringify(expected);
      const pass = actualStr === expectedStr;
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected objects not to equal: ${expectedStr}`
            : `Expected ${actualStr} to deeply equal ${expectedStr}`,
          actual,
          expected
        );
      }
    },
    toContain(expected) {
      let pass = false;
      if (typeof actual === 'string' || Array.isArray(actual)) {
        pass = actual.includes(expected);
      } else if (actual && typeof actual === 'object') {
        pass = expected in actual;
      }
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected target not to contain ${JSON.stringify(expected)}`
            : `Expected target to contain ${JSON.stringify(expected)}`,
          actual,
          expected
        );
      }
    },
    toBeTruthy() {
      const pass = Boolean(actual);
      if (not ? pass : !pass) {
        throw new AssertionError(
          not ? `Expected value to be falsy, got truthy: ${actual}` : `Expected value to be truthy, got: ${actual}`,
          actual,
          true
        );
      }
    },
    toBeFalsy() {
      const pass = !Boolean(actual);
      if (not ? pass : !pass) {
        throw new AssertionError(
          not ? `Expected value to be truthy, got falsy: ${actual}` : `Expected value to be falsy, got: ${actual}`,
          actual,
          false
        );
      }
    },
    toBeGreaterThan(expected) {
      const pass = actual > expected;
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected ${actual} not to be greater than ${expected}`
            : `Expected ${actual} to be greater than ${expected}`,
          actual,
          expected
        );
      }
    },
    toBeGreaterThanOrEqual(expected) {
      const pass = actual >= expected;
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected ${actual} not to be greater than or equal to ${expected}`
            : `Expected ${actual} to be greater than or equal to ${expected}`,
          actual,
          expected
        );
      }
    },
    toBeLessThan(expected) {
      const pass = actual < expected;
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected ${actual} not to be less than ${expected}`
            : `Expected ${actual} to be less than ${expected}`,
          actual,
          expected
        );
      }
    },
    toBeLessThanOrEqual(expected) {
      const pass = actual <= expected;
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected ${actual} not to be less than or equal to ${expected}`
            : `Expected ${actual} to be less than or equal to ${expected}`,
          actual,
          expected
        );
      }
    },
    toMatch(regex) {
      const pass = regex.test(String(actual));
      if (not ? pass : !pass) {
        throw new AssertionError(
          not
            ? `Expected "${actual}" not to match regex ${regex}`
            : `Expected "${actual}" to match regex ${regex}`,
          actual,
          regex
        );
      }
    },
  });

  const baseMatchers = matchers(false);
  baseMatchers.not = matchers(true);
  return baseMatchers;
}

// ==========================================
// Browser Interaction Helpers
// ==========================================

export async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForCanvasAnimation(page, ms = 1400) {
  await wait(ms);
}

export async function getBodyText(page) {
  return await page.evaluate(() => document.body.innerText);
}

export async function getBodyHtml(page) {
  return await page.evaluate(() => document.body.innerHTML);
}

export async function getHeadingTexts(page, level = 'h1') {
  return await page.evaluate((lvl) => {
    return Array.from(document.querySelectorAll(lvl)).map((el) => el.textContent?.trim() || '');
  }, level);
}

export async function pressKey(page, key, settleMs = 1400) {
  await page.keyboard.press(key);
  await wait(settleMs);
}

// ==========================================
// Test Suite Registry & Runner
// ==========================================

export const testSuites = [];
let currentSuite = null;

export function describe(name, fn) {
  const suite = {
    name,
    tests: [],
    beforeAllHooks: [],
    afterAllHooks: [],
    beforeEachHooks: [],
    afterEachHooks: [],
  };
  testSuites.push(suite);

  const prevSuite = currentSuite;
  currentSuite = suite;
  fn();
  currentSuite = prevSuite;
}

export function test(name, fn) {
  if (!currentSuite) {
    describe('Default Suite', () => {
      test(name, fn);
    });
    return;
  }
  currentSuite.tests.push({ name, fn });
}

export const it = test;

export function beforeAll(fn) {
  if (currentSuite) currentSuite.beforeAllHooks.push(fn);
}

export function afterAll(fn) {
  if (currentSuite) currentSuite.afterAllHooks.push(fn);
}

export function beforeEach(fn) {
  if (currentSuite) currentSuite.beforeEachHooks.push(fn);
}

export function afterEach(fn) {
  if (currentSuite) currentSuite.afterEachHooks.push(fn);
}

// ==========================================
// Test Execution Engine
// ==========================================

export async function runAllTests(options = {}) {
  const filterPattern = options.filter || options.grep || null;
  const suiteFilter = options.suite || null;

  const totalResults = {
    suites: 0,
    total: 0,
    passed: 0,
    failed: 0,
    durationMs: 0,
    failures: [],
  };

  const globalStart = Date.now();

  console.log('\n=============================================================');
  console.log(' 🧪  OhYa.sh E2E Test Suite Runner');
  console.log('=============================================================\n');

  for (const suite of testSuites) {
    if (suiteFilter && !suite.name.toLowerCase().includes(suiteFilter.toLowerCase())) {
      continue;
    }

    const matchingTests = suite.tests.filter((t) => {
      if (!filterPattern) return true;
      return `${suite.name} ${t.name}`.toLowerCase().includes(filterPattern.toLowerCase());
    });

    if (matchingTests.length === 0) continue;

    totalResults.suites++;
    console.log(`\n📦 Suite: \x1b[1m\x1b[36m${suite.name}\x1b[0m`);

    const suiteContext = {};

    // Run beforeAll hooks
    for (const hook of suite.beforeAllHooks) {
      await hook(suiteContext);
    }

    for (const t of matchingTests) {
      totalResults.total++;
      const testStart = Date.now();
      let testPassed = false;
      let testError = null;

      // Run beforeEach hooks
      for (const hook of suite.beforeEachHooks) {
        await hook(suiteContext);
      }

      try {
        await t.fn(suiteContext);
        testPassed = true;
      } catch (err) {
        testPassed = false;
        testError = err;
      }

      // Run afterEach hooks
      for (const hook of suite.afterEachHooks) {
        try {
          await hook(suiteContext);
        } catch (err) {
          console.error(`  Warning: afterEach hook failed: ${err.message}`);
        }
      }

      const testDuration = Date.now() - testStart;

      if (testPassed) {
        totalResults.passed++;
        console.log(`  \x1b[32m✓\x1b[0m \x1b[90m[${testDuration}ms]\x1b[0m ${t.name}`);
      } else {
        totalResults.failed++;
        console.log(`  \x1b[31m✗\x1b[0m \x1b[90m[${testDuration}ms]\x1b[0m \x1b[31m${t.name}\x1b[0m`);
        console.log(`    \x1b[31mError: ${testError?.message || testError}\x1b[0m`);
        if (testError?.stack) {
          const cleanStack = testError.stack
            .split('\n')
            .slice(1, 4)
            .map((line) => `      \x1b[90m${line.trim()}\x1b[0m`)
            .join('\n');
          console.log(cleanStack);
        }
        totalResults.failures.push({
          suite: suite.name,
          test: t.name,
          error: testError,
        });
      }
    }

    // Run afterAll hooks
    for (const hook of suite.afterAllHooks) {
      try {
        await hook(suiteContext);
      } catch (err) {
        console.error(`  Warning: afterAll hook failed: ${err.message}`);
      }
    }
  }

  totalResults.durationMs = Date.now() - globalStart;

  console.log('\n-------------------------------------------------------------');
  console.log(' 📊 Test Summary:');
  console.log(`    Suites:   ${totalResults.suites}`);
  console.log(`    Total:    ${totalResults.total}`);
  console.log(`    Passed:   \x1b[32m${totalResults.passed}\x1b[0m`);
  console.log(`    Failed:   ${totalResults.failed > 0 ? `\x1b[31m${totalResults.failed}\x1b[0m` : '0'}`);
  console.log(`    Duration: ${(totalResults.durationMs / 1000).toFixed(2)}s`);
  console.log('-------------------------------------------------------------\n');

  if (totalResults.failed > 0) {
    console.log('\x1b[31m❌ E2E Tests Failed!\x1b[0m\n');
    return false;
  } else {
    console.log('\x1b[32m🎉 All E2E Tests Passed Successfully!\x1b[0m\n');
    return true;
  }
}
