# Plan: Built-in E2E Test Suite & Consolidated Verification Runner
Created: 2026-08-17
Status: complete

## Goal
Consolidate 13+ ad-hoc scratch verification scripts into a comprehensive, robust, first-class E2E test suite and runner (`npm run test:e2e` / `scripts/verify.js`) that automatically tests SSG output, deep-linking routes from `sections.ts`, 2D canvas keyboard navigation, interactive UI components, progressive disclosure, and responsive viewports with Firefox via `puppeteer-core`.

## Approach
1. **Unified Test Harness & Runner (`tests/e2e/` & `scripts/verify.js`)**:
   - Auto-detects preview server on port 4173 or spawns a managed instance with automatic teardown on process exit.
   - Robust Firefox browser lifecycle management via `puppeteer-core` (with fallback resolution between global and local npm paths).
   - Clean test framework structure: test runner with suite grouping, assertion utilities, timing helpers, screenshot capturing on failure, and formatted terminal reporting.

2. **Consolidated Test Suites**:
   - **Static Site Generation (SSG) & Scoped HTML**: Asserts `dist/` static files for all canonical routes (`/`, `/work`, `/keto`, `/travel`, `/writing/*`, etc.), sitemap.xml validity, Schema.org JSON-LD, and route-scoped initial DOM snapshots.
   - **Canonical Route & Deep-Linking Suite**: Dynamically reads `SECTIONS` from `src/data/sections.ts`, travel stories from `src/data/travelStories.ts`, and markdown essays from `src/data/posts/` to verify direct HTTP navigation, correct page titles, meta tags, and content visibility.
   - **2D Canvas Keyboard Navigation**: Tests discrete integer grid navigation (`ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`), URL back-stack synchronization, and position derivation.
   - **Interactive UI & Progressive Disclosure**: Tests section placeholder proximity/click expansion, contact section base64 email reveal, travel story modal/reader transitions, and blog post Markdown/GFM table rendering & code syntax highlighting.
   - **Responsive Viewport Matrix**: Validates Desktop (1920x1080), Laptop (1366x768), Tablet (768x1024), and Mobile (375x812).

3. **Developer Experience & Tooling Integration**:
   - Add `"test:e2e": "node scripts/verify.js"` and `"test": "npm run test:e2e"` to `package.json`.
   - Support CLI flags: `--suite=<name>`, `--filter=<pattern>`, `--no-build`, `--headed`, `--port=<number>`.
   - Update `.gemini/skills/verify/SKILL.md` to reference the canonical test runner.
   - Update `dev/project.todo`.

## Steps
- [x] Create execution plan in `dev/plans/e2e-test-suite.md` and link in `dev/project.todo`
- [x] Build test framework utilities (`tests/e2e/harness.js`)
- [x] Implement modular test suites (`routes.test.js`, `navigation.test.js`, `interactions.test.js`, `ssg.test.js`, `responsive.test.js`)
- [x] Create primary runner entrypoint `scripts/verify.js`
- [x] Update `package.json` with `test:e2e` and `test` scripts
- [x] Run full test suite and verify 100% pass rate (35/35 tests passing)
- [x] Update `.gemini/skills/verify/SKILL.md` documentation
- [x] Update `dev/project.todo` marking task DONE

## Files Affected
- `dev/plans/e2e-test-suite.md`
- `tests/e2e/harness.js`
- `tests/e2e/index.js`
- `tests/e2e/suites/ssg.test.js`
- `tests/e2e/suites/routes.test.js`
- `tests/e2e/suites/navigation.test.js`
- `tests/e2e/suites/interactions.test.js`
- `tests/e2e/suites/responsive.test.js`
- `scripts/verify.js`
- `package.json`
- `.gemini/skills/verify/SKILL.md`
- `dev/project.todo`

## Outcome / Notes
- Built a 35-test unified E2E test runner executing in ~80s with 100% pass rate.
- Replaced 13+ ad-hoc scratch scripts with standardized CLI: `npm run test:e2e` / `npm test`.
- All canonical section routes, deep links, keyboard movements, SSG files, progressive disclosure states, and responsive viewports are now continuously testable with one command.
