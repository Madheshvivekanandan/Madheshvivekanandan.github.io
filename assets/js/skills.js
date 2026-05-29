/* SKILLS CONSTELLATION CONSOLE ORBIT GENERATOR */
document.addEventListener("DOMContentLoaded", () => {
  const skillsData = window.PORTFOLIO_DATA.skills;
  const container = document.getElementById("skills-orbit-container");

  const categoryHeaders = {
    ai: "AI & GenAI Cores",
    backend: "Backend Engines",
    frontend: "Frontend Systems",
    devops: "DevOps & Tooling",
    databases: "Databases & Storage"
  };

  const levelPercent = {
    Expert: 95,
    Advanced: 80,
    Intermediate: 65,
    Beginner: 40
  };

  const levelClass = {
    Expert: "level-expert",
    Advanced: "level-advanced",
    Intermediate: "level-intermediate",
    Beginner: "level-beginner"
  };

  // Generate HTML panels programmatically
  Object.keys(skillsData).forEach(catKey => {
    const skillsList = skillsData[catKey];
    const headerTitle = categoryHeaders[catKey] || catKey.toUpperCase();

    const panel = document.createElement("div");
    panel.className = "skill-cluster-panel reveal-element";
    
    panel.innerHTML = `
      <div class="cluster-header">
        <span>${headerTitle}</span>
        <span class="cluster-dot-count">[ ${skillsList.length} Nodes ]</span>
      </div>
      <div class="cluster-orbs-wrap">
        ${skillsList.map(skill => {
          const cls = levelClass[skill.level] || "level-beginner";
          return `
            <div class="skill-orb-row">
              <div>
                <div class="skill-orb-name">${skill.name}</div>
                <div class="skill-orb-level">${skill.level}</div>
              </div>
              <div class="skill-bar-wrap">
                <div class="skill-bar-fill ${cls}" data-width="${levelPercent[skill.level] || 30}"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.appendChild(panel);

    // Register with scroll reveal engine (runs after scroll-engine.js initializes)
    if (window.ScrollRevealEngine) {
      window.ScrollRevealEngine.observe(panel);
    }
  });

  // Intersection Observer to animate skill fills on entry
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate progress bars
        const bars = entry.target.querySelectorAll(".skill-bar-fill");
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute("data-width");
          bar.style.width = `${targetWidth}%`;
        });
      }
    });
  }, { threshold: 0.1 });

  // Select all generated panels to observe
  document.querySelectorAll(".skill-cluster-panel").forEach(p => {
    animObserver.observe(p);
  });
});
