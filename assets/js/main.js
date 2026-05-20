/* MAIN NEURAL SYSTEM ORCHESTRATOR */
document.addEventListener("DOMContentLoaded", () => {
  // Bind orchestrator routines either on boot ready or immediately if skipped
  document.addEventListener("neural-system-ready", initializeSystem);
  
  if (localStorage.getItem("system_booted") === "true") {
    initializeSystem();
  }

  function initializeSystem() {
    // Avoid double instantiation
    if (window.__system_initialized) return;
    window.__system_initialized = true;

    // 1. Load dynamic timeline experience data
    populateExperienceTimeline();

    // 2. Start rotating kinetic taglines ticker
    startTaglineTicker();

    // 3. Start live server mock latency counter in footer
    startLatencyCounter();
  }

  // Populate dynamic experience cards from portfolio-data.js
  function populateExperienceTimeline() {
    const container = document.getElementById("experience-nodes-container");
    if (!container) return;

    const expData = window.PORTFOLIO_DATA.experience;
    container.innerHTML = "";

    expData.forEach((exp, idx) => {
      const card = document.createElement("div");
      card.className = `pipeline-node-card accent-${exp.accent} reveal-element`;
      
      card.innerHTML = `
        <div class="pipeline-joint"></div>
        <div class="node-meta">
          <span class="node-company">${exp.company}</span>
          <span class="node-period">${exp.period}</span>
        </div>
        <div class="node-role font-display">${exp.role}</div>
        <div class="node-loc font-mono">${exp.location}</div>
        <ul class="node-bullets">
          ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
      `;

      container.appendChild(card);
    });

    // Fire scroll reveals watch since new items are dynamically loaded
    if (window.ScrollRevealEngine) {
      window.ScrollRevealEngine.refresh();
    }
  }

  // Typewriter rotate taglines ticker logic
  function startTaglineTicker() {
    const tickerText = document.getElementById("ticker-text");
    if (!tickerText) return;

    const phrases = window.PORTFOLIO_DATA.profile.taglines;
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function tick() {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        tickerText.innerText = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35; // Faster deletion
      } else {
        tickerText.innerText = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 70; // Standard writing speed
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2200; // Keep phrase visible for a bit
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400; // Brief pause before typing next
      }

      setTimeout(tick, typingSpeed);
    }

    setTimeout(tick, 1000);
  }

  // Mock server latency counter in footer
  function startLatencyCounter() {
    const latencyEl = document.getElementById("footer-latency");
    if (!latencyEl) return;

    function updateLatency() {
      // Keep varying between 8ms and 16ms
      const val = 8 + Math.floor(Math.random() * 9);
      latencyEl.innerText = `LATENCY: ${val}ms`;
      
      const nextDelay = 3000 + Math.random() * 4000;
      setTimeout(updateLatency, nextDelay);
    }

    updateLatency();
  }
});
