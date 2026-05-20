/* CURATED SYSTEM PORTFOLIO DATASET */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Madhesh Vivekanandan",
    title: "AI Systems Architect & Backend Engineer",
    taglines: [
      "Building Intelligent Systems",
      "Architecting AI Pipelines",
      "Orchestrating Multi-Agent Flows",
      "Engineering Core Backend Engines"
    ],
    summary: "GenAI-focused Software Engineer with a strong foundation in Python backend development and intelligent LLM-driven systems. Experienced in building scalable APIs, agent-like workflows, and retrieval-based AI applications that transform natural language inputs into accurate, actionable outputs. Comfortable working across the full lifecycle of GenAI solutions, from problem understanding and system design to implementation and validation in real-world environments.",
    location: "Chennai, India",
    email: "madheshvivekanandan@gmail.com",
    phone: "6374051514",
    github: "Madheshvivekanandan",
    linkedin: "madhesh-vivekanandan"
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
        "Architect Python backend systems featuring scalable API design and modular architecture.",
        "Implement advanced LLM-powered workflows, including prompt engineering, API orchestration, and vector tools.",
        "Design multi-step agentic reasoning flows utilizing dynamic tool invocation and auto-evaluation layers.",
        "Collaborate on frontend workflow design for AI-powered web apps using modern React-based architectures.",
        "Integrate core AI capabilities into enterprise platforms using Docker containerization and AWS/Azure deployment.",
        "Establish comprehensive validation and evaluation test suites for backend services and AI-driven agents."
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
        "Worked as a shadow developer on an enterprise-scale Nissan Supply Chain Management platform.",
        "Acquired experience in mainframe background environment: job scheduling, batch processing, and JCL workflows.",
        "Assisted senior engineers in writing, debugging, and validating mission-critical background jobs.",
        "Identified optimization opportunities in legacy batch runs, reducing processing footprints."
      ]
    },
    {
      id: "srit",
      role: "BE Computer Science & Engineering",
      company: "Sri Ramakrishna Institute of Technology",
      period: "2020 – 2024",
      location: "Coimbatore, India",
      accent: "amber",
      details: [
        "Graduated with a strong academic record in Computer Science principles, algorithms, and databases.",
        "Specialized in machine learning course tracks and engineered custom classification models.",
        "Active member of the core tech committee, coordinating workshops on cloud computing and Git."
      ]
    }
  ],

  skills: {
    ai: [
      { name: "RAG Systems", level: "Expert" },
      { name: "Agentic Workflows", level: "Expert" },
      { name: "n8n Automation", level: "Expert" },
      { name: "LLM APIs (OpenAI, Claude)", level: "Expert" },
      { name: "Azure OpenAI", level: "Intermediate" },
      { name: "Hugging Face", level: "Intermediate" },
      { name: "Ollama (Local LLMs)", level: "Advanced" }
    ],
    backend: [
      { name: "Python", level: "Expert" },
      { name: "FastAPI", level: "Expert" },
      { name: "REST APIs", level: "Expert" },
      { name: "GraphQL", level: "Intermediate" },
      { name: "SQLAlchemy ORM", level: "Advanced" },
      { name: "Shell Scripting", level: "Advanced" }
    ],
    frontend: [
      { name: "React.js", level: "Advanced" },
      { name: "React Native", level: "Intermediate" },
      { name: "JavaScript (ES6+)", level: "Expert" },
      { name: "HTML5 / CSS3", level: "Expert" }
    ],
    devops: [
      { name: "Docker", level: "Advanced" },
      { name: "Git / GitHub", level: "Expert" },
      { name: "Linux Administration", level: "Advanced" },
      { name: "Postman API Testing", level: "Expert" }
    ],
    databases: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "Qdrant Vector DB", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "Adabas", level: "Beginner" }
    ]
  },

  projects: [
    {
      id: "o2c",
      title: "Agentic Order-to-Cash Automation Platform",
      tech: ["N8N", "Python", "FastAPI", "React.js", "PostgreSQL", "Azure OpenAI", "Docker"],
      category: "Enterprise AI / Agentic Systems",
      type: "internal",
      link: null,
      description: "An enterprise-grade O2C automation platform designed to process unstructured customer inquiry emails and Purchase Order PDFs into highly structured, validated, and ERP-ready order records.",
      highlights: [
        "Orchestrated complex multi-agent workflows using n8n node-based flows.",
        "Integrated Microsoft Azure OpenAI combined with IBM Docling for deep PDF document structure parsing.",
        "Built a modular FastAPI backend with transactional validation nodes stored in PostgreSQL.",
        "Created an interactive React-based verification dashboard for human-in-the-loop validation of low-confidence entries."
      ]
    },
    {
      id: "analyst",
      title: "Agentic Data Analyst",
      tech: ["Python", "React.js", "Docker", "OpenAI", "MLflow", "DSPy"],
      category: "AI Analytics / Agentic Systems",
      type: "internal",
      link: null,
      description: "A state-of-the-art GenAI-powered analytics engine enabling business stakeholders to perform queries against corporate data warehouses in plain conversational English.",
      highlights: [
        "Designed a multi-step DSPy-inspired agentic execution graph that manages query parsing, schema validation, entity resolution, and SQL creation.",
        "Incorporated an advanced ThinkingSignature layer that reveals the agent's logic steps prior to displaying charts/data.",
        "Configured MLflow integration to monitor LLM latencies, prompt variables, and token expenditure dynamics.",
        "Wrote an extensive Pytest suite validating code robustness against mock warehouse schemas."
      ]
    },
    {
      id: "voice",
      title: "voice_ai",
      tech: ["Python", "SpeechRecognition", "Pyttsx3", "LLMs"],
      category: "AI / Voice Interfaces",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/voice_ai",
      description: "A highly responsive, voice-controlled virtual intelligence companion capable of running desktop operations and answering complex questions through audio commands.",
      highlights: [
        "Implemented real-time local audio recording and speech-to-text transcription.",
        "Structured offline response pathways and online LLM synthesis triggers depending on network availability.",
        "Constructed shell automation scripts enabling voice-activated file navigation and system stats reporting."
      ]
    },
    {
      id: "rag",
      title: "RAG Document Q&A System",
      tech: ["Python", "Qdrant DB", "React.js", "FastAPI", "SentenceTransformers"],
      category: "RAG / Knowledge Systems",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/RAG-Based-Document-Question-Answering-System",
      description: "An advanced Retrieval-Augmented Generation (RAG) backend and frontend that parses custom documents and produces contextually grounded answers without hallucination.",
      highlights: [
        "Engineered a PDF parsing pipeline extracting text and structured tables with SentenceTransformers embeddings.",
        "Leveraged Qdrant Vector Database to support rapid cosine-similarity search against semantic text chunks.",
        "Exposed modular query retrieval routes through a low-latency FastAPI backend.",
        "Created a React-based interface showing semantic context snippets that contributed to the final LLM answer."
      ]
    },
    {
      id: "conversational",
      title: "LLM Conversational Assistant",
      tech: ["Python", "React.js", "FastAPI", "OpenAI API", "SSE Streams"],
      category: "LLM / Conversational AI",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/LLM-Powered-Conversational-Assistant",
      description: "A clean, full-stack AI messaging environment featuring customized agent personas, sliding message buffers, and token cost tracking.",
      highlights: [
        "Designed few-shot and role-based prompt configurations with system message injects.",
        "Implemented low-latency streaming responses via Server-Sent Events (SSE) from FastAPI to the React client.",
        "Designed responsive message styling including custom Markdown parser and terminal syntax highlighting."
      ]
    },
    {
      id: "guvi",
      title: "Guvi_GPT",
      tech: ["Jupyter Notebook", "Python", "OpenAI Core", "Prompt Engineering"],
      category: "AI / Education Systems",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/Guvi_GPT",
      description: "An intelligent educational coding assistant tailored specifically for curriculum support and student debugging queries.",
      highlights: [
        "Engineered specialized prompting modules to restrict responses to guided troubleshooting rather than providing raw solutions.",
        "Built code evaluation filters analyzing student inputs for syntax issues prior to sending prompts to the LLM.",
        "Configured a notebook workflow to test response variations across prompt templates."
      ]
    },
    {
      id: "singapore",
      title: "Singapore Resale Flat Price Predictor",
      tech: ["Python", "Pandas", "Scikit-learn", "Streamlit", "DecisionTreeRegressor"],
      category: "ML / Data Science",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/Singapore-Resale-Flat-Prices-Predicting",
      description: "A machine learning regression model deployed inside an interactive Streamlit dashboard to predict HDB resale flat prices using historical transaction logs.",
      highlights: [
        "Cleaned and analyzed over 10 years of public transaction logs from Singapore's housing database.",
        "Conducted extensive feature engineering focusing on town categories, lease age, floor levels, and proximity indexes.",
        "Trained and cross-validated predictive models, selecting a high-accuracy DecisionTreeRegressor.",
        "Designed a gorgeous Streamlit dashboard with interactive sliders for immediate prediction estimates."
      ]
    },
    {
      id: "copper",
      title: "Industrial Copper Modeling",
      tech: ["Jupyter Notebook", "Python", "Scikit-learn", "Pandas", "Matplotlib"],
      category: "ML / Industrial Modeling",
      type: "github",
      link: "https://github.com/Madheshvivekanandan/Industrial-Copper-Modeling",
      description: "An industrial forecasting model analyzing material logs to predict transaction prices and status markers.",
      highlights: [
        "Analyzed highly noisy industrial sheets containing skewness and structural anomalies.",
        "Developed a pipeline executing Box-Cox transformations, robust outlier handling, and vector scalers.",
        "Trained twin models: a regression model to estimate pricing and a classification model to assess deals (Won/Lost)."
      ]
    }
  ]
};
