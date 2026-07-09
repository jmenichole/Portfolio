document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const scrollTop = document.getElementById("scroll-top");
  const progress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    scrollTop.classList.toggle("visible", y > 400);

    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && total > 0) {
      progress.style.width = `${(y / total) * 100}%`;
    }
  });

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

  scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".section, .hero-card, .feature-card, .project-card").forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  initGlitter();
});

function initGlitter() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const field = document.getElementById("glitter-field");
  if (!field) return;

  const colors = ["#ffffff", "#e8c468", "#3dd6c6", "#a78bfa"];
  const count = 14;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.style.left = `${8 + Math.random() * 84}%`;
    el.style.top = `${6 + Math.random() * 42}%`;
    el.style.setProperty("--size", `${2 + Math.random() * 2.5}px`);
    el.style.setProperty("--duration", `${3 + Math.random() * 4}s`);
    el.style.setProperty("--delay", `${Math.random() * 5}s`);
    el.style.setProperty("--peak", `${0.35 + Math.random() * 0.45}`);
    el.style.setProperty("--sparkle-color", colors[i % colors.length]);
    field.appendChild(el);
  }
}
