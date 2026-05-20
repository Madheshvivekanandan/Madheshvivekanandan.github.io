/* DYNAMIC TRAILING CURSOR ENGINE */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  const dot = cursor.querySelector(".cursor-dot");
  const ring = cursor.querySelector(".cursor-ring");

  // Detect touch devices to shut down custom cursor
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice || window.innerWidth <= 768) {
    cursor.style.display = "none";
    return;
  }

  // Add global class to body to hide browser default cursor
  document.body.classList.add("custom-cursor-active");

  let mouseX = -100;
  let mouseY = -100;
  
  // Real coordinates of ring (trailing coordinates)
  let ringX = -100;
  let ringY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instantly move center dot
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Animation loop to make the ring lag smoothly (lerp / linear interpolation)
  function lerpRing() {
    // 0.15 is the lag coefficient (higher means less lag, lower means more trailing)
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(lerpRing);
  }
  
  lerpRing();

  // Expansion triggers on buttons, links, interactive objects
  const interactiveSelectors = 'a, button, .project-node, .hub-trigger, .contact-node-link';
  
  function addHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelectors);
    targets.forEach(target => {
      // Avoid duplicate listeners
      if (target.getAttribute("data-cursor-bound") === "true") return;
      target.setAttribute("data-cursor-bound", "true");

      target.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
      });
      target.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
      });
    });
  }

  // Run on start
  addHoverListeners();

  // Watch DOM for dynamically loaded nodes (like GitHub repos) to bind hover listeners
  const observer = new MutationObserver(addHoverListeners);
  observer.observe(document.body, { childList: true, subtree: true });
});
