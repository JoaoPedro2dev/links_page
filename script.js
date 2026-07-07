(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const revealEls = document.querySelectorAll("[data-reveal]");
  revealEls.forEach((el, i) => {
    el.style.setProperty("--reveal-delay", `${i * 90}ms`);
  });

  if (!prefersReducedMotion) {
    const cards = document.querySelectorAll(".link-card");
    let pending = null;

    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty("--x", `${x}%`);
          card.style.setProperty("--y", `${y}%`);
          pending = null;
        });
      });
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
