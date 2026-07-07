# Plan: Ataco Page
Created: 2026-07-08
Status: complete

## Goal
Ship the Ataco (Triumph Scrambler 400X) page with photo placeholders, content from
dev/research/ataco-page-content.md.

## Approach
Subsection behind Keto at (0, -spacing*2), parent 'keto' — personal content on the
vertical axis; up becomes the named-companions chain. Content lives in src/data/
per the data-layer invariant. Photo slots are styled placeholders (no stock images —
owner will supply real pics).

## Steps
- [x] src/data/atacoData.ts — stories, quick facts, placeholder captions
- [x] src/components/sections/AtacoSection.tsx — card matching sibling sections
- [x] Register 'ataco' in useSectionManagement allSections
- [x] Wire into SectionRenderer
- [x] Micro-hint on KetoSection → Ataco (needs optional onNavigateToSection prop)
- [x] tsc, lint, build; update project.todo

## Files Affected
- src/data/atacoData.ts (new)
- src/components/sections/AtacoSection.tsx (new)
- src/hooks/useSectionManagement.ts
- src/components/canvas/SectionRenderer.tsx
- src/components/sections/KetoSection.tsx

## Outcome / Notes
Shipped 2026-07-08, verified end-to-end in headless Firefox (arrow-key path, Keto-card
hint click, /ataco deep link). Two extra registration points surfaced during
verification and are now fixed + documented in .claude/skills/verify/SKILL.md:
App.tsx route list and InfiniteCanvas validSections (missing either → 404), plus
NavigationBreadcrumb's display-name map. Real photos still pending — placeholders
render styled "Real photo on its way" slots.
