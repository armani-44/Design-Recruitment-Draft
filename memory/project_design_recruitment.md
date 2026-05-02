---
name: Design Recruitment Website
description: KBB specialist recruitment landing page — canonical brand tokens, fonts, page sections, and stack
type: project
---

Designer Recruitment® is a UK specialist recruitment agency exclusively serving the Kitchen, Bedroom, Bathroom (KBB) & Builders Merchant industry.

## Canonical brand spec

Source of truth: `Brand_assets/DR_Guidelines_1.png` and `tokens.css` at repo root.
Whenever spec and implementation conflict, `tokens.css` is canonical — update both.

**Colours (per guidelines, hex from RGB):**
- `#07071B` deep midnight (primary background)
- `#0B0252` deep navy (secondary dark)
- `#2353E8` brand blue (primary CTA / accents)
- `#D9BC80` warm gold (editorial accent)
- `#F2EDE4` cream (light surface)
- `#FFFFFF` white

**Typography (per guidelines):**
- Display / headings: **Canela Deck** (with Canela Text alias and Georgia fallback)
- Body / UI: **Montserrat** — weights Light (300), Regular (400), Medium (500), Bold (700), Black (900)

Font files live in `Fonts/` at repo root: `Canela-Medium.woff2`, `Canela-MediumItalic.woff2` (currently used for both Deck and Text aliases). Replace with true Canela Deck cuts when licensed. Montserrat is loaded from Google Fonts.

## Tokens

All design tokens live in `tokens.css` at repo root. Both surfaces (`index.html` and `about-page/`) consume it — homepage via `<link rel="stylesheet">`, about-page via `@import` from `src/index.css` (resolved through a symlink). Includes:
- Brand colour palette + semantic aliases (`--bg-base`, `--fg-muted`, `--accent`, `--line` etc.)
- Type scale (`--fs-3xs` … `--fs-2xl`) and display clamp scale (`--fs-display-sm` … `--fs-display-xl`)
- Weights, line-heights, letter-spacing, radius, spacing (4px t-shirt), section padding, motion easings, elevation shadows.

## Brand assets in `Brand_assets/`

- `DR-Logo-Blue.png` / `DR-Logo-Blue-2.png` — blue logo on transparent/white bg (light sections)
- `DR-Logo-White.png` / `DR-Logo-White-2.png` — white logo on transparent bg (dark sections / nav)
- `DR-Logo-gradient.png` — white logo on navy→blue gradient bg
- `DR_Guidelines_1.png` — brand guidelines sheet (canonical reference)
- `Ben-Paine-Managing Director.jpg` — MD headshot (use in About / Team)
- `AWinship-8084-025-High-scaled.jpg` — premium white kitchen (hero image)
- `Chris-Designer-.jpeg` — Scandinavian wood-tone kitchen (candidate card)
- `recruitment-concept-male-employer-read-cv-resume-*.jpg` — interview scene (employer card)

`Luxury BBK Imagery/` is a duplicate of certain Brand_assets webps — slated for removal.

## Stack

- **Homepage** — single `index.html`, all CSS inline + Tailwind via CDN. Dev-served by `serve.mjs` on port 3000.
- **About page** — `about-page/` Vite + React 18 + TypeScript + Tailwind workspace. Dev-served on port 5174. HLS video via `hls.js`.
- `screenshot.mjs` — Puppeteer screenshot helper (output → `temporary screenshots/`).
- `node_modules/puppeteer` installed at repo root.

## Key people

- Ben Paine — Managing Director (founder)

## Page purpose

Community + high-value client landing page. Two audiences: Employers (find KBB talent) and Candidates/Designers (find KBB roles).

**Why:** KBB industry deserves specialist recruiters, not generalists — Ben Paine's founding principle.

**How to apply:** All design work consumes `tokens.css`. Never introduce a colour, font-size, or radius outside the declared scales. Never use raw hex literals in component code.
