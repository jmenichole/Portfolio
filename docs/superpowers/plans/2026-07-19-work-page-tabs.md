# Work Page Tabs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hash-tabbed `work.html` archive, fix hero gap, add skills line and degen footer tagline, wire home → Work navigation.

**Architecture:** Keep the static three-file site pattern. New `work.html` reuses `style.css` and shared chrome; `work.js` owns tab/hash/keyboard behavior only. Home keeps four featured projects; Work holds hybrid-curated rows from the approved roster.

**Tech Stack:** HTML5, CSS3, vanilla JS, GitHub Pages.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-19-work-page-tabs-design.md`
- Dark graphite theme; no pill-chip clusters
- Live links only when URL returns HTTP 200
- Footer tagline exactly: `made for degens by degens`
- Skills line: `Glider · Solidity · EVM · Burp · Python · Discord.js · Solana · TypeScript`
- No contact form; no bundler; no GitHub API at runtime
- `target="_blank"` always with `rel="noopener"`

---

## File map

| Path | Responsibility |
|------|----------------|
| `index.html` | Nav Work, skills, hero tweak, More work link, footer tagline |
| `work.html` | Work page: tabs + four panels + project rows |
| `work.js` | Tab activation, hash sync, keyboard |
| `style.css` | Hero spacing, skills line, tabs, work layout |
| `README.md` | Mention Work page |

---

### Task 1: Home polish (hero, skills, nav, footer)

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Test: visual + grep checklist

**Interfaces:**
- Consumes: existing dark tokens
- Produces: `.skills-line`, shortened/centered hero, nav link to `work.html`, footer tagline

- [ ] **Step 1: Checklist**

```markdown
# Task 1
- [ ] Hero is not min-height 100vh with flex-end
- [ ] Skills line present under About
- [ ] Nav contains Work → work.html
- [ ] Footer tagline is made for degens by degens
- [ ] More work → points to work.html
```

- [ ] **Step 2: Update nav + footer + skills + more link in `index.html`**

Add Work to nav (before Contact or after Projects):

```html
<li><a href="work.html">Work</a></li>
```

Skills after proof-line in About:

```html
<p class="skills-line">Glider · Solidity · EVM · Burp · Python · Discord.js · Solana · TypeScript</p>
```

Projects more-link:

```html
<a href="work.html">More work →</a>
```

Footer:

```html
<p class="footer-tagline">made for degens by degens</p>
```

- [ ] **Step 3: Hero + skills CSS**

```css
.hero {
    min-height: min(72vh, 40rem);
    align-items: center;
    padding: calc(var(--nav-h) + 2.5rem) 0 3rem;
}

.skills-line {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.02em;
    margin: 1.25rem 0 0;
}
```

- [ ] **Step 4: Verify + commit**

```bash
rg -n "made for degens by degens|skills-line|work.html|min\(72vh" index.html style.css
git add index.html style.css
git commit -m "feat: polish home hero, skills line, and Work nav"
```

---

### Task 2: Work page markup + tab styles

**Files:**
- Create: `work.html`
- Modify: `style.css`
- Test: open work.html structurally

**Interfaces:**
- Consumes: project-row classes from home
- Produces: `#work-tabs` tablist; panels `#panel-security` etc.; hash ids security/discord/tools/experiments

- [ ] **Step 1: Create `work.html`** with shared head/nav/footer; main contains:

```html
<div class="tabs" id="work-tabs">
  <div class="tablist" role="tablist" aria-label="Work categories">
    <button role="tab" id="tab-security" aria-controls="panel-security" aria-selected="true" data-tab="security">Security / Web3</button>
    <button role="tab" id="tab-discord" aria-controls="panel-discord" aria-selected="false" data-tab="discord" tabindex="-1">Discord</button>
    <button role="tab" id="tab-tools" aria-controls="panel-tools" aria-selected="false" data-tab="tools" tabindex="-1">Tools</button>
    <button role="tab" id="tab-experiments" aria-controls="panel-experiments" aria-selected="false" data-tab="experiments" tabindex="-1">Experiments</button>
  </div>
  <!-- four tabpanels with project-grid rows from spec roster -->
</div>
<script src="work.js"></script>
```

Populate rows from spec §5 exactly (Live only where listed).

- [ ] **Step 2: Tab CSS** — underline active state, horizontal scroll on small screens, hide inactive panels with `[hidden]` or `.is-hidden`.

- [ ] **Step 3: Commit**

```bash
git add work.html style.css
git commit -m "feat: add work.html archive with category tab markup"
```

---

### Task 3: `work.js` hash tabs + keyboard

**Files:**
- Create: `work.js`
- Test: manual hash + keyboard checklist

**Interfaces:**
- Consumes: `[data-tab]` buttons, `#panel-*` panels
- Produces: `activateTab(id)` updating aria, hash, visibility

- [ ] **Step 1: Implement**

```js
const TABS = ["security", "discord", "tools", "experiments"];

function activateTab(id, { updateHash = true } = {}) {
  if (!TABS.includes(id)) id = "security";
  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    const on = tab.dataset.tab === id;
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
  });
  document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
    panel.hidden = panel.id !== `panel-${id}`;
  });
  if (updateHash) {
    history.replaceState(null, "", `#${id}`);
  }
}
// click, hashchange, keydown Left/Right/Home/End, DOMContentLoaded from location.hash
```

- [ ] **Step 2: Verify** `work.html#tools` shows Tools; arrows move selection.

- [ ] **Step 3: Commit**

```bash
git add work.js
git commit -m "feat: add hash-synced accessible work tabs"
```

---

### Task 4: Live URL re-probe + README + final QA

**Files:**
- Modify: `README.md`
- Possibly fix any Live URLs that fail re-probe

- [ ] **Step 1: Re-probe every Live href on work.html; remove Live link if not 200**

- [ ] **Step 2: README note about Work page**

- [ ] **Step 3: Final checklist**

```markdown
- [ ] Home hero gap fixed
- [ ] Skills + footer tagline
- [ ] work.html four tabs + deep links
- [ ] All Live links 200
- [ ] No Syne / paper theme regressions
```

- [ ] **Step 4: Commit**

```bash
git add README.md work.html
git commit -m "docs: note Work page; verify Live links"
```

---

## Spec coverage

| Spec item | Task |
|-----------|------|
| work.html + 4 tabs | 2–3 |
| Hybrid roster + Live 200 | 2, 4 |
| Hero gap | 1 |
| Skills line | 1 |
| Footer degen tagline | 1 |
| Nav / More work | 1 |
| Hash + a11y tabs | 3 |
