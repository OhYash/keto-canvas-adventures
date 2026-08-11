---
title: "[Dummy post] Building an Infinite 2D Canvas Portfolio in React & TypeScript"
date: "2026-08-11"
readTime: "6 min read"
summary: "Why grid-based spatial navigation creates a memorable digital brain experience, and how to implement hardware-accelerated pan & zoom using translate3d."
tags: ["React", "TypeScript", "UI Architecture", "Canvas"]
---

# Building an Infinite 2D Canvas Portfolio in React & TypeScript

> This is a dummy post, and not actually manually written by me.

Traditional portfolio websites often follow a repetitive layout: a header, an about hero, a grid of project cards, and a contact form at the footer. While functional, it rarely reflects how software engineers actually map out their mental models—as connected nodes of thought, projects, life updates, and personal side quests.

When rebuilding my website (**[ohya.sh](https://ohya.sh)**), I wanted a digital brain that felt spatial, interactive, and fast. Here is a deep dive into the engineering decisions behind building an infinite 2D canvas portfolio in React 18, TypeScript, and Vite.

---

## 1. Spatial Mental Model & Grid Architecture

Instead of scrollable vertical pages, sections sit at discrete positions on a virtual 2D coordinate plane:

- **Home `(0, 0)`**: The central compass hub.
- **Work `(1000, 0)`**: Professional background and experience (East).
- **About / Personal `(-1000, 0)`**: Personal journey and identity (West).
- **Keto `(0, -1000)`**: The cat who runs the household (North).
- **Hobbies `(0, 1000)`**: Fun experiments and side projects (South).
- **Subsections `(±2000)`**: Deeper dive nodes sitting behind parent sections (e.g., **Writing & Essays** at `(2000, 0)`, **Travel Stories** at `(-2000, 0)`).

This spatial orientation follows a strict rule: **professional content extends along the horizontal axis, personal content along the vertical axis**.

---

## 2. Smooth Pan Performance using `translate3d`

Manipulating container elements in modern browsers requires avoiding layout thrashing. Changing CSS `top` or `left` forces browser recalculations and causes jank on high-refresh-rate displays.

Instead, we manage a single viewport offset state `{ x, y }` and transform the main canvas container using hardware-accelerated CSS `translate3d`:

```tsx
<div
  className="absolute will-change-transform transition-transform duration-200 ease-out"
  style={{
    transform: `translate3d(${viewportPosition.x}px, ${viewportPosition.y}px, 0)`,
    left: '50%',
    top: '50%'
  }}
>
  <SectionRenderer ... />
</div>
```

Using `will-change-transform` promotes the canvas element to its own GPU layer, ensuring sub-16ms frame times during mouse drag and touch panning.

---

## 3. Deep Linking & SPA Navigation

Spatial websites often struggle with SEO and direct URL linking. To solve this, every node on the canvas maps to a first-class React Router path:

1. `/work` → pans to `(1000, 0)`
2. `/writing` → pans to `(2000, 0)`
3. `/writing/building-an-infinite-canvas-portfolio` → opens the focused distraction-free Reader View.

When a user shares a link or hits back/forward in their browser, the URL synchronizes immediately with the canvas viewport position.

---

## 4. Mobile & Touch Event Safety

On mobile devices, touch events can easily conflict with native scroll behavior. We handle mobile touch explicitly:

```ts
// Stand down canvas panning while the user is actively scrolling inside an overflow container
touchAction: isPanning ? 'none' : 'pan-y'
```

This prevents accidental canvas shifts when a user is reading a long article or scrolling through work experience cards.

---

## Conclusion

Building a spatial web interface combines the tactile feel of physical maps with the speed of single-page web applications. By pairing 2D spatial exploration on the canvas with focused, distraction-free reading overlays for long-form essays, we get the best of both worlds: **playful discovery and high-signal readability**.
