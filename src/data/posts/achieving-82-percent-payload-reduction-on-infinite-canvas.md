---
title: "Achieving an 82% Page Payload Reduction on an Infinite Canvas Portfolio"
date: "2026-08-13"
readTime: "5 min read"
summary: "How I diagnosed and eliminated the 'all-sections-in-one-DOM' trap on an infinite 2D canvas, slashing pre-rendered page payload by 82% (173KB to 32KB) while preserving hardware-accelerated 60 FPS panning."
tags: ["React", "SSG", "Performance", "SEO", "Vite", "Canvas"]
---

# Achieving an 82% Page Payload Reduction on an Infinite Canvas Portfolio

Building a spatial web application on an infinite 2D canvas creates a tactile, memorable experience for visitors. But when you combine a spatial 2D coordinate plane with Static Site Generation (SSG) for search engine indexability, you quickly run into architectural edge cases that standard web applications never face.

Recently, while auditing Bing Webmaster indexation logs and Googlebot DOM renders for [ohya.sh](https://ohya.sh), I uncovered an architectural flaw: **every pre-rendered page route on the site was downloading a 173 KB static HTML payload containing the complete markup for all 11 canvas sections at once.**

Here is how I isolated the "all-sections-in-one-DOM" trap, fixed a subtle responsive layout math mismatch, and engineered an **82% reduction in static HTML page size** (from 173 KB down to 32 KB) without sacrificing a single frame of client-side canvas UX.

---

## 1. The Discovery: The "All-Sections-in-One-DOM" Trap

My portfolio is pre-rendered at build time using native Vite SSR (`renderToString` + `react-helmet-async`) inside a headless post-build pipeline (`scripts/prerender.js`). The script visits every registered route (`/work`, `/personal`, `/keto`, `/hobbies`, etc.) and outputs pre-rendered static HTML files (`dist/work/index.html`, `dist/keto/index.html`) so search crawlers receive immediate `200 OK` responses.

However, when Bing Webmaster fetched `https://ohya.sh/work`, the body parsed by the crawler looked like this:

```html
<div id="root">
  <!-- Breadcrumb: Home > Work -->
  <!-- Star Background -->
  <!-- Home Section Card -->
  <!-- Personal Section Card -->
  <!-- Keto Section Card -->
  <!-- Hobbies Section Card -->
  <!-- Work Section Card -->
  <!-- Projects Section Card -->
  <!-- Travel Stories Card -->
  <!-- Ataco Card -->
  <!-- Writing Section Card -->
</div>
```

### Why was this happening?
In my spatial renderer (`SectionRenderer.tsx`), the component looped through `allSections.map(...)` and outputted the JSX tree of every section onto the 2D coordinate plane.

Because `SectionRenderer` rendered all section cards simultaneously, Vite SSR serialized **all 11 sections** into every single static route HTML file.
- `dist/work/index.html` contained the entire Work history *plus* Keto the cat, travel stories, hobbies, and personal stats.
- `dist/keto/index.html` contained the exact same 173 KB payload.

Search engines crawling `/work` saw a sea of duplicate, diluted content shared across every URL on the domain.

---

## 2. The Secondary Bug: Direct URL Viewport Misalignment

While inspecting the crawler output, I noticed a subtle visual bug on direct page loads: when opening a direct link like `https://ohya.sh/projects` or `https://ohya.sh/travel` in a fresh browser context, the section card rendered **off-center by 400 pixels**.

### The Math Mismatch
The canvas relies on dynamic breakpoint math (`getResponsiveSpacing()`), setting section offsets to `800px` on 1080p displays. Under this responsive math:
- `/projects` sits at `y = +1600px` (`800 * 2`).
- `/travel` sits at `x = -1600px`.

However, `InfiniteCanvas.tsx` contained a legacy fallback helper (`getInitialPosition`) that assumed a fixed `1000px` grid interval:
- It calculated `/projects` at `y = -2000px`.

When a visitor loaded `/projects` directly:
1. The DOM element for `projects` was placed at `y = +1600px` by `useSectionManagement`.
2. The initial viewport transform was set to `y = -2000px` by `getInitialPosition`.
3. The route sync `useEffect` skipped running because `sectionFromUrl === currentSection`.
4. Result: `1600 - 2000 = -400px`. The card landed 400px off-center vertically!

---

## 3. The Architecture: Scoped SSR + Client Canvas Hydration

To resolve both defects permanently, I decoupled **server-side pre-rendering** from **client-side canvas hydration**.

### A. Scoped SSR Pre-Rendering
During server-side pre-rendering (`isClientMounted === false`), `SectionRenderer` checks the active route and renders **ONLY the section belonging to that URL**:

```tsx
// In SectionRenderer.tsx
const [isClientMounted, setIsClientMounted] = React.useState(false);

React.useEffect(() => {
  setIsClientMounted(true);
}, []);

// During SSR, render ONLY the section matching the current URL path.
// On client hydration, render all sections on the 2D grid.
const sectionsToRender = isClientMounted
  ? allSections
  : allSections.filter((section) => section.id === currentSection);
```

When `scripts/prerender.js` pre-renders `/work`, `dist/work/index.html` now contains **strictly the Work section HTML** alongside its breadcrumbs, meta tags, and JSON-LD schema. No Keto, no travel stories, no bloated DOM nodes.

### B. Client Canvas Hydration
When a visitor opens `https://ohya.sh/work`:
1. The browser parses `dist/work/index.html` and paints the Work card instantly (0ms layout shift, minimal FCP).
2. React mounts on the client and `useEffect` sets `isClientMounted = true`.
3. React mounts the adjacent section cards onto the 2D spatial grid.
4. The user can drag, pan, or use arrow keys across the 2D canvas with 60 FPS performance without any delay or pop-in.

### C. Dynamic Position Synchronization
I purged the hardcoded `getInitialPosition` function from `InfiniteCanvas.tsx`. Initial viewport coordinates are now derived dynamically from `useSectionManagement`'s `allSections` array, ensuring `viewportPosition` matches `responsiveSpacing` on frame zero of direct URL hits.

---

## 4. The Results

| Metric | Before Fix | After Fix | Improvement |
| :--- | :--- | :--- | :--- |
| **`/work` Static HTML Size** | 173 KB | **32 KB** | **82.1% Reduction** |
| **`/keto` Static HTML Size** | 173 KB | **25 KB** | **85.5% Reduction** |
| **Crawler Content Scope** | 11 sections merged | **1 section (100% scoped)** | **Clean indexing** |
| **Direct URL Alignment** | 400px offset | **0px (100% centered)** | **Pixel-perfect** |
| **Client Canvas FPS** | 60 FPS | **60 FPS** | **Zero UX loss** |

---

## Takeaways

1. **Spatial UIs don't have to sacrifice web performance**: An infinite 2D canvas can feel open and exploratory on the client while serving lean, focused HTML to search engines.
2. **Beware of SSR DOM inheritance**: When building single-page apps with global layouts, ensure server-rendered static markup reflects the active route rather than dumping full application state.
3. **Single source of truth for responsive math**: Never duplicate coordinate math between initialization hooks and rendering logic. Deriving initial positions from the primary layout hook prevents alignment bugs across different screen resolutions.
