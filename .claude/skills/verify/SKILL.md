---
name: verify
description: Build, serve, and drive this app in a real browser to verify canvas/section changes end-to-end. Use after changing sections, navigation, routing, or canvas behavior.
---

# Verify — keto-canvas-adventures

React SPA on an infinite canvas. Verification = build, serve dist, drive with a real
browser. No test suite exists; do not "verify" with tsc/lint alone.

## Handle

```sh
npm run build                 # or build:dev
npm run preview &             # serves dist at http://localhost:4173
```

Browser: **puppeteer-core + system Firefox** (no Playwright/Chromium downloads —
owner preference). puppeteer-core is installed globally on this machine; full recipe
in ~/.claude/CLAUDE.md. Short form:

```js
import { createRequire } from 'node:module';
const puppeteer = createRequire(`${process.env.HOME}/.npm-global/lib/node_modules/`)('puppeteer-core');
const browser = await puppeteer.launch({
  browser: 'firefox', executablePath: '/usr/bin/firefox', headless: true,
});
```

## Drive

- Sections navigate by arrow keys (position-derived) and by clicking home-page cards.
  After any navigation, wait ~1.5s for the pan animation before asserting.
- Assert content via `document.body.innerText`; screenshot for evidence.
- Deep-link check matters: every section id is also a URL path — visit
  `http://localhost:4173/<sectionId>` directly and confirm no 404.

## Gotcha — adding a section takes FOUR registration points

1. `useSectionManagement.ts` — sections/allSections array (canvas + arrow keys)
2. `src/App.tsx` — explicit `<Route path="/<id>">` above the `*` catch-all,
   else navigation lands on the 404 page
3. `InfiniteCanvas.tsx` — hardcoded `validSections` array in `getSectionFromPath`
4. `NavigationBreadcrumb.tsx` — `sectionNames` display-name map (falls back to raw id)

Missing #2/#3 fails silently in tsc/lint/build — only runtime driving catches it.
