/* RADIAL NEURAL NAVIGATION ENGINE */
document.addEventListener("DOMContentLoaded", () => {
  const hub = document.getElementById("neural-hub");
  const trigger = document.getElementById("hub-trigger");
  const menu = document.getElementById("hub-menu");
  const tooltip = document.getElementById("hub-tooltip");
  const items = document.querySelectorAll(".hub-item");
  const sections = document.querySelectorAll("section");

  // SVG Tracking ring math
  const circle = trigger.querySelector("circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius; // Approx 282.74

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  // Toggle Radial menu open/close
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    hub.classList.toggle("active");
    if (hub.classList.contains("active")) {
      tooltip.innerText = "CORES_EXPANDED";
    } else {
      tooltip.innerText = "CORES_COLLAPSED";
    }
  });

  // Close radial menu on scroll or click outside
  window.addEventListener("scroll", () => {
    if (hub.classList.contains("active")) {
      hub.classList.remove("active");
      tooltip.innerText = "CORES_COLLAPSED";
    }
  }, { passive: true });

  document.addEventListener("click", () => {
    if (hub.classList.contains("active")) {
      hub.classList.remove("active");
      tooltip.innerText = "CORES_COLLAPSED";
    }
  });

  // Floating custom tooltips for menu items
  const labelMap = {
    "1": "IDENTITY_NODE",
    "2": "SYSTEM_PROFILE",
    "3": "EXECUTION_TIMELINE",
    "4": "NEURAL_PROJECT_MAP",
    "5": "SKILLS_CONSTELLATION",
    "6": "SIGNAL_TRANSMISSION"
  };

  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      const index = item.getAttribute("data-index");
      tooltip.innerText = labelMap[index] || "NODE_ACTIVE";
      tooltip.style.opacity = "1";
    });

    item.addEventListener("mouseleave", () => {
      tooltip.innerText = hub.classList.contains("active") ? "CORES_EXPANDED" : "Neural Core Ready";
    });

    // Smooth Scroll Navigation on anchor click
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
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
        
        // Update active class in hub menu
        items.forEach(item => {
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
            // Set dynamic scroll sync percentage ring
            const index = parseInt(item.getAttribute("data-index"));
            const totalSections = items.length;
            const progress = index / totalSections;
            const offset = circumference - (progress * circumference);
            circle.style.strokeDashoffset = offset;
            
            tooltip.innerText = `NODE: ${labelMap[index] || id.toUpperCase()}`;
          } else {
            item.classList.remove("active");
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
      const index = parseInt(key);
      const targetItem = document.querySelector(`.hub-item[data-index="${index}"]`);
      if (targetItem) {
        const targetId = targetItem.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
});
