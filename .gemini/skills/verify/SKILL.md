---
name: verify
description: Build, serve, and drive this app in a real browser to verify canvas/section changes end-to-end. Use after changing sections, navigation, routing, or canvas behavior.
---

# Verify — keto-canvas-adventures

React SPA on an infinite canvas. Verification = build, serve dist, drive with a real browser. No test suite exists; do not "verify" with tsc/lint alone.

## Build & Serve

```sh
npm run build                 # or build:dev
npm run preview &             # serves dist at http://localhost:4173
```

Browser: **puppeteer-core + system Firefox** (no Playwright/Chromium downloads — owner preference). puppeteer-core is installed globally on this machine; short recipe:

```js
import { createRequire } from 'node:module';
const puppeteer = createRequire(`${process.env.HOME}/.npm-global/lib/node_modules/`)('puppeteer-core');
const browser = await puppeteer.launch({
  browser: 'firefox', executablePath: '/usr/bin/firefox', headless: true,
});
```

## Drive & Validate

- Sections navigate by arrow keys (position-derived) and by clicking home-page cards. After any navigation, wait ~1.5s for the pan animation before asserting.
- Assert content via `document.body.innerText`; screenshot for evidence.
- Deep-link check matters: every section id is also a URL path — visit `http://localhost:4173/<sectionId>` directly and confirm no 404.

## Section Registry — Single Source of Truth

Sections are defined once in `src/data/sections.ts` (`SECTIONS` array).
- Routes, breadcrumb names, path validation, SEO tags, and SSG prerender routes are all derived automatically from `src/data/sections.ts`.
- When adding a section, define its metadata & grid coordinate in `src/data/sections.ts` and add its component to `src/components/canvas/SectionRenderer.tsx`.

