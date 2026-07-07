# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Work Tracking

**Always update `dev/project.todo` at the end of every session or after completing any task.**

- Mark completed items `[x]` and move them to DONE
- Update the `Last updated:` date at the top
- Add new PENDING items discovered during work
- Commit the updated file alongside the relevant code changes

**`dev/project.todo` is the only place for work items.** Do not write TODO items, known
issues, pending fixes, or feature gaps anywhere else — not in this file, not in code
comments, not in new files. If you discover something that needs doing, add it to
`project.todo` and nowhere else.

## Dev Commands

```sh
npm run dev          # Dev server with hot reload
npm run build        # Production build
npm run build:dev    # Build in development mode
npm run lint         # ESLint
npm run preview      # Preview production build
npx tsc --noEmit     # Type check (no test suite exists yet)
```

Deploy: push to `main` → GitHub Pages via `.github/workflows/deploy.yml`.
`make surge` deploys `dist/` to the surge preview URL.

## Architecture

React 18 + TypeScript + Vite + Tailwind + shadcn/ui. An **infinite canvas** portfolio:
sections are React components positioned on a virtual 2D grid, panned/navigated by the
viewer.

- `src/components/InfiniteCanvas.tsx` — main container; renders sections at grid positions
- `src/hooks/` — separation of concerns: `useViewport` (pan state), `useSectionManagement`
  (section registry, navigation, breadcrumbs), `useCanvasEvents` (mouse/touch),
  `useGridNavigation` (arrow keys), `useVisitTracking` (localStorage analytics)
- `src/components/sections/` — one component per section; `SectionRenderer` decides what
  to render for the current viewport
- `src/data/` — content that has been extracted from components (`nowData.json`,
  `travelStories.ts`); see `src/data/HOW_TO_UPDATE_NOW.md`

Grid layout: (0,0) is Home; main sections sit at ±1000 on each axis (Work right, Personal
left, Keto up, Hobbies down, Now bottom-right, Contact bottom-left); subsections at ±2000
behind their parent (Work Experience behind Work, Travel Stories behind Personal, Projects
behind Hobbies).

## Invariants

- **New sections register in `useSectionManagement`'s sections array** on the 1000px grid.
  Keep the axis model: professional content grows along the horizontal axis, personal
  along the vertical.
- **Email stays obfuscated.** ContactSection protects the address with base64 encoding and
  progressive disclosure — never render it as plaintext in JSX or source.
- **Touch handling must never break mobile browser behavior.** Canvas panning stands down
  while the user is scrolling; be careful with `preventDefault` in `useCanvasEvents`.
- **Canvas transforms use CSS `translate3d`** for hardware acceleration — don't switch to
  top/left positioning.
- **Content goes in `src/data/`, not components**, wherever a data file already exists;
  prefer extending the data layer over hardcoding copy in JSX.
- **Voice: specific and first-person.** No fortune-cookie quotes, no "Always X · Always Y"
  template badges, no stock CTAs. The content critiques in `dev/research/` explain why.

## Reference

| File | What it contains |
|---|---|
| `dev/project.todo` | All work items — the only tracker |
| `dev/Agents.md` | Conventions for the dev/ directory, plan template |
| `dev/human-agent-guidelines.md` | Shared UI vocabulary (component/content names) |
| `dev/research/` | Content/voice critiques and feature research |
