/* SCROLL ENGINE - INTERSECTION REVEALS */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal-element");

  const revealOptions = {
    root: null, // Viewport
    rootMargin: "0px 0px -10% 0px", // Trigger slightly before element is in full view
    threshold: 0.15 // 15% visibility required
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        
        // Stop observing once revealed to preserve performance
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
