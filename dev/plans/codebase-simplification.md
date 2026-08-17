# Plan: Codebase Simplification & Architecture Modernization
Created: 2026-08-17
Status: complete

## Goal
Streamline the keto-canvas-adventures codebase according to dev/research/codebase-simplification-analysis.md by centralizing the section registry into a single source of truth, extracting reusable UI shells, pruning dead dependencies/components, fixing navigation/history deep-linking, simplifying coordinate math, and isolating content into dedicated data modules.

## Approach
1. **Centralize Registry (`src/data/sections.ts`)**: Create canonical section metadata, routes, display titles, SEO configs, and SSG targets; update router, canvas, breadcrumb, SEO, and prerender to consume this single source of truth.
2. **Navigation & Deep-Linking**: Connect `/travel/:storyId` to router params and state; use `{ replace: true }` during canvas dragging; remove unused `useParams`.
3. **Discrete Coordinate Navigation**: Refactor `useGridNavigation.ts` to use discrete `(col, row)` integer searches instead of continuous trigonometry.
4. **Fix Resize Drift**: Update `useViewport` / `useSectionManagement` to re-center the active section when responsive spacing recalculates on window resize / orientation changes.
5. **Extract Reusable `<SectionCard>`**: Build `src/components/canvas/SectionCard.tsx` wrapping headers, back buttons, copy-link buttons, and titles, and refactor all 10 section components.
6. **Data Layer Extraction**: Move hardcoded content from `DetailedStoryView`, `WorkSection`, `PersonalSection`, `HobbiesSection`, and `KetoSection` into `src/data/`.
7. **Prune Dead Code, UI Components & Dependencies**: Delete unreferenced `App.css`, remove 44 unused boilerplate components in `src/components/ui/`, uninstall 136 unused npm packages, remove unused providers from `AppShell.tsx`, and clean up `useVisitTracking`.
8. **Add Error Boundaries**: Add React Error Boundary around section rendering in `SectionRenderer`.
9. **Update Invariants & Docs**: Update `GEMINI.md`, `dev/project.todo`, and `.gemini/skills/verify/SKILL.md`.
10. **End-to-End Verification**: Run full build, SSG pre-render, and browser verification tests.

## Steps
- [x] 1. Create `src/data/sections.ts` and consolidate section metadata, SEO, routes, and display names
- [x] 2. Extract remaining hard-coded content into data files (`src/data/workData.ts`, `src/data/personalData.ts`, `src/data/hobbiesData.ts`, `src/data/ketoData.ts`, `src/data/travelStories.ts`)
- [x] 3. Create `src/components/canvas/SectionCard.tsx` and refactor 10 section components to use it
- [x] 4. Fix `/travel/:storyId` deep-linking and sync with router / SEO / prerender
- [x] 5. Fix canvas drag history pollution (`{ replace: true }`) and remove unused `useParams`
- [x] 6. Simplify `useGridNavigation.ts` to discrete integer coordinate neighbor search
- [x] 7. Fix viewport resize drift on window resize / orientation change
- [x] 8. Replace DOM query scroll reset hack with declarative container scroll management
- [x] 9. Simplify `useVisitTracking.ts`, remove unused `navigationHistory` state, and remove Radix Toast system
- [x] 10. Clean up `AppShell.tsx`, `AppRoutes.tsx`, remove unused `QueryClientProvider` and `TooltipProvider`
- [x] 11. Delete 44 unused UI components in `src/components/ui/` and `src/App.css`
- [x] 12. Uninstall unused npm dependencies from `package.json` (136 packages pruned)
- [x] 13. Add React Error Boundary component around section rendering
- [x] 14. Update `scripts/prerender.js` and `src/entry-server.tsx` to use unified section registry
- [x] 15. Update `GEMINI.md`, `.gemini/skills/verify/SKILL.md`, and `dev/project.todo`
- [x] 16. Build, type check, lint, and run end-to-end verification (18/18 browser tests passed)

## Files Affected
- `src/data/sections.ts` (new)
- `src/data/workData.ts` (new)
- `src/data/personalData.ts` (new)
- `src/data/hobbiesData.ts` (new)
- `src/data/ketoData.ts` (new)
- `src/data/travelStories.ts`
- `src/components/canvas/SectionCard.tsx` (new)
- `src/components/ErrorBoundary.tsx` (new)
- `src/components/SEO.tsx`
- `src/components/NavigationBreadcrumb.tsx`
- `src/components/InfiniteCanvas.tsx`
- `src/components/canvas/SectionRenderer.tsx`
- `src/hooks/useSectionManagement.ts`
- `src/hooks/useGridNavigation.ts`
- `src/hooks/useViewport.ts`
- `src/hooks/useVisitTracking.ts`
- `src/AppRoutes.tsx`
- `src/AppShell.tsx`
- `src/App.tsx`
- `src/entry-server.tsx`
- `scripts/prerender.js`
- `src/components/sections/*.tsx` (all section files)
- `src/components/ui/*` (pruned 44 unused files)
- `package.json` (pruned 136 packages)
- `GEMINI.md`
- `.gemini/skills/verify/SKILL.md`
- `dev/project.todo`

## Outcome / Notes
- Replaced 6-point section registration chore with unified single source of truth in `src/data/sections.ts`.
- Removed ~400 lines of duplicate wrapper boilerplate across 10 section components via `<SectionCard>`.
- Pruned 44 dead UI components and 136 unneeded npm dependencies (`@tanstack/react-query`, `recharts`, `date-fns`, `embla-carousel`, `react-hook-form`, `zod`, Radix UI packages).
- Converted continuous geometry in `useGridNavigation.ts` to 100% deterministic discrete integer coordinate math.
- Added deep-linking and dynamic SSG pre-rendering for travel stories (`/travel/:storyId`).
- Added React `<ErrorBoundary>` to protect canvas stability.
- Verified 100% test pass rate across 18 E2E browser checks using Firefox.
