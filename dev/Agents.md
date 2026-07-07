# Agents.md — dev/

## Purpose
This directory tracks development progress, ideas, and plans for the OhYa.sh portfolio
site. Maintained collaboratively by the owner and AI agents across sessions.

## Directory Structure
```
dev/
├── project.todo               — Single source of truth: done, pending, needs-input, learnings, plans
├── human-agent-guidelines.md  — Shared UI vocabulary for owner ↔ agent communication
├── plans/                     — Execution plan files for non-trivial workstreams
└── research/                  — Content critiques, idea dumps, feature research
```

## How to use project.todo

### Reading
- Check DONE before starting work — avoid redoing completed effort
- LEARNINGS captures known pitfalls (touch handling, navigation integration points);
  read before touching the relevant areas
- NEEDS INPUT items are blocked on the owner — don't guess, ask

### Writing
- Mark items `[x]` and move to DONE when complete; bump `Last updated:`
- Add newly discovered work as PENDING items — nowhere else (not CLAUDE.md, not code
  comments, not new files)
- Add LEARNINGS when you discover non-obvious behaviour

## How to use plans/
- Create `dev/plans/<slug>.md` before non-trivial multi-step work and list it under
  PLANS in project.todo
- Plans are additive — append outcomes rather than rewriting completed steps

### Plan file template
```markdown
# Plan: <Title>
Created: YYYY-MM-DD
Status: draft | in-progress | complete

## Goal
One sentence: what this plan achieves.

## Approach
High-level strategy and key decisions.

## Steps
- [ ] Step one
- [ ] Step two

## Files Affected
- src/...

## Outcome / Notes
Append as work progresses.
```

## How to use research/
- Drop content critiques, library evaluations, and idea dumps here — one topic per file
- Reference the file from the relevant project.todo item
- `23May26_claude_idea.md` / `23May26_gemini_ideas.txt` — the voice/content audit that
  drives most content PENDING items
- `tracking_guide.txt` — notes on the visit-tracking approach (useVisitTracking)
