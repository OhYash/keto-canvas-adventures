# SEO Expert Analysis & Metrics Report: OhYa.sh Portfolio

**Date**: August 11, 2026  
**Target URL**: `https://ohya.sh/`  
**Repository**: `OhYash/keto-canvas-adventures`  
**Host & CDN**: GitHub Pages (`server: GitHub.com`, Fastly Edge)  
**Host Environment**: Arch Linux (Vivaldi Browser, Python 3.14, Node.js)

---

## Executive Summary

An automated audit of the live production deployment at **`https://ohya.sh/`** confirms that while the interactive 2D canvas UX is visually appealing, **the site fails critical SEO indexing, crawlability, metadata, and social media sharing benchmarks**.

Under standard web crawler inspection (Googlebot, Bingbot, LinkedIn, Twitter/X scrapers), **every sub-page on the live domain returns an HTTP 404 Not Found error**, and social shares point to a missing preview asset.

---

## Live Production Audit Results (`https://ohya.sh/`)

| URL Endpoint | Live HTTP Status | Raw HTML Content | SEO / Crawler Result |
| :--- | :---: | :---: | :--- |
| `https://ohya.sh/` | **`200 OK`** | 2.4 KB CSR shell (`<div id="root"></div>`) | ⚠️ Crawlers receive 0 body text on initial pass. |
| `https://ohya.sh/work` | ❌ **`404 Not Found`** | GitHub Pages 404 Error Page | 🔴 Googlebot de-indexes page due to 404 status. |
| `https://ohya.sh/personal` | ❌ **`404 Not Found`** | GitHub Pages 404 Error Page | 🔴 Googlebot de-indexes page due to 404 status. |
| `https://ohya.sh/projects` | ❌ **`404 Not Found`** | GitHub Pages 404 Error Page | 🔴 Googlebot de-indexes page due to 404 status. |
| `https://ohya.sh/keto` | ❌ **`404 Not Found`** | GitHub Pages 404 Error Page | 🔴 Googlebot de-indexes page due to 404 status. |
| `https://ohya.sh/now` | ❌ **`404 Not Found`** | GitHub Pages 404 Error Page | 🔴 Googlebot de-indexes page due to 404 status. |
| `https://ohya.sh/contact` | ❌ **`404 Not Found`** | GitHub Pages 404 Error Page | 🔴 Googlebot de-indexes page due to 404 status. |
| `https://ohya.sh/robots.txt` | **`200 OK`** | 160 Bytes (Basic permissions) | ⚠️ Missing `Sitemap: https://ohya.sh/sitemap.xml`. |
| `https://ohya.sh/sitemap.xml` | ❌ **`404 Not Found`** | None | 🔴 Crawlers have no XML sitemap. |
| `https://ohya.sh/og-image.png` | ❌ **`404 Not Found`** | None | 🔴 Social shares display broken preview thumbnail. |

---

## Category Scorecard

| Category | Score | Status | Primary Cause |
| :--- | :---: | :---: | :--- |
| **Indexability & Crawlability** | **15 / 100** | ❌ **Critical Failure** | Client-Side Rendering (CSR) with empty `<div id="root"></div>`; GitHub Pages SPA subroutes return **HTTP 404** status to search bots; missing `sitemap.xml`. |
| **Crawl Architecture & Link Graph** | **10 / 100** | ❌ **Critical Failure** | Internal section navigation uses `<button onClick>` instead of native `<a href="...">` anchor tags. Search crawlers cannot discover deep routes. |
| **On-Page SEO & Metadata** | **20 / 100** | ❌ **Critical Failure** | Static `<title>` and `<meta name="description">` hardcoded in `index.html`. Every subpage (`/work`, `/projects`, `/keto`, `/now`) reports identical title & description. Missing canonical links. |
| **Heading Tag Hierarchy (`<h1>`-`<h6>`)** | **30 / 100** | ⚠️ **Failing** | Client-side `SectionRenderer.tsx` renders **10 `<h1>` tags simultaneously** on the DOM tree, diluting page keyword weight and confusing search algorithms. |
| **Social Search & Open Graph** | **25 / 100** | ❌ **Failing** | `og:image` points to `https://ohya.sh/og-image.png`, which **returns 404 Not Found**. Missing `og:url`, `og:site_name`, `twitter:creator`. |
| **Structured Data (Schema.org)** | **0 / 100** | ❌ **Critical Failure** | Zero JSON-LD schemas embedded. Missed Google Knowledge Graph / Rich Results (`Person`, `ProfilePage`, `BreadcrumbList`). |
| **Core Web Vitals & Technical Performance** | **60 / 100** | ⚠️ **Moderate** | High DOM node count (all sections mounted simultaneously), images missing explicit `width`/`height` (CLS risk), and uncompressed image assets. |

---

## Actionable Blueprint & Fix Roadmap

1. **Static Site Generation (SSG) / Pre-rendering**:
   - Add `vite-plugin-prerender` or an SSG build step to generate static HTML files (`/work/index.html`, `/projects/index.html`, etc.) during `npm run build` so GitHub Pages returns `200 OK` on deep routes.
2. **Dynamic Head Management (`react-helmet-async`)**:
   - Update document title, description, canonical link, and OpenGraph tags dynamically on section changes.
3. **Convert Nav Buttons to Native Anchors**:
   - Render internal links as `<a href="/target">` while preserving canvas pan animations with `e.preventDefault()`.
4. **Create Open Graph Image**:
   - Save a 1200x630px social preview image at `public/og-image.png`.
5. **Generate Sitemap & Robots.txt Link**:
   - Add `public/sitemap.xml` and include `Sitemap: https://ohya.sh/sitemap.xml` in [`public/robots.txt`](file:///home/yash-tg/code/git_ohyash/keto-canvas-adventures/public/robots.txt).
6. **Inject Schema.org JSON-LD**:
   - Embed `Person` and `ProfilePage` structured data scripts in `<head>`.
