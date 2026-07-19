# Work Page Tabs & Home Polish — Design Spec

**Date:** 2026-07-19  
**Site:** Jamie Vargas portfolio (static HTML/CSS/JS, GitHub Pages)  
**Status:** Approved in brainstorming — awaiting final spec review before implementation plan

---

## 1. Goal

Add a separate **Work** archive with four category tabs so the homepage stays focused on shipped flagship work, while still surfacing a broader (hybrid-curated) repo set. Fix the awkward hero gap and add a short skills line on home.

## 2. Decisions (locked)

| Decision | Choice |
|----------|--------|
| Where tabs live | Separate `work.html` (Approach A / hash-tabbed Approach 1) |
| Tab labels | Security / Web3 · Discord · Tools · Experiments |
| Curation | Hybrid (C): curated Security / Discord / Tools; looser Experiments |
| Live links | Only URLs verified HTTP 200 at design time |
| Contact form | Out of scope this pass |
| Theme | Keep current dark graphite + teal; Sora + DM Sans |

## 3. Information architecture

### Home — `index.html`

Order unchanged: Hero → About (+ skills line) → Security → Selected projects (4) → Contact.

- Nav: About · Security · Projects · **Work** · Contact (Contact may remain in-page `#contact`; Work → `work.html`)
- Projects footer: **More work →** links to `work.html` (replace raw GitHub repos dump as primary CTA; optional secondary GitHub link ok)
- Featured four stay: TiltCheck, JustTheTip, justthebuilder, CollectClock

### Work — `work.html`

- Same nav/footer chrome as home (Home logo → `index.html` / `#`)
- Title: **Work**
- One-line description: archive of public work by focus
- Tab bar + one visible panel at a time
- Default tab: Security / Web3
- Deep links: `work.html#security` · `#discord` · `#tools` · `#experiments`
- Featured home projects may reappear under their tab with a **Featured** (or **Grant**) label

## 4. Tabs & list UI

### Tabs

- Underline-style tab list (not pills): active = teal underline + brighter label
- Semantics: `role="tablist"`, each control `role="tab"` with `aria-selected`, panels `role="tabpanel"`
- Keyboard: Left/Right (and Home/End) move focus among tabs; Enter/Space activate
- Hash sync on click, initial load, and `hashchange`
- Mobile: tab row may scroll horizontally; no separate hamburger for tabs

### Rows

Same hairline-row pattern as home projects:

- Title · optional label (Featured / Grant / Live)
- One-line description
- Mono tech tags
- Links: **Live** only if URL returns 200 · **Code** always when repo exists

### Density

- Security / Discord / Tools: ~4–8 curated rows each
- Experiments: looser; Code-only rows allowed

## 5. Tab roster (verified Live URLs)

Audit rule: prefer repo `homepage`, then `jmenichole.github.io/<repo>/` when `has_pages`, then README demo URLs. **Live** only if probe returned 200. TiltCheck and JustTheTip declare Pages/homepage but those github.io URLs **404** — Code only until Pages is restored.

### Security / Web3

| Project | Label | Live | Code |
|---------|-------|------|------|
| TiltCheck | Featured | — | https://github.com/jmenichole/tiltcheck |
| JustTheTip | Grant | — | https://github.com/jmenichole/Justthetip |
| CollectClock | Featured | https://tiltcheck-me.github.io/CollectClock/ | https://github.com/jmenichole/CollectClock |
| matchday-relic-blink | — | https://matchday-relic-blink.vercel.app | https://github.com/jmenichole/matchday-relic-blink |
| Stake-Engine-Guidelines-Checker | — | https://jmenichole.github.io/Stake-Engine-Guidelines-Checker/ | https://github.com/jmenichole/Stake-Engine-Guidelines-Checker |

### Discord

| Project | Label | Live | Code |
|---------|-------|------|------|
| justthebuilder | Featured | https://jmenichole.github.io/justthebuilder/ | https://github.com/jmenichole/justthebuilder |
| justthehelper | — | https://jmenichole.github.io/justthehelper/ | https://github.com/jmenichole/justthehelper |
| earncord | — | https://jmenichole.github.io/earncord/ | https://github.com/jmenichole/earncord |
| FreeSpinsChannelBot | — | — | https://github.com/jmenichole/FreeSpinsChannelBot |
| onboarding-discord-bot | — | — | https://github.com/jmenichole/onboarding-discord-bot |
| tiltcheck-royale | — | — | https://github.com/jmenichole/tiltcheck-royale |

### Tools

| Project | Live | Code |
|---------|------|------|
| Portfolio-Necromancer | https://jmenichole.github.io/Portfolio-Necromancer/ | https://github.com/jmenichole/Portfolio-Necromancer |
| Scope-Creep | https://jmenichole.github.io/Scope-Creep/ | https://github.com/jmenichole/Scope-Creep |
| DisposableVM | https://jmenichole.github.io/DisposableVM/ | https://github.com/jmenichole/DisposableVM |
| Template-Craft | https://jmenichole.github.io/Template-Craft/ | https://github.com/jmenichole/Template-Craft |
| Maker-Estimater | https://jmenichole.github.io/Maker-Estimater/ | https://github.com/jmenichole/Maker-Estimater |
| Rate-My-Client | https://jmenichole.github.io/Rate-My-Client/ | https://github.com/jmenichole/Rate-My-Client |

### Experiments

| Project | Live | Code |
|---------|------|------|
| SubRoulette | https://jmenichole.github.io/SubRoulette/ | https://github.com/jmenichole/SubRoulette |
| Museum-Mystery-The-Daily-Artifact | https://jmenichole.github.io/Museum-Mystery-The-Daily-Artifact/ | https://github.com/jmenichole/Museum-Mystery-The-Daily-Artifact |
| Rock-Spotter | https://jmenichole.github.io/Rock-Spotter/ | https://github.com/jmenichole/Rock-Spotter |
| rockspotter | https://rockspotter.vercel.app | https://github.com/jmenichole/rockspotter |
| PorterPlays | https://jmenichole.github.io/PorterPlays/ | https://github.com/jmenichole/PorterPlays |
| porter-plays-leaderboard | https://jmenichole.github.io/porter-plays-leaderboard/ | https://github.com/jmenichole/porter-plays-leaderboard |
| BakeOps | https://bakebot-sigma.vercel.app | https://github.com/jmenichole/BakeOps |
| B.O.T | https://jmenichole.github.io/B.O.T/ | https://github.com/jmenichole/B.O.T |
| Random-Joke-Generator | https://jmenichole.github.io/Random-Joke-Generator/ | https://github.com/jmenichole/Random-Joke-Generator |

### Explicitly excluded

- **Form** — Pages 404  
- **tiltcheckmvp** — Railway homepage 404  
- **trivia.live** — no working public demo  
- **valantis-bug-hunt** — false-positive Live (only linked Portfolio)  
- **vise** — other-org project links, not personal portfolio work  
- Joke-only / empty README noise unless already listed under Experiments  

## 6. Home polish

### Hero gap

Current issue: `.hero { min-height: 100vh; align-items: flex-end }` parks the name at the bottom of a full viewport.

Change:

- Shorter hero (e.g. `min-height: min(72vh, 40rem)` or similar — not full viewport)
- Vertically center `.hero-copy` within the hero band
- Keep full-bleed `assets/hero.svg` + shade
- Preserve reduced-motion behavior

### Skills line

Under About prose (or end of About), one mono line:

`Glider · Solidity · EVM · Burp · Python · Discord.js · Solana · TypeScript`

No pill chips / badge grid.

## 7. Technical approach

| File | Role |
|------|------|
| `index.html` | Nav Work link, skills line, hero structure tweak, More work → |
| `work.html` | Work page markup: tabs + four panels + rows |
| `style.css` | Hero spacing, `.skills-line`, `.tabs` / tab panels, work page spacing |
| `index.js` | Unchanged essentials (nav/scroll/reveal); no tab logic |
| `work.js` | Tab activation, hash sync, keyboard support |
| `README.md` | Note Work page |

Constraints:

- Static GitHub Pages only — no bundler, no GitHub API at runtime  
- Reuse existing dark tokens and project-row styles  
- All `target="_blank"` keep `rel="noopener"`

## 8. Out of scope

- Contact form / Formspree  
- Auto-importing all GitHub repos  
- Restoring TiltCheck / JustTheTip GitHub Pages (link Code only until fixed upstream)  
- Light theme  
- Rewriting project marketing copy beyond short one-liners

## 9. Success criteria

- Homepage still reads Glider-first; no archive dump on home  
- `work.html` tabs switch panels; `#discord` etc. open the right tab on load  
- Every **Live** link on Work returns 200 at ship time (re-probe before merge)  
- Hero no longer has a large empty band above the name on desktop/mobile  
- Skills line present; no new pill/chip clusters  
- Keyboard and `prefers-reduced-motion` respected for new UI  

## 10. Implementation next step

After spec approval: write `docs/superpowers/plans/2026-07-19-work-page-tabs.md` via writing-plans, then implement.
