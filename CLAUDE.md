# CLAUDE.md

Guidance for working in this repository.

## What this is

A single-page, terminal/neural-themed personal portfolio for **Madhesh Vivekanandan**
(GenAI / Python backend engineer). It is a **static site hosted on GitHub Pages** —
no backend, no build step, no framework. Just HTML, CSS, and vanilla JS loaded directly
by [index.html](index.html).

## Architecture

Everything is wired up in [index.html](index.html), which loads modular assets in order.

- **Data** — [assets/data/portfolio-data.js](assets/data/portfolio-data.js) exposes a
  global `window.PORTFOLIO_DATA` (profile, experience, projects, skills). Content edits
  generally happen here, not in markup.
- **CSS** — split into `assets/css/` (tokens, reset, base, responsive) plus per-section
  files in `assets/css/sections/` and reusable bits in `assets/css/components/`. Design
  tokens (colors, fonts) live in [assets/css/tokens.css](assets/css/tokens.css).
- **JS** — one file per concern in `assets/js/`, each typically an IIFE / `DOMContentLoaded`
  listener with no module system:
  - `boot-sequence.js` — terminal boot animation; fires a `neural-system-ready` event and
    sets `localStorage.system_booted`.
  - `main.js` — orchestrator; populates experience timeline + ticker + footer latency once
    the system is ready.
  - `neural-bg.js` / `cursor.js` / `nav.js` / `scroll-engine.js` — background canvas,
    custom cursor, radial hub nav (labelled orbit / mobile tab bar), scroll reveals.
  - `projects.js` — renders project nodes and fetches live repos from the GitHub API
    (`api.github.com/users/<username>/repos`).
  - `skills.js` — skills constellation.
  - `contact.js` — the contact form (the `signal_transmission.io` section).

## Sections (in `index.html`)

`hero` → `about` → `experience` → `projects` → `skills` → `contact` → footer.
The radial hub nav (and the 1–6 keyboard shortcuts) maps to these anchors.

## Conventions

- Theme language is intentionally "terminal / neural ops" (e.g. SIGNAL_TRANSMISSION,
  OUTBOUND_PORT, NODE_ID). Keep copy in that voice.
- No dependencies / package.json — do not introduce a build step or framework without
  asking. Add libraries only via CDN `<script>` if truly needed.
- To preview locally, serve the folder over HTTP (e.g. `python3 -m http.server`) rather
  than opening the file directly, so `fetch`/relative paths behave.

## SEO

- `<head>` in [index.html](index.html) carries the canonical URL, Open Graph / Twitter share
  tags (image: `assets/images/og-card.jpg`, 1200×630) and a JSON-LD `@graph`
  (WebSite, ProfilePage, Person). Keep the Person's `sameAs` profile links and
  `jobTitle` in step with the contact section and resume.
- [robots.txt](robots.txt) points crawlers at [sitemap.xml](sitemap.xml). When content
  changes, bump the sitemap `<lastmod>` and the ProfilePage `dateModified`.
- Favicons: `favicon.ico` (48px, root) plus `assets/icons/` (192px, Apple touch). Google
  needs a crawlable favicon that is a multiple of 48px.
- Photos are JPEG with explicit `width`/`height`; the hero image loads with
  `fetchpriority="high"`, the about photo lazily.
- [google4cf08a030ade5e11.html](google4cf08a030ade5e11.html) verifies the site in Google
  Search Console. Google re-checks it periodically, so never delete or rename it.

## Contact form (`signal_transmission.io`)

The contact form ([assets/js/contact.js](assets/js/contact.js)) delivers messages via
**Web3Forms** — a serverless email relay. On submit it `fetch()`-POSTs the payload to
`api.web3forms.com/submit`, which emails the owner. The visitor needs nothing (no email
client, no extra steps) and stays on the page while the terminal animation plays. If the
request fails, it degrades to a `mailto:` link as a fallback.

- The Web3Forms **access key lives in [assets/js/config.js](assets/js/config.js)**
  (`window.SITE_CONFIG.WEB3FORMS_ACCESS_KEY`). This is a **public** key by design — it
  ships to the browser — so it is committed, not secret. A real `.env` does not work on a
  static GitHub Pages site (no server/build step to read it). Swap the key there if needed.
