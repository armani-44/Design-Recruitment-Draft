# ─────────────────────────────────────────────
# FULL WEBSITE AUDIT — v2
# Run from the project root. Read all HTML, CSS,
# and JS files before starting any checks.
# ─────────────────────────────────────────────

You are performing a comprehensive audit of this website. Work through every section methodically. Do not skip any category. After completing all checks, produce a single structured report.

## SETUP
- Scan the full project directory and map all pages, stylesheets, scripts, and assets.
- Identify the site structure: page count, routing method, any framework or build tool in use.
- Note the base URL or how the site is served locally.

## 1. COPY & SPELLING
- Check every page for spelling mistakes, typos, and grammatical errors.
- Flag inconsistent terminology (e.g. "Sign up" vs "Sign Up" vs "Signup").
- Check for placeholder text left in (Lorem ipsum, "TBD", "TODO", "FIXME", dummy emails, test names).
- Check for repeated words, missing words, or broken sentences.
- Check heading hierarchy reads logically as written copy — not just visually.

## 2. RESPONSIVENESS
- Review CSS for mobile-first or responsive breakpoints. List all breakpoints found.
- Check for fixed pixel widths that could break on small screens.
- Check images and media have max-width constraints or responsive handling (srcset, object-fit).
- Check text doesn't overflow or get cut off at common viewport widths: 375px, 768px, 1024px, 1440px.
- Check navigation has a proper mobile treatment (hamburger, collapse, etc.).
- Flag any element using viewport units (vw/vh) that could cause layout issues on mobile.

## 3. USER JOURNEY
- Map the primary user journeys from the homepage (e.g. Homepage → Service → Contact).
- Identify dead ends — pages with no clear next action or CTA.
- Check every CTA button/link leads somewhere meaningful and is clearly labelled.
- Check form flows have confirmation states or success messages.
- Check 404 handling exists and is helpful.
- Flag anything that interrupts or confuses the journey (unexpected redirects, missing back paths, broken flows).

## 4. LINKS
- Check all internal links resolve to real pages (no 404s, no broken anchors).
- Check all anchor (#) links point to IDs that exist on the page.
- Check all external links are present in the code and not empty href="" or href="#".
- Flag any links that open in a new tab without rel="noopener noreferrer".
- Check navigation links are correct on every page (not just the homepage).
- Check footer links, social icons, and legal links (Privacy, Terms).

## 5. PERFORMANCE & SPEED
- Check all images are optimised: flag any PNG/JPG over 200kb, any image not using modern formats (WebP/AVIF).
- Check for render-blocking resources (synchronous scripts in <head> without defer/async).
- Check fonts are loaded efficiently (font-display: swap, preconnect for external fonts).
- Check for unused CSS or large CSS files that could be split.
- Check for large JavaScript bundles or unused scripts.
- Check for missing lazy loading on below-the-fold images.
- Check <head> for correct preload, prefetch, or preconnect hints where appropriate.

## 6. GLOBAL STYLING CONSISTENCY
- Extract every unique font-family used across all CSS files and inline styles. Flag any not defined in the global stylesheet.
- Extract every font-size used. Flag any that fall outside the defined type scale, or where a scale doesn't exist, flag inconsistencies.
- Extract every font-weight used. Flag anything outside the intended set.
- Extract every colour value (hex, rgb, hsl, CSS variable). Flag duplicates with slight variations (e.g. #333 vs #333333 vs #33333), near-matches, and any colour not defined as a CSS variable or design token.
- Check line-height, letter-spacing, and text-transform are applied consistently for equivalent elements.
- Check spacing (margin, padding) uses a consistent scale or system — flag arbitrary one-off values.
- Check border-radius is consistent across similar components.
- Check button styles are consistent across all pages.
- Check heading styles (h1–h4) are consistent across all pages.
- Check link styles (default, hover, active, visited) are consistent.

## 7. SEO & METADATA
- Check every page has a unique, descriptive <title> tag.
- Check every page has a <meta name="description">.
- Check all images have descriptive alt attributes (not empty unless decorative).
- Check heading hierarchy is correct (one h1 per page, logical h2/h3 nesting).
- Check for canonical tags where needed.
- Check robots.txt and sitemap.xml exist if this is a public site.
- Check Open Graph tags (og:title, og:description, og:image) are present.

## 8. ACCESSIBILITY
- Check all images have appropriate alt text.
- Check all form inputs have associated <label> elements.
- Check colour contrast for body text, headings, and interactive elements (aim for WCAG AA — 4.5:1 for normal text, 3:1 for large).
- Check all interactive elements are keyboard navigable and have visible focus styles.
- Check ARIA roles and attributes are used correctly where present (not misused or overused).
- Check skip-to-content link exists for keyboard users.
- Check videos have captions or transcripts if present.

## 9. FORMS & FUNCTIONALITY
- Check all forms have proper validation (required fields, type constraints, pattern matching).
- Check form error states are visible and descriptive.
- Check form submission behaviour — does it post, fetch, or redirect correctly?
- Check any JavaScript-powered interactions (modals, dropdowns, sliders, tabs) work as expected.
- Check console for any JavaScript errors in the source code.
- Check no API keys, tokens, or sensitive credentials are exposed in client-side code or comments.

## 10. CODE QUALITY
- Check HTML is valid: no unclosed tags, no duplicate IDs, no deprecated elements (<center>, <font>, etc.).
- Check CSS for redundant rules, duplicate declarations, or overrides that cancel each other out.
- Check JavaScript for console.log statements left in production code.
- Check for commented-out blocks of code left in files.
- Check file and folder naming is consistent (kebab-case, no spaces, logical grouping).
- Check assets folder structure is organised.

## 11. GDPR & COOKIE COMPLIANCE
- Check a cookie consent banner or CMP (Consent Management Platform) is present and appears before any non-essential cookies are set.
- Check the banner offers a genuine choice — accept and reject options must be equally prominent. A pre-ticked "Accept all" with no easy reject is non-compliant.
- Check that closing or dismissing the banner without consenting does not set non-essential cookies.
- Check cookies are categorised correctly: strictly necessary, functional, analytics, marketing. Flag any uncategorised cookies.
- Check a Privacy Policy page exists, is linked from the cookie banner, and covers: what data is collected, why, how long it is retained, third-party sharing, and user rights (access, deletion, portability).
- Check a Cookie Policy or equivalent section in the Privacy Policy lists every cookie by name, purpose, and expiry.
- Check any contact or lead-gen forms include a clear consent statement if data is being processed for marketing — pre-ticked consent boxes are non-compliant.
- Check any third-party scripts (Google Analytics, Facebook Pixel, Hotjar, etc.) are only loaded after explicit user consent, not on page load.
- Check the site doesn't use fingerprinting or other tracking mechanisms that bypass cookie consent.
- Check a mechanism exists for users to withdraw consent as easily as they gave it (e.g. "Manage cookies" link in the footer).
- Check any embedded third-party content (YouTube videos, Google Maps, social feeds) doesn't load tracking cookies before consent is given — these should use privacy-enhanced embeds or lazy-load behind a consent gate.
- Flag if the site targets or is likely to be accessed by users under 13 (or under 16 in some EU states) — additional COPPA/GDPR-K requirements apply.

## 12. BRAND VOICE & TONE CONSISTENCY
- Read all written content across every page and identify the dominant tone of voice (e.g. formal, conversational, expert, friendly, witty, minimal).
- Flag pages or sections where the tone shifts noticeably — e.g. a casual homepage followed by a very stiff contact page.
- Check that the level of formality is consistent: flag mixing of "you" and "one", or shifting between first-person "we" and third-person company name.
- Check sentence length and rhythm is consistent — flag pages that are significantly more dense or clipped than others.
- Check vocabulary is consistent — flag industry jargon used on one page but plain language on another covering the same topic.
- Check CTAs use consistent language and energy — e.g. "Get started" vs "Begin your journey" vs "Submit" on equivalent actions.
- Check the About/team page matches the broader brand personality — this page commonly drifts into overly corporate or informal language.
- Check error messages, form labels, and system copy (confirmation emails, 404 pages) match the brand voice — these are frequently written by a different person and feel jarring.
- Check any testimonials or client quotes are styled consistently and integrate naturally with surrounding copy.
- Flag any copy that makes unsubstantiated superlative claims ("the best", "world-class", "industry-leading") without supporting evidence — these weaken credibility.
- Flag passive voice used where active voice would be clearer and more on-brand.
- If a brand voice guide or tone-of-voice doc exists in the project, cross-reference all copy against it explicitly.

## 13. CROSS-BROWSER & CROSS-DEVICE COMPATIBILITY
- Review all CSS for properties that have known compatibility issues. Check: CSS Grid, Flexbox gap, CSS custom properties (variables), aspect-ratio, clamp(), min(), max(), container queries, :has(), and scroll-driven animations — note which browsers support them and whether fallbacks exist.
- Check all CSS is prefixed correctly where vendor prefixes are still required (e.g. -webkit- for certain transforms and animations).
- Flag any CSS features that are unsupported in Safari 15 or below, as Safari lags on several modern properties.
- Flag use of JavaScript APIs that may not be available in all target browsers: IntersectionObserver, ResizeObserver, fetch, Promise, optional chaining (?.), nullish coalescing (??), ES modules.
- Check that any JavaScript is transpiled or has polyfills if older browser support is required.
- Check all fonts load correctly and have appropriate system font fallbacks in the font stack — do not rely on a single web font with no fallback.
- Check SVGs render correctly across browsers: avoid SVG features with poor cross-browser support, ensure viewBox is set, and check that inline SVGs don't conflict with CSS resets.
- Check all form input types (date, range, color, etc.) degrade gracefully in browsers that don't support them natively.
- Check any CSS animations or transitions have reduced-motion alternatives using @media (prefers-reduced-motion: reduce).
- Check scrollbar styling, if applied, doesn't break layout in Firefox (which handles scrollbar-width differently to WebKit).
- Check the site on both Chrome and Safari rendering engines specifically — these are the two most divergent in behaviour for modern CSS features.
- Check touch interactions work correctly on mobile: tap targets are at least 44×44px, no hover-only interactions that leave mobile users stuck, no elements that require hover to reveal critical content.
- Check the site does not rely on browser-specific behaviour: avoid user-agent sniffing in JS, avoid -webkit-only CSS without standard fallbacks.
- Flag any third-party embeds (maps, video players, social widgets) that may behave differently or break in certain browsers.

## OUTPUT FORMAT

Produce a report with this structure:

AUDIT REPORT — [Site Name] — [Date]
══════════════════════════════════

SUMMARY
- Overall health score: [X/10]
- Critical issues: [count]
- Warnings: [count]
- Passes: [count]

Then for each of the 13 sections above:

[SECTION NAME]
Status: PASS / WARN / FAIL
Issues found:
  - [CRITICAL] Description → File: filename.html, Line: N
  - [WARN] Description → File: filename.css, Line: N
  - [INFO] Description → File: filename.js, Line: N
Recommendations:
  - Specific, actionable fix for each issue.

End with a PRIORITY ACTION LIST — the top 10 things to fix first, ordered by impact.
