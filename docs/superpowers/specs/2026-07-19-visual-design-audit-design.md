# Portfolio Visual Design Audit & Redesign Spec

**Date:** 2026-07-19  
**Site:** Jamie Vargas portfolio (`index.html`, `style.css`, `index.js`)  
**Stack:** Static HTML / CSS / vanilla JS (GitHub Pages)  
**Status:** Spec for review — no implementation in this change set

---

## 1. Current state (context)

Personal portfolio positioned around Web3 security research (Glider #1), with secondary product work (TiltCheck, JustTheTip, etc.). Recent commits redesigned content around Glider and added glitter/shimmer motion.

**First viewport today:** fixed nav → two-column hero (copy + “Latest” card) → dark teal radial wash → sparkle field.

**Below fold:** About + stat cards → Security feature card + chip pills → 6 project cards → contact cards → footer.

---

## 2. Audit criteria

Audited against the frontend visual-design hard rules used for branded / promotional surfaces:

| Rule | Pass / Fail | Notes |
|------|-------------|-------|
| One composition (not a dashboard) | Partial | Hero is a mini layout (copy + promo card), not one plane |
| Brand-first hero | Partial | Name is large, but eyebrow + side card compete |
| Brand test (remove nav) | Weak | Without nav, page still reads as generic dark “security portfolio” |
| Expressive typography | Partial | DM Sans / IBM Plex Mono avoid Inter, but feel default-safe |
| Atmospheric background | Fail | Mostly flat `#0c0f12`; gradient + sparkles ≠ atmosphere |
| Full-bleed hero visual | Fail | No edge-to-edge image/visual plane; side card is inset |
| Hero budget | Fail | Eyebrow + name + lead + 3 CTAs + Latest card |
| No hero overlays / promo stickers | Fail | “Latest” card is a detached promo in the hero |
| Default: no cards (never in hero) | Fail | Hero card, stats, feature, projects, contact all carded |
| One job per section | Partial | About = bio + stats; Security = case study + chip cluster |
| Real visual anchor | Fail | No product/place/atmosphere image; glitter is decoration |
| Reduce clutter | Fail | Pills, badges, stats, multi-CTA, sparkles |
| Intentional motion (2–3) | Over | Shimmer, sweep, badge glow, sparkles, reveal — glow-heavy |
| Avoid dark / purple / glow / pills bias | Fail | Dark-first, purple badge, glow shadows, rounded-full chips |
| Desktop + mobile load | Pass | Responsive nav + stacked grids exist |

---

## 3. Severity-ranked findings

### P0 — Hero composition

1. **Hero is a two-column dashboard**, not one composition. The right-hand `hero-card` violates “never use cards in the hero” and “full-bleed hero only.”
2. **Hero budget exceeded.** Secondary marketing (`#1 Glider…`) belongs in Security, not the first viewport.
3. **No real visual anchor.** Decorative radial gradient + 14 sparkles do not show product, place, or craft atmosphere.
4. **Three equal-weight CTAs** dilute the primary action (“Security work”).

### P1 — Visual system

5. **Dark-mode default + purple accent + glow** matches common AI-portfolio clustering the rules explicitly avoid.
6. **Chip row / badge clusters** add pill clutter without aiding decision-making.
7. **Stat strip in About** pulls attention into metrics before the narrative finishes one job.
8. **Typography is competent but not distinctive** for a security-researcher brand; display face could carry more identity.

### P2 — Section craft

9. **Project grid is uniformly carded** even where a simple linked list/stack would read cleaner; cards are justified only where they aid scanning of interactive items — keep sparse, not wallpapered.
10. **Contact blocks are surface cards** for simple mailto/links; borders/surfaces can drop without losing affordance.
11. **Motion stack is noisy** (name shimmer + card sweep + badge glow + sparkles). Prefer 2–3 purposeful motions with `prefers-reduced-motion` already respected.

### What’s working (keep)

- Clear information architecture: About → Security → Projects → Contact.
- Strong proof point already in content (#1 Glider, Legendary/Epic).
- Mono for technical labels fits the security voice.
- Mobile nav toggle and reveal-on-scroll are useful if motion is reduced.
- Static stack — no framework rewrite required.

---

## 4. Goals & success criteria

**Goals**

1. First viewport reads as one branded composition: name dominant, one line of proof, one primary CTA, one full-bleed visual plane.
2. Visual system feels intentional for a Glider/security builder — not generic dark SaaS.
3. Sections each do one job; proof and projects stay scannable without card wallpaper.
4. Motion supports presence (2–3 effects), not ornament.

**Success criteria**

- Brand test: remove nav → still unmistakably “Jamie Vargas / Glider security.”
- Hero contains only: brand, one headline/proof line, one short sentence, one CTA group (≤2), dominant visual — no Latest card, no stats, no chips.
- No cards in the hero; project interactions may use restrained containers only if removing them hurts scanability.
- Color direction defined via CSS variables; purple glow/pill clusters removed or demoted.
- Mobile: hero remains one composition; no horizontal overflow; tap targets ≥44px.

**Out of scope**

- Framework migration (React/Next).
- New CMS or build pipeline.
- Rewriting all project copy.
- Adding a blog.

---

## 5. Approaches considered

### Approach A — Surgical polish

Keep layout; soften glitter; move Latest card below fold; trim CTAs; restyle chips.

- **Pros:** Minimal diff; low risk.  
- **Cons:** Still dark-generic; still no real visual anchor; hero remains two-column.  
- **Verdict:** Insufficient against P0 findings.

### Approach B — Composition redesign (recommended)

Keep static stack and IA. Rebuild hero as full-bleed visual + brand stack. Move Glider proof into Security. Replace card wallpaper with typographic hierarchy; redefine tokens (light-leaning or high-contrast ink-on-paper security aesthetic — **not** purple-on-white, cream/terracotta, or broadsheet). Reduce motion to 2–3 intentional effects.

- **Pros:** Fixes P0/P1 without rebuild; matches rules; content already strong.  
- **Cons:** Larger CSS/HTML pass; needs one real visual asset.  
- **Verdict:** Best impact / risk ratio.

### Approach C — Full rebrand + content cut

New type, light theme, cut projects to top 3, case-study-first narrative site.

- **Pros:** Highest distinctiveness.  
- **Cons:** Scope creep; content strategy beyond visual audit.  
- **Verdict:** Defer; can follow B later.

**Recommendation:** Approach B.

---

## 6. Recommended design (Approach B)

### 6.1 Visual direction — “Signal / Terminal”

A high-signal security-research surface: cool graphite ink, paper-adjacent light field with depth (subtle grain or soft diagonal wash — not flat white), single accent in **oxidized teal / verification cyan** (retain spirit of current `#3dd6c6` but rebalance for light). Gold reserved only for Legendary proof, used sparingly as text/underline — no glow. No purple. No rounded-full pills.

**CSS tokens (target)**

```css
:root {
  --bg: #e9ece8;              /* cool paper, not cream #F4F1EA */
  --bg-deep: #12181f;         /* ink band for hero or footer */
  --surface: transparent;     /* prefer no filled cards */
  --border: rgba(18, 24, 31, 0.12);
  --text: #12181f;
  --muted: #4a5560;
  --accent: #0d8f82;          /* oxidized teal */
  --accent-soft: rgba(13, 143, 130, 0.12);
  --proof: #9a7424;           /* Legendary gold as ink, not glow */
  --font-display: /* distinctive display — see type */;
  --font-body: /* paired body */;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}
```

**Typography**

- Display: expressive face for the name only (e.g. **Syne**, **Instrument Serif**, or **Space Grotesk** at display sizes — pick one; do not use Inter/Roboto/Arial/system as primary).
- Body: humanist sans distinct from display (e.g. **Source Sans 3** or keep **DM Sans** only as body if display carries brand).
- Mono: keep IBM Plex Mono for code/labels.

### 6.2 Hero (first viewport)

**One composition:**

1. Full-bleed visual plane (background): abstract but grounded — e.g. darkened terminal/query editor crop, Glider-adjacent pattern, or custom SVG lattice suggesting query graphs. Must feel like *security craft*, not stock neon.
2. Brand: **Jamie Vargas** as the dominant type signal (display size).
3. One proof line (not a card): e.g. `#1 Glider Query Database · Legendary + Epic`.
4. One short supporting sentence (current lead, tightened).
5. CTA group: primary `Security work` + secondary `GitHub` only (drop LinkedIn from hero; keep in Contact/nav).

**Remove from hero:** eyebrow-as-hero-lead, Latest card, glitter field as primary atmosphere, third CTA.

**Motion (2–3):**

1. Soft entrance of brand + proof (opacity/translate, once).
2. Slow ambient drift or grain on the hero visual (subtle).
3. Optional underline/draw on primary CTA hover.

Drop: sparkle particles, badge glow, card sweep, continuous name shimmer (or replace shimmer with a one-shot entrance).

### 6.3 Sections

| Section | One job | Treatment |
|---------|---------|-----------|
| About | Who + why security | Prose only; move stats into a single inline proof sentence or drop |
| Security | Glider case study | Feature as typographic block with mono code snippets; badges as plain mono labels (no glow); chips → short comma list or omit |
| Projects | Selected work | Prefer stacked rows or 2-col list with title / one line / links; avoid identical bordered cards unless needed for scan |
| Contact | Reach out | Plain linked lines or a single CTA mailto; no surface cards |

### 6.4 Nav / chrome

- Logo can stay `JV` or expand to short name on desktop.
- Scroll progress may stay if restyled to accent (no purple gradient).
- Scroll-top button: keep, square/soft-rect, no circular pill glow.

### 6.5 Accessibility

- Preserve `prefers-reduced-motion` kill-switch.
- Contrast: body text on paper ≥ 4.5:1; hero text on deep band ≥ 4.5:1.
- Focus rings visible on all interactive elements.

### 6.6 Assets required

- One hero visual (optimized WebP/AVIF + JPEG fallback), full-bleed capable, ≤ ~200KB target.
- Optional subtle noise SVG/PNG for paper texture (very light opacity).

---

## 7. File impact (implementation later)

| File | Change |
|------|--------|
| `index.html` | Restructure hero; demote Latest into Security; trim CTAs/chips/stats; asset markup |
| `style.css` | New tokens, hero full-bleed, reduce card surfaces, restyle sections, motion trim |
| `index.js` | Remove or gate glitter; keep nav/scroll/reveal essentials |
| `assets/` (new) | Hero image + optional texture |
| `README.md` | Note visual direction / local preview unchanged |

---

## 8. Risks & constraints

- Light redesign must not look like the banned cream/terracotta serif cluster — keep cool graphite + oxidized teal.
- Hero photo/illustration must not become an inset rounded media card.
- Content strength (#1 Glider) must remain obvious — just not as a hero promo card.
- Keep GitHub Pages static deploy path.

---

## 9. Approval gate

This spec recommends **Approach B — Composition redesign (“Signal / Terminal”)**.

Implementation plan: `docs/superpowers/plans/2026-07-19-portfolio-visual-redesign.md`.

Please review this spec and call out any constraint changes (must stay dark, must keep glitter, must keep all six project cards, etc.) before implementation.
