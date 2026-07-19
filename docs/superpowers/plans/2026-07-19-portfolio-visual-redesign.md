# Portfolio Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio first viewport and visual system so the site reads as one branded “Signal / Terminal” composition, with Glider proof below the fold and card/glow clutter removed.

**Architecture:** Stay on the static three-file site (`index.html`, `style.css`, `index.js`) plus a new `assets/` folder for the hero visual. No framework. Tokens and layout change in CSS; structure and copy hierarchy change in HTML; glitter particle system removed or reduced to optional CSS-only ambience.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Google Fonts, GitHub Pages.

## Global Constraints

- Follow spec: `docs/superpowers/specs/2026-07-19-visual-design-audit-design.md` (Approach B).
- No cards in the hero; hero is full-bleed visual + brand stack only.
- Hero budget: brand, one proof line, one short sentence, ≤2 CTAs, dominant visual — nothing else.
- Avoid: purple accents, glow shadows, rounded-full pill chips, cream `#F4F1EA` + terracotta + serif broadsheet look, Inter/Roboto/Arial as primary.
- Color direction: cool paper + graphite ink + oxidized teal; gold only as Legendary ink.
- Motion: at most 3 intentional effects; honor `prefers-reduced-motion`.
- Keep static GitHub Pages deploy (no bundler required).
- Preserve IA order: About → Security → Projects → Contact.
- Do not rewrite project descriptions beyond structural markup changes.

---

## File map

| Path | Responsibility |
|------|----------------|
| `index.html` | Document structure, hero composition, section markup, font links, asset references |
| `style.css` | Design tokens, layout, section styles, motion, responsive rules |
| `index.js` | Nav, scroll progress, scroll-top, reveal observer; no glitter field |
| `assets/hero.webp` (or `.jpg`) | Full-bleed hero visual |
| `assets/noise.png` (optional) | Subtle paper grain |
| `README.md` | Stack / preview notes only if assets path needs mention |

---

### Task 1: Tokens, fonts, and chrome baseline

**Files:**
- Modify: `style.css` ( `:root` through nav / body )
- Modify: `index.html` (Google Fonts `<link>` in `<head>`)
- Test: manual — `python -m http.server 8000` + checklist below

**Interfaces:**
- Consumes: none
- Produces: CSS custom properties `--bg`, `--bg-deep`, `--text`, `--muted`, `--accent`, `--accent-soft`, `--proof`, `--border`, `--font-display`, `--font-body`, `--font-mono`, `--nav-h` used by later tasks

- [ ] **Step 1: Write a failing checklist for tokens**

Create `docs/superpowers/checklists/visual-redesign-task1.md` with:

```markdown
# Task 1 verification
- [ ] `:root` defines --bg, --bg-deep, --text, --muted, --accent, --proof (no --purple)
- [ ] Body background is paper-toned, not #0c0f12
- [ ] Fonts link includes a display family + body family (not Inter/Roboto/Arial alone)
- [ ] Scroll progress gradient does not use purple
```

- [ ] **Step 2: Confirm checklist currently fails**

Run:

```bash
rg -n "--purple|#0c0f12|#a78bfa" style.css
rg -n "fonts.googleapis.com" index.html
```

Expected: current dark/purple tokens still present; checklist items unchecked.

- [ ] **Step 3: Update font link in `index.html`**

Replace the existing Google Fonts href with (example — Syne display + Source Sans 3 body + IBM Plex Mono):

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 4: Replace `:root` and body/nav base in `style.css`**

```css
:root {
    --bg: #e9ece8;
    --bg-deep: #12181f;
    --bg-alt: #dfe4df;
    --surface: transparent;
    --border: rgba(18, 24, 31, 0.12);
    --text: #12181f;
    --muted: #4a5560;
    --accent: #0d8f82;
    --accent-soft: rgba(13, 143, 130, 0.12);
    --proof: #9a7424;
    --radius: 4px;
    --font-display: "Syne", system-ui, sans-serif;
    --font-body: "Source Sans 3", system-ui, sans-serif;
    --font-mono: "IBM Plex Mono", ui-monospace, monospace;
    --nav-h: 64px;
}

body {
    margin: 0;
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

.nav {
    background: rgba(233, 236, 232, 0.88);
    /* keep blur; border on scroll uses --border */
}

.logo {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--text);
}

.scroll-progress {
    background: var(--accent);
}
```

Remove unused `--gold` / `--purple` if nothing references them after later tasks (leave temporarily only if needed mid-migration).

- [ ] **Step 5: Re-run checklist commands**

```bash
rg -n "--purple|#a78bfa" style.css || true
rg -n "--bg: #e9ece8|--accent: #0d8f82|Syne" style.css index.html
```

Expected: no purple token usage remaining in chrome; new tokens and Syne present. Mark Task 1 checklist items done.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css docs/superpowers/checklists/visual-redesign-task1.md
git commit -m "style: establish Signal/Terminal tokens and fonts"
```

---

### Task 2: Hero composition (full-bleed + brand stack)

**Files:**
- Create: `assets/hero.jpg` (or `.webp`) — place a real security-craft visual before wiring
- Modify: `index.html` (header.hero block)
- Modify: `style.css` (hero rules; remove `.hero-card` hero usage)
- Modify: `index.js` (stop `initGlitter` / remove glitter field dependency)
- Test: visual checklist at 1280px and 390px widths

**Interfaces:**
- Consumes: tokens from Task 1
- Produces: `.hero` full-bleed structure; `.hero-proof`, `.hero-lead`, `.hero-cta` with ≤2 links; no `.hero-card` in markup

- [ ] **Step 1: Add failing structure checklist**

`docs/superpowers/checklists/visual-redesign-task2.md`:

```markdown
# Task 2 verification
- [ ] No element with class hero-card inside header.hero
- [ ] Hero has a full-bleed visual (img or CSS background covering hero)
- [ ] Exactly one h1 (Jamie Vargas)
- [ ] Hero CTA count ≤ 2
- [ ] glitter-field absent or empty / initGlitter not called
- [ ] First viewport has no stat-grid and no chip-row
```

- [ ] **Step 2: Confirm failure**

```bash
rg -n "hero-card|glitter-field|initGlitter" index.html index.js
```

Expected: matches present.

- [ ] **Step 3: Add hero asset**

Place optimized image at `assets/hero.jpg` (target ≤200KB). If a custom asset is unavailable in the environment, use a generative SVG saved as `assets/hero.svg` depicting a cool graphite query-lattice (no neon purple). Reference that path in markup.

Example minimal SVG lattice (acceptable interim):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
  <rect width="1600" height="900" fill="#12181f"/>
  <g stroke="#0d8f82" stroke-opacity="0.35" fill="none" stroke-width="1">
    <path d="M0 200 H1600 M0 450 H1600 M0 700 H1600"/>
    <path d="M200 0 V900 M500 0 V900 M800 0 V900 M1100 0 V900 M1400 0 V900"/>
  </g>
  <circle cx="800" cy="450" r="6" fill="#0d8f82"/>
  <circle cx="500" cy="200" r="4" fill="#9a7424"/>
  <circle cx="1100" cy="700" r="4" fill="#e9ece8" fill-opacity="0.5"/>
</svg>
```

- [ ] **Step 4: Replace hero markup in `index.html`**

```html
<header class="hero">
    <div class="hero-media" aria-hidden="true">
        <img src="assets/hero.svg" alt="" width="1600" height="900">
    </div>
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="container hero-copy">
        <h1>Jamie Vargas</h1>
        <p class="hero-proof">#1 Glider Query Database · Legendary + Epic</p>
        <p class="hero-lead">
            I formalize attack patterns as executable queries, build Discord-first products,
            and ship automation that survives triage — not just demos.
        </p>
        <div class="hero-cta">
            <a href="#security" class="btn btn-primary">Security work</a>
            <a href="https://github.com/jmenichole" class="btn btn-ghost" target="_blank" rel="noopener">GitHub</a>
        </div>
    </div>
</header>
```

Remove: `glitter-field` div, eyebrow, `hero-grid`, `hero-card` block.

- [ ] **Step 5: Replace hero CSS**

```css
.hero {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: flex-end;
    padding: calc(var(--nav-h) + 2rem) 0 4rem;
    color: #e9ece8;
    overflow: hidden;
    background: var(--bg-deep);
}

.hero-media {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.hero-shade {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
        180deg,
        rgba(18, 24, 31, 0.35) 0%,
        rgba(18, 24, 31, 0.72) 55%,
        rgba(18, 24, 31, 0.92) 100%
    );
}

.hero-copy {
    position: relative;
    z-index: 2;
    max-width: 40rem;
}

.hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 0.95;
    margin: 0 0 1rem;
    color: #e9ece8;
    background: none;
    animation: none;
}

.hero-proof {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: #d6b15a;
    margin: 0 0 1rem;
}

.hero-lead {
    color: rgba(233, 236, 232, 0.78);
    font-size: 1.125rem;
    margin: 0 0 1.75rem;
}

.hero .btn-ghost {
    border-color: rgba(233, 236, 232, 0.35);
    color: #e9ece8;
}
```

Delete unused `.hero-card`, `.glitter-card`, `.hero-card-label`, `.eyebrow` rules once markup is gone (or leave unreferenced briefly until Task 5 cleanup).

- [ ] **Step 6: Strip glitter from JS and HTML**

In `index.js`, remove the `initGlitter()` call and the entire `initGlitter` function. Remove `#glitter-field` from HTML if still present. Remove `.glitter-field` / `.sparkle` / related keyframes in a later cleanup task if not already deleted.

- [ ] **Step 7: Verify checklist**

```bash
rg -n "hero-card|glitter-field|initGlitter" index.html index.js || true
rg -n "hero-media|hero-proof" index.html style.css
```

Open `http://localhost:8000` at desktop and mobile widths. Confirm one composition, brand-dominant, full-bleed visual.

- [ ] **Step 8: Commit**

```bash
git add index.html style.css index.js assets/ docs/superpowers/checklists/visual-redesign-task2.md
git commit -m "feat: rebuild hero as full-bleed Signal/Terminal composition"
```

---

### Task 3: About + Security — one job each

**Files:**
- Modify: `index.html` (`#about`, `#security`)
- Modify: `style.css` (about/security/badge/chip rules)
- Test: checklist + local preview

**Interfaces:**
- Consumes: tokens; Glider proof line may duplicate hero proof in richer form
- Produces: About without `.stat-grid`; Security without `.chip-row` and without glow badges

- [ ] **Step 1: Checklist**

```markdown
# Task 3 verification
- [ ] #about contains no .stat-grid
- [ ] #security contains no .chip-row
- [ ] No .glitter-badge class
- [ ] Legendary/Epic rendered as mono text labels, not glowing pills
```

- [ ] **Step 2: Confirm failure on current main-structure leftovers**

```bash
rg -n "stat-grid|chip-row|glitter-badge" index.html
```

- [ ] **Step 3: Simplify About markup**

Keep prose; replace stats with one inline proof sentence at the end of the prose column, e.g.:

```html
<p class="proof-line">
    <span class="mono">#1</span> Glider leaderboard · Legendary + Epic approvals · $5K Superteam grant · 30+ repos
</p>
```

Remove `.stat-grid` entirely.

- [ ] **Step 4: Simplify Security markup**

- Move any unique “Latest” copy into the feature block intro if needed.
- Replace badge spans with:

```html
<p class="label-row">
    <span class="label label-proof">Legendary</span>
    <span class="label">Epic</span>
    <span class="label">Optimization</span>
</p>
```

- Delete `.chip-row`.
- Keep feature list and links; prefer text links over many `.btn` chips.

- [ ] **Step 5: CSS for labels / feature block without card chrome (or minimal rule)**

```css
.section-alt {
    background: var(--bg-alt);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}

.feature-card {
    background: transparent;
    border: none;
    border-top: 2px solid var(--accent);
    border-radius: 0;
    padding: 1.5rem 0;
}

.label-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }

.label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
}

.label-proof { color: var(--proof); }

.proof-line {
    font-size: 0.95rem;
    color: var(--muted);
    border-left: 2px solid var(--accent);
    padding-left: 1rem;
}

.mono { font-family: var(--font-mono); color: var(--accent); }
```

Remove `.chip`, `.badge-purple`, `.glitter-badge`, `.badge-glow` usage.

- [ ] **Step 6: Verify + commit**

```bash
rg -n "stat-grid|chip-row|glitter-badge|badge-purple" index.html style.css || true
git add index.html style.css docs/superpowers/checklists/visual-redesign-task3.md
git commit -m "refactor: simplify About and Security to one job each"
```

---

### Task 4: Projects + Contact declutter

**Files:**
- Modify: `index.html` (`#projects`, `#contact`)
- Modify: `style.css` (project/contact rules)
- Test: checklist

**Interfaces:**
- Consumes: tokens
- Produces: project list that remains linkable; contact as plain links

- [ ] **Step 1: Checklist**

```markdown
# Task 4 verification
- [ ] Project items are not identical heavy surface cards (transparent or hairline only)
- [ ] Contact has no .contact-item filled surface cards
- [ ] All project links still work
```

- [ ] **Step 2: Restyle projects to stacked rows**

Change `.project-grid` to a single column stack (or 2-col from `min-width: 900px`). Markup can keep `<article class="project-card">` class name or rename to `project-row` — if renaming, update JS reveal selector accordingly.

```css
.project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
}

.project-card {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    padding: 1.25rem 0;
}

.project-card:hover {
    border-color: var(--border);
}

.project-card:hover h3 { color: var(--accent); }
```

Keep tags as mono text, not pills:

```css
.tags span {
    background: transparent;
    border-radius: 0;
    padding: 0;
    margin-right: 0.75rem;
}
```

- [ ] **Step 3: Flatten contact**

```html
<ul class="contact-list">
    <li><a href="mailto:jmenichole007@outlook.com">jmenichole007@outlook.com</a></li>
    <li><a href="https://www.linkedin.com/in/jmenichole0" target="_blank" rel="noopener">LinkedIn</a></li>
    <li><a href="https://github.com/jmenichole" target="_blank" rel="noopener">GitHub @jmenichole</a></li>
</ul>
```

```css
.contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.contact-list a {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px solid transparent;
}

.contact-list a:hover {
    color: var(--accent);
    border-bottom-color: var(--accent);
}
```

- [ ] **Step 4: Update reveal selectors in `index.js` if class names changed**

Ensure:

```js
document.querySelectorAll(".section, .feature-card, .project-card").forEach((el) => {
  el.classList.add("reveal");
});
```

Do not reveal the whole hero (hero has its own entrance in Task 5).

- [ ] **Step 5: Verify links + commit**

```bash
rg -n "tiltcheck.me|Justthetip|bugbountycursoragent|mailto:jmenichole007" index.html
git add index.html style.css index.js
git commit -m "refactor: declutter projects and contact presentation"
```

---

### Task 5: Motion trim + dead CSS cleanup + final QA

**Files:**
- Modify: `style.css` (keyframes, reveal, scroll-top, delete dead rules)
- Modify: `index.js` (optional hero entrance class)
- Test: full QA checklist

**Interfaces:**
- Consumes: final markup from Tasks 2–4
- Produces: ≤3 motions; clean CSS; reduced-motion safe

- [ ] **Step 1: Final QA checklist file**

`docs/superpowers/checklists/visual-redesign-final.md`:

```markdown
# Final QA
- [ ] Brand test: nav hidden conceptually — name still dominates first viewport
- [ ] No hero cards / stats / chips / Latest promo
- [ ] No purple / glow / rounded-full chips in CSS
- [ ] prefers-reduced-motion disables animations
- [ ] Mobile nav opens/closes; no horizontal scroll at 390px
- [ ] All external links open with rel=noopener where target=_blank
- [ ] Lighthouse accessibility: contrast OK on paper and hero band
```

- [ ] **Step 2: Keep only three motions**

1. `.reveal` section entrance  
2. `.hero-copy` one-shot fade/rise on load  
3. Primary button hover underline or background shift  

Delete keyframes: `sparkle-twinkle`, `name-shimmer`, `card-sweep`, `badge-glow`.

Example hero entrance:

```css
.hero-copy {
    animation: hero-in 0.8s ease both;
}

@keyframes hero-in {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
    .hero-copy,
    .reveal {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}
```

- [ ] **Step 3: Delete dead CSS**

Remove unused rules for: `.glitter-field`, `.sparkle`, `.hero-card`, `.glitter-card`, `.badge-purple`, `.chip`, `.chip-row`, `.stat`, `.stat-grid`, `.contact-item` (if unused), old dark-only overrides.

```bash
rg -n "glitter|sparkle|badge-purple|chip-row|stat-grid|hero-card" style.css index.html index.js || true
```

Expected: no matches.

- [ ] **Step 4: Restyle scroll-top (no circle pill glow)**

```css
.scroll-top {
    border-radius: 4px;
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
    box-shadow: none;
}
```

- [ ] **Step 5: Run local server and complete Final QA checklist**

```bash
python -m http.server 8000
```

Walk desktop + mobile. Fix any contrast or overflow issues found.

- [ ] **Step 6: Commit**

```bash
git add style.css index.js index.html docs/superpowers/checklists/visual-redesign-final.md
git commit -m "style: trim motion and remove dead portfolio CSS"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Full-bleed hero, no hero cards | Task 2 |
| Hero budget / ≤2 CTAs | Task 2 |
| Signal/Terminal tokens, no purple/glow/pills | Tasks 1, 3, 5 |
| Expressive display type | Task 1 |
| About one job / no stat cards | Task 3 |
| Security typographic case study | Task 3 |
| Projects/contact declutter | Task 4 |
| ≤3 motions + reduced-motion | Task 5 |
| Static Pages deploy preserved | All tasks |
| Real visual anchor asset | Task 2 |

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-19-portfolio-visual-redesign.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks  
2. **Inline Execution** — execute tasks in-session with executing-plans checkpoints  

After spec approval, choose an approach to begin Task 1.
