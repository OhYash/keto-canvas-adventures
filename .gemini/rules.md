# Repository Rules — Antigravity

This repository uses `GEMINI.md` and `dev/project.todo` as the central directives for agent workflows.

- **Task Tracker**: Update `dev/project.todo` at the end of every session or task completion.
- **Invariants**: Obey all invariants in `GEMINI.md` (axis layout, Section Registry single source of truth in `src/data/sections.ts`, email obfuscation, touch behavior, `translate3d`, `src/data/` separation, voice rules).
- **Verification**: Run `npx tsc --noEmit` and execute the official E2E test suite (`npm test` / `npm run test:e2e`). Extend tests in `tests/e2e/suites/` — do not create ad-hoc scratch verification scripts.
