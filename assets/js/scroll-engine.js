/* SCROLL ENGINE - INTERSECTION REVEALS */
(function () {
  const revealOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // Expose globally so dynamic scripts can register newly added elements
  window.ScrollRevealEngine = {
    observe: (el) => revealObserver.observe(el),
    refresh: () => {
      document.querySelectorAll(".reveal-element:not(.active)").forEach(el => {
        revealObserver.observe(el);
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".reveal-element").forEach(el => {
      revealObserver.observe(el);
    });
  });
})();
