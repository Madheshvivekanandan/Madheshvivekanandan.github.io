/* SKILLS MANIFEST GENERATOR — one terminal panel, one row per category */
document.addEventListener("DOMContentLoaded", () => {
  const skillsData = window.PORTFOLIO_DATA.skills;
  const container = document.getElementById("skills-orbit-container");

  const categories = {
    ai: { title: "AI & GenAI Cores", accent: "cyan" },
    backend: { title: "Backend Engines", accent: "violet" },
    frontend: { title: "Frontend Systems", accent: "amber" },
    devops: { title: "DevOps & Tooling", accent: "emerald" },
    databases: { title: "Databases & Storage", accent: "cyan" }
  };

  const total = Object.values(skillsData).reduce((n, list) => n + list.length, 0);

  const rows = Object.keys(skillsData).map(catKey => {
    const skillsList = skillsData[catKey];
    const cat = categories[catKey] || { title: catKey.toUpperCase(), accent: "cyan" };
    return `
      <div class="skill-row accent-${cat.accent}">
        <div class="skill-row-head">
          <span class="skill-row-title">${cat.title}</span>
          <span class="skill-row-count">${skillsList.length} nodes</span>
        </div>
        <div class="cluster-chips">
          ${skillsList.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  const panel = document.createElement("div");
  panel.className = "skills-panel reveal-element";
  panel.innerHTML = `
    <div class="card-header font-mono">
      <span class="card-dot red"></span>
      <span class="card-dot yellow"></span>
      <span class="card-dot green"></span>
      <span class="card-title">SKILLS.MANIFEST</span>
      <span class="skills-total">${total} nodes loaded</span>
    </div>
    ${rows}
  `;

  container.appendChild(panel);

  // Register with scroll reveal engine (runs after scroll-engine.js initializes)
  if (window.ScrollRevealEngine) {
    window.ScrollRevealEngine.observe(panel);
  }
});
