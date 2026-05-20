/* BOOT SEQUENCE SCRIPT */
document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("boot-screen");
  const bootTerminal = document.getElementById("boot-terminal");
  const bootSkipBtn = document.getElementById("boot-skip");

  // Skip boot sequence if already visited in this session
  if (localStorage.getItem("system_booted") === "true") {
    bootScreen.style.display = "none";
    document.body.classList.remove("booting");
    initializeCoreModules();
    return;
  }

  document.body.classList.add("booting");

  const bootLogs = [
    { text: "🧠 INITIALIZING NEURAL OS CORE v4.1.0...", class: "info" },
    { text: "[OK] Core Architecture: 64-bit Quantum Neural Grid Loaded", class: "ok" },
    { text: "[OK] Primary Bios Node: Madhesh Vivekanandan", class: "ok" },
    { text: "⏳ LOADING COGNITIVE AND LOGIC MODULES...", class: "info" },
    { text: "[OK] Natural Language Orchestrator: Active", class: "ok" },
    { text: "[OK] Knowledge Base: RAG / Vector Database Sync Complete", class: "ok" },
    { text: "[OK] Tool Integration Pipeline: Connected to External API Node", class: "ok" },
    { text: "🛠️ COMPILING AGENT ENVIRONMENT & INTERFACES...", class: "info" },
    { text: "[OK] n8n Workflow Automation Engine: Active", class: "ok" },
    { text: "[OK] FastAPI REST Framework & Router: Operational", class: "ok" },
    { text: "[OK] OpenAI & Claude Advanced Reasoning Cores: Wired", class: "ok" },
    { text: "[OK] Docker Containers & Gateway Gateway: Online", class: "ok" },
    { text: "📡 SYNCHRONIZING NETWORK NODES...", class: "info" },
    { text: "[OK] Port 8080: Outbound Signal Transmitting", class: "ok" },
    { text: "[OK] Secure Tunnel: Linked to Tarka Labs Core Servers", class: "ok" },
    { text: "⚡ DECIPHERING IDENTITY PROTOCOLS...", class: "warn" },
    { text: "[READY] Madhesh Vivekanandan — Neural Terminal Active.", class: "ready caret-blink" }
  ];

  let currentLineIndex = 0;
  let isSkipped = false;
  let lineTimeout;

  function printNextLine() {
    if (isSkipped || currentLineIndex >= bootLogs.length) {
      finishBoot();
      return;
    }

    const log = bootLogs[currentLineIndex];
    const lineElement = document.createElement("div");
    lineElement.className = `boot-line ${log.class || ''}`;
    lineElement.innerHTML = log.text;

    bootTerminal.appendChild(lineElement);
    
    // Auto scroll down in terminal
    bootTerminal.scrollTop = bootTerminal.scrollHeight;

    currentLineIndex++;

    // Calculate dynamic typewriter speeds
    let delay = 150 + Math.random() * 200; // Base delay
    if (log.text.startsWith("⏳") || log.text.startsWith("🛠️") || log.text.startsWith("📡")) {
      delay = 400; // Major categories pause slightly longer
    } else if (log.class === "ready") {
      delay = 1000; // Hold last line for dramatic effect
    }

    lineTimeout = setTimeout(printNextLine, delay);
  }

  function finishBoot() {
    if (isSkipped) return; // Prevent double trigger
    isSkipped = true;
    clearTimeout(lineTimeout);

    // Fade out boot screen
    bootScreen.classList.add("fade-out");
    document.body.classList.remove("booting");

    // Persist session state so returning visitors skip boot
    localStorage.setItem("system_booted", "true");

    setTimeout(() => {
      bootScreen.style.display = "none";
      initializeCoreModules();
    }, 800); // Match transition duration in CSS
  }

  // Bind escape/click triggers for immediate bypass
  bootSkipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    finishBoot();
  });

  bootScreen.addEventListener("click", finishBoot);

  document.addEventListener("keydown", (e) => {
    if (bootScreen.style.display !== "none") {
      finishBoot();
    }
  });

  // Start printing sequence
  setTimeout(printNextLine, 500);

  function initializeCoreModules() {
    // Fire a custom event to notify other scripts that system is ready
    const event = new CustomEvent("neural-system-ready");
    document.dispatchEvent(event);
  }
});
