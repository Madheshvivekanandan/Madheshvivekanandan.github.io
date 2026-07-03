# Madhesh Vivekanandan — Portfolio

A single-page, terminal / neural-themed personal portfolio for **Madhesh Vivekanandan**
(GenAI / Python backend engineer). Static site, no backend, no build step, no framework —
just HTML, CSS, and vanilla JS served directly by [index.html](index.html) and hosted on
**GitHub Pages**.

🔗 **Live:** https://madheshvivekanandan.github.io

## Highlights

- **Terminal boot sequence** that hands off to the main experience via a
  `neural-system-ready` event.
- **Neural background canvas**, custom cursor, and a **radial hub navigation**.
- **Live GitHub projects** fetched from the GitHub API alongside curated project nodes.
- **Contact form** (`signal_transmission.io`) delivered through
  [Web3Forms](https://web3forms.com) with a `mailto:` fallback.
- Fully responsive, mobile-friendly layout.

## Sections

`hero` → `about` → `experience` → `projects` → `skills` → `contact` → footer.
The radial hub nav maps to these anchors.

## Architecture

Everything is wired up in [index.html](index.html), which loads modular assets in order.

```
assets/
├── data/
│   └── portfolio-data.js     # window.PORTFOLIO_DATA — profile, experience, projects, skills
├── css/
│   ├── tokens.css            # design tokens (colors, fonts)
│   ├── reset.css / base.css / responsive.css
│   ├── components/           # cursor, footer, nav
│   └── sections/             # boot, hero, about, experience, projects, skills, contact
├── js/
│   ├── boot-sequence.js      # terminal boot animation; fires `neural-system-ready`
│   ├── main.js               # orchestrator; timeline + ticker + footer latency
│   ├── neural-bg.js          # background canvas
│   ├── cursor.js             # custom cursor
│   ├── nav.js                # radial hub navigation
│   ├── scroll-engine.js      # scroll reveals
│   ├── projects.js           # project nodes + live GitHub repos
│   ├── skills.js             # skills constellation
│   ├── contact.js            # contact form (Web3Forms + mailto fallback)
│   └── config.js             # window.SITE_CONFIG (Web3Forms access key)
└── images/                   # profile photos
```

**Content edits** generally happen in
[assets/data/portfolio-data.js](assets/data/portfolio-data.js), not in markup —
it exposes a global `window.PORTFOLIO_DATA` (profile, experience, projects, skills).

Each JS file is one concern, typically an IIFE / `DOMContentLoaded` listener with no
module system. Design tokens (colors, fonts) live in
[assets/css/tokens.css](assets/css/tokens.css).

## Run locally

Serve the folder over HTTP (rather than opening the file directly) so `fetch` and
relative paths behave:

```bash
python3 -m http.server
# then open http://localhost:8000
```

## Contact form

The contact form ([assets/js/contact.js](assets/js/contact.js)) `fetch()`-POSTs the
payload to `api.web3forms.com/submit`, which emails the owner — the visitor needs no email
client and stays on the page while the terminal animation plays. If the request fails, it
degrades to a `mailto:` link.

The Web3Forms **access key lives in [assets/js/config.js](assets/js/config.js)**
(`window.SITE_CONFIG.WEB3FORMS_ACCESS_KEY`). This is a **public** key by design — it ships
to the browser — so it is committed, not secret. Swap the key there if needed.

## Conventions

- Theme language is intentionally "terminal / neural ops" (e.g. `SIGNAL_TRANSMISSION`,
  `OUTBOUND_PORT`, `NODE_ID`). Keep copy in that voice.
- No dependencies / `package.json` — no build step or framework. Add libraries only via
  CDN `<script>` if truly needed.

## Tech

Vanilla HTML · CSS · JavaScript · Canvas · GitHub API · Web3Forms · GitHub Pages
