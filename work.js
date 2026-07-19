const TABS = ["security", "discord", "tools", "experiments"];

function activateTab(id, { updateHash = true, focusTab = false } = {}) {
  if (!TABS.includes(id)) id = "security";

  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    const on = tab.dataset.tab === id;
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
    if (on && focusTab) tab.focus();
  });

  document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
    panel.hidden = panel.id !== `panel-${id}`;
  });

  if (updateHash) {
    const next = `#${id}`;
    if (location.hash !== next) {
      history.replaceState(null, "", next);
    }
  }
}

function tabFromHash() {
  const raw = (location.hash || "").replace(/^#/, "");
  return TABS.includes(raw) ? raw : "security";
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab, { focusTab: true });
    });

    tab.addEventListener("keydown", (event) => {
      const index = tabs.indexOf(tab);
      let next = -1;

      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;

      if (next >= 0) {
        event.preventDefault();
        activateTab(tabs[next].dataset.tab, { focusTab: true });
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateTab(tab.dataset.tab, { focusTab: true });
      }
    });
  });

  activateTab(tabFromHash(), { updateHash: Boolean(location.hash) });

  window.addEventListener("hashchange", () => {
    activateTab(tabFromHash(), { updateHash: false });
  });

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const scrollTop = document.getElementById("scroll-top");
  const progress = document.querySelector(".scroll-progress");

  if (nav && scrollTop) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 40);
      scrollTop.classList.toggle("visible", y > 400);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progress && total > 0) {
        progress.style.width = `${(y / total) * 100}%`;
      }
    });

    scrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
