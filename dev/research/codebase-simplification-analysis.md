# Codebase Simplification & Architecture Analysis

**Date:** 2026-08-17  
**Focus:** Code structure, navigation architecture, state synchronization, component hierarchy, and dependency ballast (excluding content/data review).

---

## Executive Summary

The application is an interactive 2D infinite-canvas portfolio built with React 18, TypeScript, Tailwind CSS, and Vite. While the user-facing spatial experience is smooth and performant, the codebase carries architectural fragmentation, copy-pasted boilerplate, starter-template residue, and mathematical over-engineering.

This analysis identifies six core areas where the codebase is unnecessarily complicated and outlines concrete steps to streamline it without altering any visual presentation or user-facing behavior.

---

## Key Areas of Over-Complication

### 1. Section Registry: The 6-Point Synchronization Chore

In `GEMINI.md`, the codebase documents an invariant requiring 4 registration points when adding a section. In reality, adding or altering a section requires touching **6 separate files**:

1. **Metadata Definition:** `SECTION_METAS` in [`src/hooks/useSectionManagement.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/hooks/useSectionManagement.ts) (ID, title, subtitle, grid coordinates, icon, gradient, parent, direction).
2. **React Router Tree:** [`src/AppRoutes.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/AppRoutes.tsx) (11 identical `<Route path="/<id>" element={<Index />} />` entries).
3. **Canvas Path Validation:** `validSections` array in `getSectionFromPath` inside [`src/components/InfiniteCanvas.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/InfiniteCanvas.tsx).
4. **Breadcrumb Display Map:** `sectionNames` dictionary in [`src/components/NavigationBreadcrumb.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/NavigationBreadcrumb.tsx).
5. **SEO & Head Metadata:** `SECTION_CONFIGS` dictionary in [`src/components/SEO.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/SEO.tsx) (duplicate titles, descriptions, and breadcrumbs).
6. **SSG Prerender & Sitemap Lists:** Hardcoded `routes` and `routeConfigs` objects in [`scripts/prerender.js`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/scripts/prerender.js).

#### Why this is over-complicated:
- `SECTION_METAS` already defines the canonical identity and metadata of each section.
- `AppRoutes.tsx` needlessly enumerates routes that all render the exact same `<Index />` component.
- Display names and path validation can be derived directly from the section registry.

---

### 2. Navigation & Deep-Linking Asymmetries

#### A. The Ghost Route: `/travel/:storyId`
- In [`src/AppRoutes.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/AppRoutes.tsx), `<Route path="/travel/:storyId" element={<Index />} />` is registered.
- However, [`src/components/sections/TravelStoriesSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/TravelStoriesSection.tsx) stores the active story in local component state (`useState<TravelStory | null>(null)`).
- It never reads `:storyId` from the URL or updates the URL when a user clicks a story. Direct navigation to `/travel/japan-2023` fails to open the story.
- In contrast, `/writing/:slug` is read globally by [`src/components/InfiniteCanvas.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/InfiniteCanvas.tsx) to mount [`ArticleReaderView`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/blog/ArticleReaderView.tsx).

#### B. Browser History Stack Pollution on Canvas Drag
In [`src/components/InfiniteCanvas.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/InfiniteCanvas.tsx):
```ts
const newSection = getCurrentSectionFromPosition(newPosition);
if (newSection !== currentSection) {
  updateCurrentSection(newSection, 'mouse');
  const newPath = getPathFromSection(newSection);
  if (location.pathname !== newPath) {
    navigate(newPath, { replace: false }); // Pushes new history entry on every boundary crossed
  }
}
```
Dragging across 3 cards creates 3 intermediate history entries. Clicking browser "Back" forces the user to replay all drag coordinates before returning to their previous site.

#### C. Unused `useParams()` Invocation
[`src/components/InfiniteCanvas.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/InfiniteCanvas.tsx#L30) executes `const params = useParams();` but never reads or passes `params`.

---

### 3. Coordinate Math: Euclidean Trigonometry on a Discrete Grid

The portfolio canvas is a static 2D integer grid:
- `Home`: `(0, 0)`
- `Work`: `(1, 0)` | `Writing`: `(2, 0)`
- `Personal`: `(-1, 0)` | `Travel`: `(-2, 0)`
- `Keto`: `(0, -1)` | `Ataco`: `(0, -2)`
- `Hobbies`: `(0, 1)` | `Projects`: `(0, 2)`
- `Now`: `(1, 1)` | `Contact`: `(-1, 1)`

#### Continuous Geometry for Discrete Neighbors
[`src/hooks/useGridNavigation.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/hooks/useGridNavigation.ts) computes floating-point delta coordinates, calculates geometric Euclidean distances (`Math.sqrt(dx*dx + dy*dy)`), and runs angle checks (`Math.abs(deltaY) <= Math.abs(deltaX)`):
```ts
case 'right':
  isInDirection = deltaX > 0 && Math.abs(deltaY) <= Math.abs(deltaX);
  distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  break;
```
Because grid positions are discrete integer coordinates, finding the neighbor to the right of `(0, 0)` is simply finding the section with `col > current.col && row === current.row`. Continuous trigonometry is unnecessary.

#### Viewport Offset Drift on Window Resize
In [`src/hooks/useSectionManagement.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/hooks/useSectionManagement.ts), `spacing` recalculates on `window.innerWidth` changes, updating all section pixel positions. However, [`src/hooks/useViewport.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/hooks/useViewport.ts) stores `viewportPosition` as static coordinates. Resizing the window or rotating a tablet causes the canvas to drift off-center.

---

### 4. Component Hierarchy & Repeated Card Shells

#### A. 6 Levels of Container Wrapping
The app nests 6 container layers to render a single canvas view:
`main.tsx` → `App.tsx` → `AppShell.tsx` → `AppRoutes.tsx` → `Index.tsx` → `InfiniteCanvas.tsx`.
`Index.tsx` is an empty passthrough, and `AppShell.tsx` sets up unused providers.

#### B. 10 Duplicate Section Shells
All 10 section files ([`WorkSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/WorkSection.tsx), [`PersonalSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/PersonalSection.tsx), [`KetoSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/KetoSection.tsx), [`HobbiesSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/HobbiesSection.tsx), [`ProjectsSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/ProjectsSection.tsx), [`NowSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/NowSection.tsx), [`ContactSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/ContactSection.tsx), [`AtacoSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/AtacoSection.tsx), [`WritingSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/WritingSection.tsx), [`TravelStoriesSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/TravelStoriesSection.tsx)) duplicate ~35 lines of wrapper JSX:
- Outer `<Card>` with identical responsive classes (`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`).
- Top header row with `<ArrowLeft /> Home` navigation link.
- Copy URL button with icon hover state.
- Dynamic `HeadingTag` logic (`isActive ? 'h1' : 'h2'`).
- Title and subtitle layout.

#### C. DOM-Query Hack for Scroll Reset
In [`src/components/InfiniteCanvas.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/InfiniteCanvas.tsx#L116-L121):
```ts
const resetScrollPositions = useCallback(() => {
  document.querySelectorAll('[class*="overflow-y-auto"]').forEach(element => {
    element.scrollTop = 0;
  });
}, []);
```
This queries the live DOM with `setTimeout(..., 0)` across 4 different handlers instead of managing container scroll state in React.

---

### 5. Zombie State, Dead Code & Unused Dependencies

#### A. Dead `navigationHistory` State
- [`src/hooks/useSectionManagement.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/hooks/useSectionManagement.ts) manages a `navigationHistory` array on every section visit.
- [`src/components/InfiniteCanvas.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/InfiniteCanvas.tsx) passes it to [`src/components/NavigationBreadcrumb.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/NavigationBreadcrumb.tsx).
- `NavigationBreadcrumb.tsx` receives it in props, but **never renders or references it** (it only maps over `breadcrumbPath`).

#### B. Over-Engineered Analytics Engine (`useVisitTracking.ts`)
[`src/hooks/useVisitTracking.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/hooks/useVisitTracking.ts) (193 lines) tracks `totalTimeSpent`, `averageTimeSpent`, `sessionDuration`, `recordCardVisit`, `getCardVisits`, `getMostVisitedSections`, `getTotalVisits`, and `clearVisitData`, writing to `localStorage` on every change. None of this is ever displayed or queried in the UI.

#### C. Dual Toast Engines Active Simultaneously
In [`src/AppShell.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/AppShell.tsx):
- Both Radix Toast ([`src/components/ui/toaster.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/ui/toaster.tsx)) and Sonner ([`src/components/ui/sonner.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/ui/sonner.tsx)) are mounted.
- Radix Toast is completely unused across the app; only `sonner` is called in [`src/utils/urlUtils.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/utils/urlUtils.ts).

#### D. Unused Template Components & Packages
- **Dead CSS:** [`src/App.css`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/App.css) (default Vite starter boilerplate) is unreferenced.
- **Unused Shadcn Components:** [`src/components/ui/`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/ui) contains 49 component files (`sidebar.tsx` [23KB], `chart.tsx` [10KB], `menubar.tsx`, `dropdown-menu.tsx`, `drawer.tsx`, `resizable.tsx`, `pagination.tsx`, `input-otp.tsx`, etc.). The app only uses 4 (`card`, `badge`, `breadcrumb`, `button`).
- **Unused Packages:** `@tanstack/react-query`, `recharts`, `date-fns`, `embla-carousel-react`, `input-otp`, `next-themes`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `vaul`, `zod`, and 20+ `@radix-ui/*` packages.

---

### 6. Content Placement vs. Data Invariants

[`GEMINI.md`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/GEMINI.md) requires content to live in `src/data/`, not JSX. However:
- In [`src/components/sections/DetailedStoryView.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/DetailedStoryView.tsx), 95+ lines of full travel story text are hardcoded inside the component's `getFullStory` function instead of in [`src/data/travelStories.ts`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/data/travelStories.ts).
- Achievements in [`WorkSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/WorkSection.tsx), personal categories in [`PersonalSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/PersonalSection.tsx), hobbies in [`HobbiesSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/HobbiesSection.tsx), and cat traits in [`KetoSection.tsx`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/src/components/sections/KetoSection.tsx) are hardcoded in component files.

---

## Actionable Simplification Roadmap

| Step | Action | Impact |
|---|---|---|
| **1. Centralize Registry** | Create `src/data/sections.ts` defining canonical section metadata, positions, SEO configs, and SSG routes. | Eliminates 5 duplicate sync points. |
| **2. Extract `<SectionCard>`** | Build a reusable section card layout wrapping headers, back buttons, and titles. | Removes ~350 lines of duplicate JSX across 10 section files. |
| **3. Clean Navigation & History** | Set `{ replace: true }` on drag; sync `/travel/:storyId` to router; remove unused `useParams`. | Clean browser back-stack and functional deep links. |
| **4. Simplify Grid Lookups** | Convert `useGridNavigation.ts` to discrete `(col, row)` integer searches. | Removes continuous trigonometry math; 100% deterministic. |
| **5. Fix Resize Drift** | Sync viewport offset in `useViewport` when responsive spacing updates. | Keeps active section centered on window resize / orientation change. |
| **6. Prune Dead Code & Deps** | Remove `useVisitTracking`, Radix Toast, unused UI components, and unused npm dependencies. | Drastically trims build size, dependency surface, and maintenance overhead. |
| **7. Extract Remaining Data** | Move hardcoded copy from `DetailedStoryView`, `WorkSection`, and `PersonalSection` to `src/data/`. | Full alignment with project data invariants. |
