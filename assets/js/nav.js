/* SECTION NAVIGATION ENGINE */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  function scrollToTarget(link) {
    const targetSection = document.querySelector(link.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Smooth scroll for the nav links and the brand mark
  document.querySelectorAll(".nav-item, .nav-brand").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTarget(link);
    });
  });

  // Intersection Observer to track active sections
  const observerOptions = {
    root: null, // Viewport
    rootMargin: "-25% 0px -60% 0px", // Trigger when section occupies core viewport center
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        items.forEach(item => {
          const isCurrent = item.getAttribute("href") === `#${id}`;
          item.classList.toggle("active", isCurrent);
          if (isCurrent) {
            item.setAttribute("aria-current", "location");
          } else {
            item.removeAttribute("aria-current");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Keyboard Shortcuts Bindings (1 - 6)
  document.addEventListener("keydown", (e) => {
    // Ignore when typing in contact form inputs
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return;
    }

    // Ignore while the boot overlay is up — any key there skips the boot instead
    if (document.body.classList.contains("booting")) {
      return;
    }

    const key = e.key;
    if (["1", "2", "3", "4", "5", "6"].includes(key)) {
      e.preventDefault();
      const targetItem = document.querySelector(`.nav-item[data-index="${key}"]`);
      if (targetItem) {
        scrollToTarget(targetItem);
      }
    }
  });
});
