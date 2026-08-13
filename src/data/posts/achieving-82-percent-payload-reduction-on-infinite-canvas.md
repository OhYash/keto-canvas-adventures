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

## 3. The Evolution: From Scoped SSR to Idle-Deferred Proximity Hydration

Solving this for both static crawlers and JavaScript-executing search engines required a multi-stage architecture.

### Stage 1: Scoped SSG Pre-Rendering
During server-side pre-rendering (`isClientMounted === false`), `SectionRenderer` checks the active route and renders **ONLY the section belonging to that URL**:

```tsx
// During SSR, render ONLY the section matching the current URL path.
const sectionsToRender = isClientMounted
  ? allSections
  : allSections.filter((section) => section.id === currentSection);
```

When `scripts/prerender.js` builds `/work`, `dist/work/index.html` contains strictly the Work section HTML. No Keto, no travel stories, no bloated DOM nodes.

### Stage 2: The JS-Rendering Crawler Leak (Bingbot & Googlebot WRS)
Shortly after shipping Stage 1, I audited Bing Webmaster's live URL inspection output for `https://ohya.sh/work` and discovered a second nuance: **modern search engines run client-side JavaScript via headless Web Rendering Services (WRS).**

When Bingbot loaded `dist/work/index.html`, React hydrated on the client, setting `isClientMounted = true`. React immediately mounted all 11 sections into the live DOM tree. Bingbot waited for JS execution to settle, captured the rendered DOM snapshot, and still logged duplicate content from all other sections!

### Stage 3: Idle-Deferred Proximity Hydration (`shouldExpandProximity`)
To prevent JS-executing crawlers from picking up background sections while ensuring zero latency for human visitors, I introduced **Idle-Deferred Proximity Hydration**:

```tsx
// In SectionRenderer.tsx
const [isClientMounted, setIsClientMounted] = React.useState(false);
const [isIdleHydrated, setIsIdleHydrated] = React.useState(false);

React.useEffect(() => {
  setIsClientMounted(true);

  // Defer background section hydration until after idle timer (1.5s) or user interaction.
  // Search crawlers (Bingbot / Googlebot WRS) extract page DOM within ~1s without triggering idle timers.
  const timer = setTimeout(() => {
    setIsIdleHydrated(true);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

// Before hydration settles / before interaction/idle delay: render ONLY the active route section.
// After interaction or idle delay: expand proximity rendering to adjacent 2D grid coordinates.
const shouldExpandProximity = isClientMounted && (hasInteracted || isIdleHydrated);

const sectionsToRender = React.useMemo(() => {
  if (!shouldExpandProximity) {
    return allSections.filter((section) => section.id === currentSection);
  }

  const baseThreshold = currentSection === 'home' || hasInteracted ? 1450 : 1050;
  const threshold = proximityThreshold ?? baseThreshold;

  return allSections.filter((section) => {
    if (section.id === currentSection) return true;

    // Calculate 2D distance from current viewport center to section position
    const dx = section.position.x + viewportPosition.x;
    const dy = section.position.y + viewportPosition.y;
    return Math.sqrt(dx * dx + dy * dy) <= threshold;
  });
}, [shouldExpandProximity, allSections, currentSection, hasInteracted, viewportPosition.x, viewportPosition.y]);
```

### How the Final Architecture Operates:

1. **Static SSG HTML (0ms)**: Pre-renders 1 route section per HTML file (~30 KB).
2. **Crawler Snapshot Window (0 – 1.5s)**: Crawlers run JS, but `shouldExpandProximity` remains `false`. Crawlers capture a 100% route-scoped DOM snapshot.
3. **Human Experience (1.5s or on Drag)**: After 1.5s or as soon as the user drags the canvas, `shouldExpandProximity` becomes `true`. Adjacent 2D grid sections mount quietly, keeping canvas panning hardware-accelerated at 60 FPS.

---

## 4. The Results

| Metric | Before Fix | After Fix | Improvement |
| :--- | :--- | :--- | :--- |
| **`/work` Static HTML Size** | 173 KB | **32 KB** | **82.1% Reduction** |
| **`/keto` Static HTML Size** | 173 KB | **25 KB** | **85.5% Reduction** |
| **JS Crawler DOM Output** | 11 sections merged | **1 section (100% scoped)** | **Zero content dilution** |
| **Direct URL Alignment** | 400px offset | **0px (100% centered)** | **Pixel-perfect** |
| **Client Canvas FPS** | 60 FPS | **60 FPS** | **Zero UX loss** |

---

## Takeaways

1. **Spatial UIs don't have to sacrifice web performance**: An infinite 2D canvas can feel open and exploratory on the client while serving lean, focused HTML to search engines.
2. **Account for JS-executing search engines**: SSG alone isn't enough if client hydration immediately dumps full app state into the DOM. Deferring non-active nodes behind idle callbacks/interaction keeps JS crawler snapshots clean.
3. **Single source of truth for responsive math**: Never duplicate coordinate math between initialization hooks and rendering logic. Deriving initial positions from the primary layout hook prevents alignment bugs across different screen resolutions.
