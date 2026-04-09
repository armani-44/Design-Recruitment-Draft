---
name: Design Recruitment Website
description: KBB specialist recruitment landing page — brand colours, assets, fonts, page sections, and stack
type: project
---

Design Recruitment® is a UK specialist recruitment agency exclusively serving the Kitchen, Bedroom, Bathroom (KBB) & Builders Merchant industry.

**Brand colours (exact):**
- Deep navy background: `#080D2A`
- Mid navy: `#0C1340`, `#112060`
- Brand blue: `#1740CC` / bright: `#2055F0`
- Orange accent (CTAs only): `#E8641A`

**Brand font:** GC Natify (not on Google Fonts). Closest substitute: **Outfit** (Google Fonts) — used at weights 300–900.

**Brand assets in `Brand_assets/`:**
- `DR-Logo-Blue.png` — blue logo on transparent/white bg (for light sections)
- `DR-Logo-White.png` — white logo on transparent bg (for dark sections / nav)
- `DR-Logo-gradient.png` — white logo on navy→blue gradient bg
- `DR_Guidelines_1.png` — brand guidelines sheet
- `Ben-Paine-Managing Director.jpg` — MD headshot (use in About section)
- `AWinship-8084-025-High-scaled.jpg` — premium white kitchen (hero image)
- `Chris-Designer-.jpeg` — Scandinavian wood-tone kitchen (candidate card)
- `recruitment-concept-male-employer-read-cv-resume-*.jpg` — interview scene (employer card)

**Website stack:**
- Single `index.html`, all CSS inline + Tailwind CDN
- `serve.mjs` — local dev server on port 3000
- `screenshot.mjs` — Puppeteer screenshot → `temporary screenshots/`
- `node_modules/puppeteer` installed locally

**Key people:**
- Ben Paine — Managing Director

**Page purpose:** Community + high-value client landing page. Two audiences: Employers (find KBB talent) and Candidates/Designers (find KBB roles).

**Why:** KBB industry deserves specialist recruiters, not generalists — this is Ben Paine's founding principle.

**How to apply:** Keep all future design work within the deep navy / blue / orange palette; Outfit font only; never use default Tailwind blues.
