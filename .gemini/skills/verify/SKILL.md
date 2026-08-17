---
name: verify
description: Build, serve, and drive this app in a real browser to verify canvas/section changes end-to-end. Use after changing sections, navigation, routing, or canvas behavior.
---

# Verify — keto-canvas-adventures

React SPA on an infinite canvas. Verification is executed via the official repository E2E test runner (`tests/e2e/` & `scripts/verify.js`). **Do not write ad-hoc scratch verification scripts** — maintain and extend the tests in `tests/e2e/suites/`.

## Running the E2E Test Suite

Run the repo-level automated E2E test runner (builds, starts preview server, launches Firefox via `puppeteer-core`, and executes all test suites):

```sh
npm run test:e2e              # Runs full E2E test suite (SSG, direct routes, 2D navigation, interactions, responsive)
npm test                      # Alias for npm run test:e2e
node scripts/verify.js --no-build # Skip rebuild if dist/ is already fresh
node scripts/verify.js --suite=Navigation # Run a specific suite (SSG, Routes, Navigation, Interactions, Responsive)
node scripts/verify.js --filter="Work"     # Filter specific test names
```

Browser: **puppeteer-core + system Firefox** (headless by default; pass `--headed` to run with GUI).

## Test Suite Organization (`tests/e2e/suites/`)

When adding or modifying features, **update the corresponding suite in `tests/e2e/suites/`**:

1. **`ssg.test.js`**: Validates static files in `dist/`, sitemap.xml, robots.txt, and route-scoped pre-rendered markup.
2. **`routes.test.js`**: Dynamic deep-link loading of all canonical sections in `src/data/sections.ts`, travel stories, and blog posts.
3. **`navigation.test.js`**: Discrete integer coordinate navigation (`ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`, `Home` breadcrumb).
4. **`interactions.test.js`**: Placeholder proximity/click expansion, contact email obfuscation and click-to-reveal, article reader table & code rendering, travel story detail modal.
5. **`responsive.test.js`**: Desktop (1920x1080), Laptop (1366x768), Tablet (768x1024), and Mobile (375x812).

## Invariant: Extend `tests/e2e/` Instead of Scratch Scripts

Always maintain and add new assertions directly into `tests/e2e/suites/`. Do not create session-by-session scratch scripts (`scratch/verify_*.js`). All verifications must be committed to the repository test suite.

## Section Registry — Single Source of Truth

Sections are defined once in `src/data/sections.ts` (`SECTIONS` array).
- Routes, breadcrumb names, path validation, SEO tags, and SSG prerender routes are all derived automatically from `src/data/sections.ts`.
- When adding a section, define its metadata & grid coordinate in `src/data/sections.ts` and add its component to `src/components/canvas/SectionRenderer.tsx`.

