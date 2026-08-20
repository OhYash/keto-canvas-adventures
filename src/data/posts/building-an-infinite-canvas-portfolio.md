---
title: "Building an Infinite 2D Canvas Portfolio with SSG"
date: "2026-08-12"
readTime: "6 min read"
summary: "Why 2D spatial navigation creates a tactile digital brain experience, and how it evolved into a hardware-accelerated, static pre-rendered portfolio platform."
tags: ["React", "TypeScript", "UI Architecture", "Canvas", "SEO", "SSG"]
---

# Building an Infinite 2D Canvas Portfolio with SSG

Most portfolio websites read like digital resumes frozen in glass. You land on a hero banner, scroll past a grid of polished project cards, hit a contact form at the bottom, and leave without ever getting a feel for how the engineer actually thinks or builds.

As a backend engineer who spends most of his time thinking in distributed system topologies, database schemas, and data pipelines, that vertical linearity always felt unnaturally restrictive. Our minds don't organize thoughts in top-to-bottom lists. We think in spatial maps: interconnected clusters of core architecture, side projects, technical notes, and personal rabbit holes.

When I set out to rebuild my personal website ([ohya.sh](https://ohya.sh)), I didn't want another cookie-cutter template. I wanted a tactile "digital brain": an infinite 2D canvas where visitors could pan across coordinates, explore work history alongside side quests, and open distraction-free essays without sacrificing 60 FPS performance or search engine indexability.

I'm Yash, a senior backend engineer with 7+ years in Python and Django, having spent the last few years scaling production infra handling 30M+ monthly requests at TestGorilla. Here is the story of how a quick weekend spatial experiment evolved over months of iteration and real user feedback into a production static-site-generated platform.

---

## 1. Establishing the Grid: The Spatial Mental Model

The earliest prototype was just a chaotic coordinate plane where I dropped components wherever there was whitespace. Within ten minutes of testing, it was clear that an unbounded 2D space without rules feels disorienting rather than empowering.

To give the canvas structure, I set up a strict coordinate grid around origin `(0, 0)` and enforced an axis invariant:

> **Professional content extends horizontally; personal content extends vertically.**

```
                     (0, -2000) [Ataco]
                            │
                     (0, -1000) [Keto]
                            │
(-2000, 0) [Travel] ── (-1000, 0) [Personal] ── (0, 0) [Home] ── (1000, 0) [Work] ── (2000, 0) [Writing]
                            │
                     (0, 1000) [Hobbies]
                            │
                     (0, 2000) [Projects]
```

- **Home `(0, 0)`**: The central compass hub.
- **Work `(1000, 0)` & Writing `(2000, 0)`**: Professional experience and long-form essays (East).
- **Personal `(-1000, 0)` & Travel Stories `(-2000, 0)`**: Personal background and travel logs (West).
- **Keto `(0, -1000)` & Ataco `(0, -2000)`**: Household updates and pet logs (North).
- **Hobbies `(0, 1000)` & Projects `(0, 2000)`**: Active builds like *Finance Compass* (South).

By keeping primary sections at 1000px offsets and subsection deep dives at 2000px behind their parents, the map instantly felt intuitive to navigate.

---

## 2. Phase 1: Performance Optimization & Mobile Gesture Safety

When friends first opened the site on high-refresh-rate monitors, using standard CSS `top` or `left` state updates caused terrible jank. Updating layout properties triggers browser reflows on every frame.

To get a steady 60+ FPS during pan drags, we shifted to hardware-accelerated CSS transforms using `translate3d`:

```tsx
<div
  className="absolute will-change-transform transition-transform duration-200 ease-out"
  style={{
    transform: `translate3d(${viewportPosition.x}px, ${viewportPosition.y}px, 0)`,
    left: '50%',
    top: '50%'
  }}
>
  <SectionRenderer activeSection={currentSection} />
</div>
```

The `will-change-transform` property tells the browser to promote the canvas to its own GPU compositor layer, keeping drag frame times under 16ms.

### The Mobile Touch Conflict
The first real wall hit was mobile browser behavior. When someone opened the site on a phone and tried scrolling down a long project description card, the canvas event handlers interpreted the swipe as a pan gesture. The entire screen jerked sideways instead of scrolling the card.

We solved this by explicitly isolating touch actions based on interaction state:

```ts
// Stand down canvas panning while the user is actively scrolling inside text containers
touchAction: isPanning ? 'none' : 'pan-y'
```

If a user is inside a scrollable card container, native vertical scroll takes precedence and the canvas panning engine stands down.

---

## 3. Phase 2: Purging Boilerplate & Building a Content Engine

Early feedback on the site content was direct: "The canvas concept is neat, but the copy reads like generic AI portfolio template fluff."

They were right. The initial version had stock badges ("Always Building", "Always Curious") and generic quotes. Over the next several months, I stripped out every piece of template copy and replaced it with specific, first-person content: real production numbers from TestGorilla, actual project updates for *Finance Compass*, and personal nodes for Keto the cat and Ataco.

As part of this overhaul, I wanted a native way to write essays directly inside the repo without relying on an external CMS. We built a dynamic markdown engine leveraging Vite module discovery:

```ts
const rawPosts = import.meta.glob('./posts/*.md', { eager: true });
```

Clicking an essay node at `(2000, 0)` or visiting `/writing/building-an-infinite-canvas-portfolio` opens a distraction-free reader overlay, complete with syntax highlighting via `highlight.js`:

```ts
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
```

---

## 4. Phase 3: The Search Engine Trap (SEO & SSG Prerendering)

Building a spatial single-page application (SPA) worked great for live visitors, but search engine crawlers ran into a wall. 

When Bing Webmaster and Googlebot scanned deep links like `/work` or `/writing/building-an-infinite-canvas-portfolio`, GitHub Pages returned a generic `index.html` shell containing an empty `<div id="root"></div>`. Crawlers either indexed blank pages or flagged deep links as 404s.

We fixed this by turning the client app into a pre-rendered static platform:

### A. Dynamic Heading Semantics
Having ten section components sitting on an un-unmounted virtual canvas meant ten concurrent `<h1>` tags on the page, penalizing search engine hierarchy. We refactored `SectionRenderer` to pass an `isActive` prop so only the visible section renders an `<h1>`, while hidden background sections downgrade to `<h2>`.

### B. Real-Time Head Tags (`react-helmet-async`)
Every canvas movement dynamically updates the browser title, canonical URL, meta description, and OpenGraph social image tags.

### C. Headless SSG Build Pipeline
We wrote a post-build pre-rendering script (`scripts/prerender.js`) that runs automatically after `vite build`. It launches a headless Puppeteer browser, visits every registered route on the canvas, and saves pre-rendered static HTML files:

```bash
dist/
├── index.html                  # (0, 0) Home static HTML
├── work/index.html             # (1000, 0) Work static HTML
├── writing/index.html          # (2000, 0) Essays list static HTML
└── writing/building-an-infinite-canvas-portfolio/index.html  # Article static page
```

Now when search crawlers or social preview bots hit any URL on [ohya.sh](https://ohya.sh), they receive fully rendered static HTML with valid structured JSON-LD schemas and `200 OK` status codes.

---

## What Building This Taught Me

Treating a personal website as an evolving software project rather than a static document changes how you approach web design. Over months of tweaking canvas mechanics, fixing mobile touch bugs, purging generic copy, and configuring SSG prerendering, the site turned into a genuine reflection of how I work as an engineer.

Spatial UIs don't have to be gimmicks. When paired with hardware acceleration, clear axis invariants, and distraction-free long-form reading overlays, they offer the best of both worlds: playful discovery and high-signal readability.
