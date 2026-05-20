/* NEURAL PROJECT MAP AND GITHUB INTEGRATION ENGINE */
document.addEventListener("DOMContentLoaded", () => {
  const projectsData = window.PORTFOLIO_DATA.projects;
  const nodesWrap = document.getElementById("project-nodes-wrap");
  const svgCanvas = document.getElementById("project-connections-svg");
  const detailsPanel = document.getElementById("project-details-panel");
  const detailsPlaceholder = detailsPanel.querySelector(".details-panel-placeholder");
  const detailsContent = document.getElementById("project-panel-content");
  
  // Drawer nodes
  const allReposBtn = document.getElementById("view-all-repos-btn");
  const drawerOverlay = document.getElementById("repos-drawer-overlay");
  const drawerClose = document.getElementById("repos-drawer-close");
  const drawerLoading = document.getElementById("drawer-loading");
  const reposGrid = document.getElementById("repos-grid");

  // Coordinates mapping on a 0-100 grid inside parent container
  const nodePositions = {
    o2c: { x: 22, y: 25, glyph: "🏢", cat: "enterprise" },
    analyst: { x: 42, y: 18, glyph: "📊", cat: "enterprise" },
    voice: { x: 18, y: 60, glyph: "🎙️", cat: "ai" },
    rag: { x: 50, y: 48, glyph: "📂", cat: "ai" },
    conversational: { x: 74, y: 28, glyph: "💬", cat: "ai" },
    guvi: { x: 82, y: 58, glyph: "🎓", cat: "ai" },
    singapore: { x: 48, y: 80, glyph: "🇸🇬", cat: "ml" },
    copper: { x: 76, y: 78, glyph: "⚡", cat: "ml" }
  };

  // Connections (edges) between project nodes
  const nodeConnections = [
    { from: "o2c", to: "analyst" },
    { from: "analyst", to: "rag" },
    { from: "rag", to: "voice" },
    { from: "rag", to: "conversational" },
    { from: "conversational", to: "guvi" },
    { from: "rag", to: "singapore" },
    { from: "singapore", to: "copper" }
  ];

  // Render Nodes
  projectsData.forEach(proj => {
    const pos = nodePositions[proj.id];
    if (!pos) return;

    const node = document.createElement("div");
    node.className = `project-node cat-${pos.cat}`;
    node.id = `node-${proj.id}`;
    node.style.left = `${pos.x}%`;
    node.style.top = `${pos.y}%`;
    node.setAttribute("data-id", proj.id);

    node.innerHTML = `
      <span class="node-glyph">${pos.glyph}</span>
      <span class="node-label">${proj.title}</span>
    `;

    nodesWrap.appendChild(node);

    // Click trigger details
    node.addEventListener("click", () => {
      selectProject(proj.id);
    });

    // Hover triggers highlighting connections
    node.addEventListener("mouseenter", () => {
      highlightConnections(proj.id);
    });

    node.addEventListener("mouseleave", () => {
      resetConnections();
    });
  });

  // Draw connecting lines in SVG
  let svgLines = [];

  function drawConnections() {
    svgCanvas.innerHTML = ""; // Clear existing lines
    svgLines = [];
    
    const rect = svgCanvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    nodeConnections.forEach(conn => {
      const fromPos = nodePositions[conn.from];
      const toPos = nodePositions[conn.to];
      if (!fromPos || !toPos) return;

      // Absolute pixel coordinates inside SVG bounding box
      const x1 = (fromPos.x / 100) * w;
      const y1 = (fromPos.y / 100) * h;
      const x2 = (toPos.x / 100) * w;
      const y2 = (toPos.y / 100) * h;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("class", "conn-line");
      line.setAttribute("data-from", conn.from);
      line.setAttribute("data-to", conn.to);

      svgCanvas.appendChild(line);
      svgLines.push(line);
    });
  }

  // Redraw SVG on resize
  window.addEventListener("resize", drawConnections);
  
  // Set initial timeout so elements render fully in viewport
  setTimeout(drawConnections, 600);

  // Trigger draw after system boots up
  document.addEventListener("neural-system-ready", () => {
    setTimeout(drawConnections, 300);
  });

  // Hover Highlight Logic
  function highlightConnections(projId) {
    svgLines.forEach(line => {
      const from = line.getAttribute("data-from");
      const to = line.getAttribute("data-to");

      if (from === projId || to === projId) {
        line.setAttribute("class", "conn-line highlight");
      } else {
        line.setAttribute("class", "conn-line dimmed");
      }
    });
  }

  function resetConnections() {
    svgLines.forEach(line => {
      line.setAttribute("class", "conn-line");
    });
  }

  // Project Selection / Details Card population
  function selectProject(projId) {
    // Unmark all nodes
    document.querySelectorAll(".project-node").forEach(node => {
      node.classList.remove("active");
    });

    // Mark current node
    const activeNode = document.getElementById(`node-${projId}`);
    if (activeNode) activeNode.classList.add("active");

    const proj = projectsData.find(p => p.id === projId);
    if (!proj) return;

    // Show panel content & hide placeholder
    detailsPlaceholder.classList.add("hidden");
    detailsContent.classList.remove("hidden");

    // Populate contents
    const categoryEl = detailsContent.querySelector(".details-category");
    const titleEl = detailsContent.querySelector(".details-title");
    const techEl = detailsContent.querySelector(".details-tech-row");
    const descEl = detailsContent.querySelector(".details-desc");
    const bulletEl = detailsContent.querySelector(".details-highlights");
    const actionsEl = detailsContent.querySelector(".details-actions");

    categoryEl.innerText = proj.category;
    titleEl.innerText = proj.title;
    
    // Tech pills
    techEl.innerHTML = "";
    proj.tech.forEach(t => {
      const pill = document.createElement("span");
      pill.className = "tech-pill";
      pill.innerText = t;
      techEl.appendChild(pill);
    });

    descEl.innerText = proj.description;

    // Highlights bullets
    bulletEl.innerHTML = "";
    proj.highlights.forEach(h => {
      const li = document.createElement("li");
      li.innerText = h;
      bulletEl.appendChild(li);
    });

    // Action buttons depending on enterprise/github
    actionsEl.innerHTML = "";
    if (proj.type === "internal") {
      const badge = document.createElement("div");
      badge.className = "enterprise-badge";
      badge.innerHTML = "🔒 [LOCAL_PORTAL_ONLY] Enterprise Core System";
      actionsEl.appendChild(badge);
    } else if (proj.link) {
      const link = document.createElement("a");
      link.href = proj.link;
      link.target = "_blank";
      link.className = "btn-terminal";
      link.innerHTML = "&gt; inspect_source_code";
      actionsEl.appendChild(link);
    }
  }

  // ================= GITHUB API FETCH DRAWER =================
  let reposLoaded = false;

  allReposBtn.addEventListener("click", () => {
    drawerOverlay.classList.add("active");
    if (!reposLoaded) {
      fetchGitHubRepositories();
    }
  });

  drawerClose.addEventListener("click", () => {
    drawerOverlay.classList.remove("active");
  });

  drawerOverlay.addEventListener("click", (e) => {
    if (e.target === drawerOverlay) {
      drawerOverlay.classList.remove("active");
    }
  });

  // Language colors configuration
  const langColors = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "Jupyter Notebook": "#DA5B0B",
    Shell: "#89e051"
  };

  function fetchGitHubRepositories() {
    const username = window.PORTFOLIO_DATA.profile.github;
    
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error("Connection anomaly detected during data retrieval.");
        return res.json();
      })
      .then(repos => {
        // Filter out fork repositories and sort by date or stars
        const originalRepos = repos.filter(repo => !repo.fork);
        
        drawerLoading.classList.add("hidden");
        reposGrid.classList.remove("hidden");
        reposGrid.innerHTML = "";

        originalRepos.forEach(repo => {
          const repoCard = document.createElement("div");
          repoCard.className = "repo-item-card";

          const langColor = langColors[repo.language] || "#cccccc";
          const descText = repo.description || "No description provided in node manifest.";

          repoCard.innerHTML = `
            <div class="repo-card-header">
              <a href="${repo.html_url}" target="_blank">
                <span class="repo-name">${repo.name}</span>
              </a>
              <span class="repo-stars">⭐ ${repo.stargazers_count}</span>
            </div>
            <p class="repo-desc">${descText}</p>
            <div class="repo-meta">
              ${repo.language ? `
                <div class="repo-lang">
                  <span class="lang-circle" style="background-color: ${langColor}"></span>
                  <span>${repo.language}</span>
                </div>
              ` : ''}
              <span>UPDATED: ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          `;

          reposGrid.appendChild(repoCard);
        });

        reposLoaded = true;
      })
      .catch(err => {
        drawerLoading.innerHTML = `
          <p class="text-glow-crimson" style="color: var(--accent-crimson)">⚠️ SIGNAL FAIL: ANOMALY DURING TRANSMISSION</p>
          <p style="font-size: 0.75rem; margin-top: 10px">${err.message}</p>
        `;
      });
  }
});
