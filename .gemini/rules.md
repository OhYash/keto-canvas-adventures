# Repository Rules — Antigravity

This repository uses `GEMINI.md` and `dev/project.todo` as the central directives for agent workflows.

- **Task Tracker**: Update `dev/project.todo` at the end of every session or task completion.
- **Invariants**: Obey all invariants in `GEMINI.md` (axis layout, 4-point section registration, email obfuscation, touch behavior, `translate3d`, `src/data/` separation, voice rules).
- **Verification**: Run `npx tsc --noEmit` and execute browser verification (`.gemini/skills/verify/SKILL.md`) for section/navigation/UI changes.
