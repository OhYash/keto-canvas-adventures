export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  videoUrl?: string; // YouTube embed URL, Vimeo, or MP4 video URL
  content: string;   // Markdown content string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-an-infinite-canvas-portfolio",
    title: "Building an Infinite 2D Canvas Portfolio in React & TypeScript",
    date: "2026-08-11",
    readTime: "6 min read",
    summary: "Why grid-based spatial navigation creates a memorable digital brain experience, and how to implement hardware-accelerated pan & zoom using translate3d.",
    tags: ["React", "TypeScript", "UI Architecture", "Canvas"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video hero player support
    content: `
# Building an Infinite 2D Canvas Portfolio in React & TypeScript

Traditional portfolio websites often follow a repetitive layout: a header, an about hero, a grid of project cards, and a contact form at the footer. While functional, it rarely reflects how software engineers actually map out their mental models—as connected nodes of thought, projects, life updates, and personal side quests.

When rebuilding my website (**[ohya.sh](https://ohya.sh)**), I wanted a digital brain that felt spatial, interactive, and fast. Here is a deep dive into the engineering decisions behind building an infinite 2D canvas portfolio in React 18, TypeScript, and Vite.

---

## 1. Spatial Mental Model & Grid Architecture

Instead of scrollable vertical pages, sections sit at discrete positions on a virtual 2D coordinate plane:

- **Home \`(0, 0)\`**: The central compass hub.
- **Work \`(1000, 0)\`**: Professional background and experience (East).
- **About / Personal \`(-1000, 0)\`**: Personal journey and identity (West).
- **Keto \`(0, -1000)\`**: The cat who runs the household (North).
- **Hobbies \`(0, 1000)\`**: Fun experiments and side projects (South).
- **Subsections \`(\\pm 2000)\`**: Deeper dive nodes sitting behind parent sections (e.g., **Writing & Essays** at \`(2000, 0)\`, **Travel Stories** at \`(-2000, 0)\`).

This spatial orientation follows a strict rule: **professional content extends along the horizontal axis, personal content along the vertical axis**.

---

## 2. Smooth Pan Performance using \`translate3d\`

Manipulating container elements in modern browsers requires avoiding layout thrashing. Changing CSS \`top\` or \`left\` forces browser recalculations and causes jank on high-refresh-rate displays.

Instead, we manage a single viewport offset state \`{ x, y }\` and transform the main canvas container using hardware-accelerated CSS \`translate3d\`:

\`\`\`tsx
<div
  className="absolute will-change-transform transition-transform duration-200 ease-out"
  style={{
    transform: \`translate3d(\${viewportPosition.x}px, \${viewportPosition.y}px, 0)\`,
    left: '50%',
    top: '50%'
  }}
>
  <SectionRenderer ... />
</div>
\`\`\`

Using \`will-change-transform\` promotes the canvas element to its own GPU layer, ensuring sub-16ms frame times during mouse drag and touch panning.

---

## 3. Deep Linking & SPA Navigation

Spatial websites often struggle with SEO and direct URL linking. To solve this, every node on the canvas maps to a first-class React Router path:

1. \`/work\` $\\rightarrow$ pans to \`(1000, 0)\`
2. \`/writing\` $\\rightarrow$ pans to \`(2000, 0)\`
3. \`/writing/building-an-infinite-canvas-portfolio\` $\\rightarrow$ opens the focused distraction-free Reader View.

When a user shares a link or hits back/forward in their browser, the URL synchronizes immediately with the canvas viewport position.

---

## 4. Mobile & Touch Event Safety

On mobile devices, touch events can easily conflict with native scroll behavior. We handle mobile touch explicitly:

\`\`\`ts
// Stand down canvas panning while the user is actively scrolling inside an overflow container
touchAction: isPanning ? 'none' : 'pan-y'
\`\`\`

This prevents accidental canvas shifts when a user is reading a long article or scrolling through work experience cards.

---

## Conclusion

Building a spatial web interface combines the tactile feel of physical maps with the speed of single-page web applications. By pairing 2D spatial exploration on the canvas with focused, distraction-free reading overlays for long-form essays, we get the best of both worlds: **playful discovery and high-signal readability**.
`
  },
  {
    slug: "designing-high-throughput-backend-systems",
    title: "Designing High-Throughput Backend Systems: Lessons from 30M+ Monthly Requests",
    date: "2026-07-28",
    readTime: "8 min read",
    summary: "Key lessons from owning backend core services processing 30M+ monthly requests at sub-150ms p95 latency and near-zero on-call incidents.",
    tags: ["Backend", "System Design", "Python", "PostgreSQL", "Performance"],
    content: `
# Designing High-Throughput Backend Systems: Lessons from 30M+ Monthly Requests

High-scale backend engineering isn't just about throwing bigger instances or distributed caching clusters at a problem. It's about system design hygiene, defensive API contracts, database query efficiency, and knowing what *not* to compute synchronously on the main thread.

Having owned core backend services processing 30M+ monthly requests with a <0.1% error rate and p95 latency under 150ms, here are the core principles that kept our production environment stable and on-call alerts silent.

---

## 1. Treat Database Queries as Network Calls

The most common cause of high tail latency in backend services is missing query bounds and hidden N+1 ORM fetches.

### Guidelines for Query Safety:
- **Never issue queries inside loops**: Bulk-fetch or join explicitly.
- **Index for equality first, range second**: Compound indexes should put high-cardinality equality fields upfront.
- **Use SELECT fields explicitly**: Fetching full database rows when you only need two columns wastes memory allocations and network bandwidth.

\`\`\`python
# Bad: Implicit N+1 and full row fetch
candidates = Candidate.objects.filter(status='completed')
for c in candidates:
    print(c.assessment.title)  # Triggers N separate DB calls

# Good: Explicit select_related and value fields
candidates = Candidate.objects.filter(status='completed')\\
    .select_related('assessment')\\
    .values('id', 'email', 'assessment__title')
\`\`\`

---

## 2. Asynchronous Offloading & Queue Safety

Any operation that takes longer than 50ms and does not strictly require blocking the HTTP response belongs in a background queue (e.g., Celery, Redis Streams, SQS).

### What to offload:
- PDF generation and font rendering
- Webhook dispatching to third-party ATS platforms
- Analytics events & audit log processing
- Automated email / notification dispatch

---

## 3. Defensive API Contracts & Graceful Degradation

APIs should fail fast at the boundary rather than failing deep inside application logic.

- **Strict Payload Validation**: Validate incoming JSON schemas upfront before touching database connections.
- **Circuit Breakers**: Wrap external integration dependencies (PDF engines, third-party auth, notification APIs) in circuit breakers to avoid cascading worker thread exhaustion.
- **Rate Limiting**: Protect endpoints against traffic spikes using token-bucket algorithms in Redis.

---

## Conclusion

Scaling backend services is a discipline of simplicity. By keeping database access clean, offloading non-critical work to async queues, and validating inputs at the perimeter, you can run high-throughput systems with minimal overhead and near-zero operational noise.
`
  }
];

export const getAllPosts = (): BlogPost[] => {
  return BLOG_POSTS;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug);
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  BLOG_POSTS.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet);
};
