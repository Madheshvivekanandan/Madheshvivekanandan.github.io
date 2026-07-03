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

  // Expansion triggers on buttons, links, interactive objects.
  // Delegated listeners cover dynamically added nodes (GitHub repos, linked chips)
  // without rescanning the whole DOM on every mutation.
  const interactiveSelectors = 'a, button, .project-node, .hub-trigger, .contact-node-link';

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.add("hovering");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.remove("hovering");
    }
  });
});
