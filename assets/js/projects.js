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
    singapore: { x: 44, y: 80, glyph: "🇸🇬", cat: "ml" },
    copper: { x: 78, y: 72, glyph: "⚡", cat: "ml" }
  };

  // Connections (edges) are derived from the projects' tech stacks:
  // two nodes link when they share at least TECH_LINK_THRESHOLD technologies.
  const TECH_LINK_THRESHOLD = 2;

  function normalizeTech(tech) {
    const t = tech.toLowerCase();
    if (t.includes("openai")) return "openai";
    if (t.includes("react")) return "react";
    if (t.includes("llm")) return "llm";
    return t;
  }

  // Map of project id -> Map(normalized tech -> display name)
  const techIndex = {};
  projectsData.forEach(p => {
    const m = new Map();
    p.tech.forEach(t => {
      const key = normalizeTech(t);
      if (!m.has(key)) m.set(key, t);
    });
    techIndex[p.id] = m;
  });

  function sharedTech(aId, bId) {
    const shared = [];
    techIndex[aId].forEach((display, key) => {
      if (techIndex[bId].has(key)) shared.push(display);
    });
    return shared;
  }

  const mappedIds = projectsData.map(p => p.id).filter(id => nodePositions[id]);
  const nodeConnections = [];

  mappedIds.forEach((a, i) => {
    mappedIds.slice(i + 1).forEach(b => {
      const shared = sharedTech(a, b);
      if (shared.length >= TECH_LINK_THRESHOLD) {
        nodeConnections.push({ from: a, to: b, shared });
      }
    });
  });

  // A node sharing too little with everything would float unconnected;
  // link it to its strongest match (preferring same category) so the map stays whole.
  mappedIds.forEach(id => {
    if (nodeConnections.some(c => c.from === id || c.to === id)) return;
    let best = null;
    mappedIds.forEach(other => {
      if (other === id) return;
      const shared = sharedTech(id, other);
      if (!shared.length) return;
      const sameCat = nodePositions[id].cat === nodePositions[other].cat ? 1 : 0;
      if (!best || shared.length > best.shared.length ||
          (shared.length === best.shared.length && sameCat > best.sameCat)) {
        best = { to: other, shared, sameCat };
      }
    });
    if (best) nodeConnections.push({ from: id, to: best.to, shared: best.shared });
  });

  function linkedProjects(projId) {
    return nodeConnections
      .filter(c => c.from === projId || c.to === projId)
      .map(c => ({ id: c.from === projId ? c.to : c.from, shared: c.shared }))
      .sort((a, b) => b.shared.length - a.shared.length);
  }

  let selectedProjectId = null;

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
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.setAttribute("aria-label", `Decode project: ${proj.title}`);

    node.innerHTML = `
      <span class="node-glyph">${pos.glyph}</span>
      <span class="node-label">${proj.title}</span>
    `;

    nodesWrap.appendChild(node);

    // Click trigger details
    node.addEventListener("click", () => {
      selectProject(proj.id);
    });

    // Keyboard activation mirrors click
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectProject(proj.id);
      }
    });

    // Hover/focus previews connections; leaving falls back to the selected node
    node.addEventListener("mouseenter", () => {
      highlightConnections(proj.id);
    });

    node.addEventListener("mouseleave", () => {
      restoreSelectionHighlight();
    });

    node.addEventListener("focus", () => {
      highlightConnections(proj.id);
    });

    node.addEventListener("blur", () => {
      restoreSelectionHighlight();
    });
  });

  // Render Mobile List (map/SVG interactions are hidden on small screens; CSS decides visibility)
  const mobileList = document.getElementById("projects-mobile-list");
  if (mobileList) {
    projectsData.forEach(proj => {
      const pos = nodePositions[proj.id];
      const cat = pos ? pos.cat : "ai";
      const glyph = pos ? pos.glyph : "◆";

      const card = document.createElement("article");
      card.className = `mobile-project-card cat-${cat}`;

      const techPills = proj.tech
        .map(t => `<span class="tech-pill">${t}</span>`)
        .join("");
      const bullets = proj.highlights
        .map(h => `<li>${h}</li>`)
        .join("");
      const action =
        proj.type === "internal"
          ? `<div class="enterprise-badge">🔒 [LOCAL_PORTAL_ONLY] Enterprise Core System</div>`
          : proj.link
          ? `<a href="${proj.link}" target="_blank" rel="noopener" class="btn-terminal">&gt; inspect_source_code</a>`
          : "";

      card.innerHTML = `
        <div class="mobile-card-head">
          <span class="node-glyph">${glyph}</span>
          <div class="details-category">${proj.category}</div>
        </div>
        <h3 class="details-title font-display">${proj.title}</h3>
        <div class="details-tech-row">${techPills}</div>
        <p class="details-desc">${proj.description}</p>
        <ul class="details-highlights">${bullets}</ul>
        <div class="details-actions">${action}</div>
      `;

      mobileList.appendChild(card);
    });
  }

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

    // Keep the selected node's connections lit across redraws (e.g. resize)
    restoreSelectionHighlight();
  }

  // Redraw SVG on resize — the container also changes height when the details
  // panel grows, so observe the map itself, not just the window
  window.addEventListener("resize", drawConnections);
  if (window.ResizeObserver) {
    new ResizeObserver(drawConnections).observe(svgCanvas.parentElement);
  }
  
  // Set initial timeout so elements render fully in viewport
  setTimeout(drawConnections, 600);

  // Trigger draw after system boots up
  document.addEventListener("neural-system-ready", () => {
    setTimeout(drawConnections, 300);
  });

  // Hover / Selection Highlight Logic
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

    // Surface the labels of directly linked nodes
    const neighborIds = new Set(linkedProjects(projId).map(l => l.id));
    document.querySelectorAll(".project-node").forEach(node => {
      node.classList.toggle("linked", neighborIds.has(node.getAttribute("data-id")));
    });
  }

  function resetConnections() {
    svgLines.forEach(line => {
      line.setAttribute("class", "conn-line");
    });
    document.querySelectorAll(".project-node").forEach(node => {
      node.classList.remove("linked");
    });
  }

  function restoreSelectionHighlight() {
    if (selectedProjectId) {
      highlightConnections(selectedProjectId);
    } else {
      resetConnections();
    }
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

    // Keep this node's connections lit until another node is chosen
    selectedProjectId = projId;
    highlightConnections(projId);

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

    // Linked nodes — which projects this one connects to, and the stack they share
    const linkedWrap = detailsContent.querySelector(".details-linked");
    const linkedList = detailsContent.querySelector(".details-linked-list");
    if (linkedWrap && linkedList) {
      linkedList.innerHTML = "";
      const links = linkedProjects(projId);
      linkedWrap.classList.toggle("hidden", links.length === 0);

      links.forEach(link => {
        const other = projectsData.find(p => p.id === link.id);
        if (!other) return;
        const pos = nodePositions[link.id];

        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "linked-node-chip";
        chip.setAttribute("aria-label", `Jump to linked project: ${other.title}`);

        const name = document.createElement("span");
        name.className = "chip-name";
        name.innerText = `${pos ? pos.glyph + " " : ""}${other.title}`;

        const shared = document.createElement("span");
        shared.className = "chip-shared";
        shared.innerText = link.shared.join(" · ");

        chip.appendChild(name);
        chip.appendChild(shared);
        chip.addEventListener("click", () => selectProject(link.id));
        linkedList.appendChild(chip);
      });
    }

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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawerOverlay.classList.contains("active")) {
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
