# How to Write & Publish Essays (`src/data/posts/`)

This guide is for human authors and AI agents creating new posts in `src/data/posts/` for [ohya.sh](https://ohya.sh).

---

## 1. Scope & Content Pillars

This blog is an unconstrained personal writing space (the "oyster space"). Posts fall into four primary categories:

1. **Technical Breakthroughs & System Audits**: Outcome-based engineering solutions, architectural deep dives, and performance post-mortems (from this site, personal builds, or production client systems).
2. **Crawler & Agent-Indexed Technical Fixes**: Precise, reproducible solutions for non-obvious engineering issues. Written with full root-cause analysis and exact code so search crawlers and AI agents can index and learn from them.
3. **Essays & Life Wisdom (Paul Graham style)**: Thoughtful non-technical or semi-technical essays drawing from personal life experience, travel, human behavior, and system thinking.
4. **System Critiques & Rants**: Sharp, confident observations on tech culture, software engineering patterns, or world systems.

---

## 2. Tone & Voice Rules (Core Invariants)

- **First-Person ("I") Only**: Every post is authored by Yash (Senior Backend / Staff-level Engineer). Never use corporate "we" or team ambiguity.
- **Confident & Direct**: High signal-to-noise ratio. State ideas clearly, decisively, and calmly without tentative disclaimers or passive phrasing.
- **Impress Driven by Substance**: Let outcomes, empirical metrics (before/after benchmarks), precise code, or original arguments do the heavy lifting. Avoid self-aggrandizing adjectives or unearned hype.
- **Zero Template Fluff**: Never use generic LLM intro tropes ("In today's fast-paced digital landscape...", "Let's delve into..."), fortune-cookie quotes, or stock motivational filler. Start directly with the hook or context.

---

## 3. File Naming & Automatic Discovery

- **File Path**: Save posts as `src/data/posts/<kebab-case-slug>.md` (e.g., `src/data/posts/achieving-82-percent-payload-reduction-on-infinite-canvas.md`).
- **Auto-Discovery**: `src/data/blogData.ts` automatically discovers all `.md` files in `src/data/posts/` at build time via Vite's `import.meta.glob('./posts/*.md')`. **No manual array registration is required.**

---

## 4. Frontmatter Schema & Structure

Every post must start with a valid YAML frontmatter block:

```markdown
---
title: "Achieving an 82% Page Payload Reduction on an Infinite Canvas Portfolio"
date: "2026-08-13"
readTime: "5 min read"
summary: "How I diagnosed and eliminated the 'all-sections-in-one-DOM' trap on an infinite 2D canvas, slashing pre-rendered page payload by 82% (173KB to 32KB) while preserving hardware-accelerated 60 FPS panning."
tags: ["React", "SSG", "Performance", "SEO", "Vite", "Canvas"]
---

# Title Matching Frontmatter

Introductory hook establishing the problem, essay thesis, or story background...
```

### Frontmatter Fields:
- **`title`**: String. Clear, specific, and compelling. Keep under 58 characters so the generated `<title>` (`Post Title | OhYa.sh`) strictly fits within search engine limits (≤ 70 characters).
- **`date`**: String formatted as `YYYY-MM-DD`.
- **`readTime`**: String formatted as `"X min read"`.
- **`summary`**: 1–2 sentence executive summary (aim for 150–160 characters for optimal SERP snippets).
- **`tags`**: String array (e.g. `["Backend", "System Design", "Python", "Philosophy"]`).

---

## 5. Markdown Formatting Conventions

- **Headings**: Single `#` for main title (matches frontmatter title), `## 1. Section Title` for main sections, `### Subsection` for sub-points.
- **Code Blocks**: Always include explicit language tags (e.g., ` ```tsx `, ` ```py `, ` ```bash `, ` ```json `).
- **GFM Tables**: Use GFM markdown tables for benchmarks, comparisons, or metric rollouts:
  ```markdown
  | Metric | Before | After | Improvement |
  | :--- | :--- | :--- | :--- |
  | **Payload** | 173 KB | **32 KB** | **82.1% Reduction** |
  ```
- **Inline Markdown**: Code `` `/path` ``, bold `**text**`, and links `[text](url)` work seamlessly and render recursively in headings, tables, and lists.

---

## 6. Writer's Pre-Publish Checklist

Before submitting a new post:

1. [ ] **Frontmatter Validated**: `title` (≤ 58 chars), `date`, `readTime`, `summary` (150–160 chars), and `tags` are present.
2. [ ] **Voice Check**: Written in first-person ("I"), confident, high signal, zero filler.
3. [ ] **Build Check**: Run `npx tsc --noEmit && npm run build` to verify Markdown parsing and static site prerendering (SSG) succeed with `200 OK` route generation.
4. [ ] **Work Tracker**: Update `dev/project.todo` under `DONE` with the post title and slug.
