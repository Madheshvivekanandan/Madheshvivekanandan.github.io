/* CURATED SYSTEM PORTFOLIO DATASET */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Madhesh Vivekanandan",
    title: "GenAI Software Engineer",
    taglines: [
      "Building Intelligent Systems",
      "Designing LLM Pipelines",
      "Orchestrating Agentic Workflows",
      "Engineering Python Backends"
    ],
    summary: "GenAI-focused Software Engineer with a strong foundation in Python backend development and intelligent LLM-driven systems. Experienced in building scalable APIs, agent-like workflows, and retrieval-based AI applications that transform natural language inputs into accurate, actionable outputs. Comfortable working across the full lifecycle of GenAI solutions, from problem understanding and system design to implementation and validation in real-world environments.",
    location: "Chennai, India",
    email: "madheshvivekanandan@gmail.com",
    github: "Madheshvivekanandan",
    linkedin: "madhesh-vivekanandan",
    blog: {
      platform: "DEV.to",
      url: "https://dev.to/madmi",
      handle: "dev.to/madmi",
      latest: {
        title: "The Dashboard That Builds Itself",
        url: "https://dev.to/madmi/the-dashboard-that-builds-itself-3386"
      }
    }
  },

  experience: [
    {
      id: "tarka",
      role: "Software Developer",
      company: "Tarka Labs",
      period: "Jun 2025 – Present",
      location: "Chennai, India",
      accent: "cyan",
      details: [
        "Work on Python backend systems with a focus on scalable API design, modular architecture, and maintainability.",
        "Contribute to LLM-powered workflows, including prompt engineering, API orchestration, tool integration, and response handling.",
        "Help design multi-step agentic reasoning flows where the system decides when to retrieve data, invoke tools, or generate a response.",
        "Collaborate on frontend workflow design and user experience for AI-powered web apps built with React.",
        "Integrate AI capabilities into enterprise applications, and take part in deployment, containerization, and environment setup for production.",
        "Contribute to testing and validation workflows for backend services and AI-driven features."
      ]
    },
    {
      id: "infotel",
      role: "Trainee Software Developer",
      company: "Infotel India Pvt Ltd",
      period: "Nov 2024 – May 2025",
      location: "Chennai, India",
      accent: "violet",
      details: [
        "Shadow resource on an enterprise Nissan Supply Chain Management project.",
        "Worked closely with senior mainframe developers to learn batch job processing, background job execution, and enterprise workflows.",
        "Assisted in writing and validating background jobs under guidance."
      ]
    },
    {
      id: "srit",
      role: "BE Computer Science & Engineering",
      company: "Sri Ramakrishna Institute of Technology",
      period: "Sep 2020 – May 2024",
      location: "Coimbatore, India",
      accent: "amber",
      details: []
    }
  ],

  skills: {
    ai: ["RAG", "Agentic Workflows", "LangGraph", "LLM APIs (OpenAI, Azure OpenAI)", "Hugging Face", "Ollama", "Docling"],
    backend: ["Python", "FastAPI", "REST APIs", "GraphQL", "SQLAlchemy"],
    frontend: ["React.js", "React Native", "JavaScript", "HTML / CSS"],
    devops: ["Docker", "Git / GitHub", "n8n", "Linux", "Shell Scripting", "Postman"],
    databases: ["PostgreSQL", "MySQL", "Qdrant", "Adabas"]
  },

  projects: [
    {
      id: "o2c",
      title: "Agentic Order-to-Cash Platform",
      tech: ["n8n", "Python", "FastAPI", "React.js", "PostgreSQL", "Azure OpenAI", "Docling", "Docker"],
      category: "Enterprise AI / Agentic Systems",
      type: "internal",
      link: null,
      description: "An agentic Order-to-Cash (O2C) automation platform that turns customer inquiry emails and purchase order PDFs into validated, ERP-ready order entries.",
      highlights: [
        "Orchestrates multi-step n8n workflows with Azure OpenAI, IBM Docling, and the Microsoft Graph API to extract and validate unstructured email and document data.",
        "Reconciles extracted orders against the Odoo ERP system, with real-time product matching.",
        "Modular FastAPI backend with PostgreSQL-based validation workflows.",
        "React dashboard for human-in-the-loop verification of extracted orders."
      ]
    },
    {
      id: "analyst",
      title: "Agentic Data Analyst",
      tech: ["Python", "FastAPI", "React.js", "OpenAI", "MLflow", "pytest", "Docker"],
      category: "AI Analytics / Agentic Systems",
      type: "internal",
      link: null,
      description: "A GenAI analytics platform: ask a data warehouse a question in plain English and get back executable SQL, tables, charts, and summaries.",
      highlights: [
        "Multi-step agentic workflow inspired by DSPy: query interpretation, entity extraction, ambiguity detection, workflow planning, SQL generation, execution, and summarization.",
        "A ThinkingSignature layer reformulates user intent before SQL generation to improve accuracy.",
        "Agent decision logic chooses whether to return a raw query, a visualization, or an analytical summary.",
        "MLflow tracks LLM calls, agent decisions, SQL executions, and artifacts; pytest runs natural-language test cases."
      ]
    },
    {
      id: "genui",
      title: "Generative UI Dashboard",
      tech: ["Python", "FastAPI", "OpenAI", "React", "A2UI", "SSE"],
      category: "Generative UI / Agents",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/Generative-Ui",
      description: "An agent composes a financial dashboard for each question and streams it to the browser as A2UI v0.9 protocol messages, with no agent framework in between.",
      highlights: [
        "OpenAI structured outputs constrained to a fixed component catalog, so the model can never send markup or code; the catalog is the security boundary.",
        "Streams createSurface, updateDataModel, and updateComponents messages over SSE, rendered by @a2ui/react.",
        "Every answer re-composes one canvas in place, and buttons on generated cards send actions back to the agent.",
        "Sibling POCs explore the same idea: signal-genui-poc (design-system molecules over A2UI) and genui-studio (Vercel AI SDK + json-render on Next.js)."
      ]
    },
    {
      id: "finance",
      title: "LangGraph Finance Assistant",
      tech: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "React", "TypeScript", "OpenAI", "Docker"],
      category: "Agents / Personal Finance",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/langgraph-finance-assistant",
      description: "Upload bank statements, get every transaction categorized, see where the money went, and chat with a LangGraph agent about your spending.",
      highlights: [
        "Two-stage categorization: deterministic keyword rules first, then one batched OpenAI call for the leftovers, with the category set enforced by the response schema.",
        "FastAPI with SQLAlchemy and Alembic on Postgres, problem+json (RFC 9457) errors, and keyset pagination.",
        "Vite + React + TypeScript dashboard; the whole stack runs with Docker Compose.",
        "CI runs ruff, mypy, import-linter, and pytest on every push."
      ]
    },
    {
      id: "invoice",
      title: "Invoice Analytics Platform",
      tech: ["Python", "Docling", "GLiNER", "PostgreSQL", "SQLAlchemy", "Streamlit", "Docker"],
      category: "Document AI / Analytics",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/invoice-analytics-platform",
      description: "Upload a PDF or image invoice and get structured, quality-scored data and spend analytics.",
      highlights: [
        "Docling parses layout, tables, and OCR; GLiNER extracts vendor, dates, amounts, and line items.",
        "Validates output into clean JSON with a quality score, and logs every pipeline stage for a full audit trail.",
        "Five Streamlit pages, including an analytics dashboard with 11 Plotly charts.",
        "Fully containerised with Docker Compose, PostgreSQL, and pgAdmin."
      ]
    },
    {
      id: "voice",
      title: "Real-Time Voice Agent",
      tech: ["Python", "FastAPI", "WebSockets", "React", "Sarvam AI"],
      category: "Voice AI / Real-Time",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/voice_ai",
      description: "A turn-based voice agent for phone-call-style conversations in Tamil: browser audio streams over a WebSocket through speech-to-text, an LLM, and text-to-speech.",
      highlights: [
        "React + Vite tester captures the mic, resamples to 16 kHz PCM, and streams it to a FastAPI WebSocket server.",
        "A state machine (agent speaking, user speaking, processing) drops mic audio while the agent talks to prevent echo.",
        "Sarvam Saaras v3 for streaming STT with voice-activity events, Sarvam Chat v2 with a rolling 10-turn history, and Bulbul v3 for TTS."
      ]
    },
    {
      id: "rag",
      title: "RAG Document Q&A System",
      tech: ["Python", "FastAPI", "Qdrant", "SentenceTransformers", "React"],
      category: "RAG / Knowledge Systems",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/RAG-Based-Document-Question-Answering-System",
      description: "A full-stack RAG system: upload documents, ask questions in natural language, and get answers grounded in the most relevant passages.",
      highlights: [
        "Ingests PDF, TXT, and Markdown files, chunks them, and embeds the chunks with Sentence Transformers.",
        "Stores vectors in Qdrant and retrieves the most relevant chunks at query time to ground the LLM's answer.",
        "FastAPI backend with automatic API docs; React + Vite front end."
      ]
    },
    {
      id: "conversational",
      title: "LLM Conversational Assistant",
      tech: ["Python", "FastAPI", "SQLAlchemy", "React", "LLM APIs"],
      category: "LLM / Conversational AI",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/LLM-Powered-Conversational-Assistant",
      description: "A full-stack assistant for question answering and text summarization through a web chat interface.",
      highlights: [
        "Zero-shot, few-shot, and role-based prompting for consistent, context-aware responses.",
        "FastAPI backend orchestrates LLM calls and request/response flows, with Pydantic schemas and SQLAlchemy models.",
        "Persistent chat sessions and history; React front end with Markdown rendering."
      ]
    },
    {
      id: "jev",
      title: "Jev vs Cosine Benchmark",
      tech: ["Python", "SentenceTransformers", "scikit-learn", "Cross-Encoders"],
      category: "LLM Evaluation / Benchmarks",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/jev-vs-cosine",
      description: "A $0, reproducible benchmark on Banking77 intent routing: does TypeSafe AI's Jev beat plain embedding cosine similarity, and how many labelled examples does a free method need to catch up?",
      highlights: [
        "Compares five methods across 77 intent categories: cosine vs descriptions, Jev, cosine voting over past examples, logistic regression on embeddings, and a cross-encoder reranker.",
        "Preliminary result: with no examples Jev leads cosine by about 11 points, but a free logistic-regression classifier matches it with 5 labelled examples per category.",
        "Pinned model revisions and resumable runs, so the numbers can be reproduced."
      ]
    },
    {
      id: "agentloop",
      title: "agent-loop",
      tech: ["Agent Skills", "Claude Code", "Codex", "Cursor", "Shell"],
      category: "Developer Tooling / Coding Agents",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/agent-loop",
      description: "A staged loop for coding agents (triage, analyze, plan, implement, verify, debug), packaged as one Agent Skills folder that runs in Claude Code, Codex, Cursor, and 30+ other clients.",
      highlights: [
        "Triage sizes the process: a one-line fix skips analysis and planning entirely.",
        "Each stage gets a fresh context and hands off through markdown artifacts that double as an audit log.",
        "The verifier sees only the plan and the diff and cannot edit code; the debug loop escalates to a human after 3 iterations.",
        "Companion repo ai-engineering-skills packages coding standards (Python, React, SQL, API design, Docker, git) as portable skills."
      ]
    },
    {
      id: "guvi",
      title: "Guvi_GPT",
      tech: ["Python", "GPT-2", "Hugging Face Transformers", "Streamlit"],
      category: "LLM Fine-Tuning / Deployment",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/Guvi_GPT",
      description: "A GPT-2 model fine-tuned on GUVI's company data and deployed to Hugging Face Spaces behind a Streamlit web app.",
      highlights: [
        "Cleaned and tokenized GUVI text content with the GPT-2 tokenizer, then fine-tuned with Hugging Face Transformers.",
        "Deployed as a Streamlit app on Hugging Face Spaces, with login tracking."
      ]
    }
  ]
};
