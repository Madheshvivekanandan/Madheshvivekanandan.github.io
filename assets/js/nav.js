/* RADIAL NEURAL NAVIGATION ENGINE */
document.addEventListener("DOMContentLoaded", () => {
  const hub = document.getElementById("neural-hub");
  const trigger = document.getElementById("hub-trigger");
  const currentNum = document.getElementById("hub-current-num");
  const currentLabel = document.getElementById("hub-current-label");
  const items = document.querySelectorAll(".hub-item");
  const sections = document.querySelectorAll("section");

  // SVG ring fills as you move down the page
  const circle = trigger.querySelector("circle");
  const circumference = 2 * Math.PI * circle.r.baseVal.value;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  function setOpen(open) {
    hub.classList.toggle("active", open);
    trigger.setAttribute("aria-expanded", String(open));
  }

  function scrollToTarget(link) {
    const targetSection = document.querySelector(link.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!hub.classList.contains("active"));
  });

  // Mouse users get hover-to-open; a short grace period lets the pointer cross gaps in the sweep
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let closeTimer;
  if (canHover) {
    hub.addEventListener("mouseenter", () => {
      clearTimeout(closeTimer);
      setOpen(true);
    });
    hub.addEventListener("mouseleave", () => {
      closeTimer = setTimeout(() => setOpen(false), 250);
    });
  }

  // Close on outside click, Escape, or scroll
  document.addEventListener("click", (e) => {
    if (hub.classList.contains("active") && !hub.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hub.classList.contains("active")) {
      setOpen(false);
      trigger.focus();
    }
  });

  window.addEventListener("scroll", () => {
    if (hub.classList.contains("active") && !hub.matches(":hover")) setOpen(false);
  }, { passive: true });

  items.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTarget(item);
      setOpen(false);
    });
  });

  // Track the section in view: highlight its item, update the readout and the ring
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");

      items.forEach(item => {
        const isCurrent = item.getAttribute("href") === `#${id}`;
        item.classList.toggle("active", isCurrent);
        if (isCurrent) {
          item.setAttribute("aria-current", "location");
          const index = parseInt(item.getAttribute("data-index"));
          // textContent, not innerText: the items are visibility:hidden while the menu is closed
          currentNum.textContent = item.querySelector(".hub-num").textContent;
          currentLabel.textContent = item.querySelector(".hub-label").textContent;
          circle.style.strokeDashoffset = circumference - (index / items.length) * circumference;
        } else {
          item.removeAttribute("aria-current");
        }
      });
    });
  }, {
    root: null, // Viewport
    rootMargin: "-25% 0px -60% 0px", // Trigger when section occupies core viewport center
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));

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
      const targetItem = document.querySelector(`.hub-item[data-index="${key}"]`);
      if (targetItem) {
        scrollToTarget(targetItem);
      }
    }
  });
});
