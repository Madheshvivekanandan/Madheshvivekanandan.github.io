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
      <div class="cluster-chips">
        ${skillsList.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
      </div>
    `;

    container.appendChild(panel);

    // Register with scroll reveal engine (runs after scroll-engine.js initializes)
    if (window.ScrollRevealEngine) {
      window.ScrollRevealEngine.observe(panel);
    }
  });
});
