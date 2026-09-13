export interface Role {
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  type?: string;
  description?: string;
  achievements?: string[];
}

export interface TechnicalSkillCategory {
  category: string;
  skills: string[];
}

export interface CompetencyPillar {
  id: string;
  title: string;
  highlight?: boolean;
  theme: "indigo" | "purple" | "sky" | "emerald" | "amber";
  skills: string[];
}

export const currentRole: Role = {
  title: "Senior Backend Engineer",
  company: "Ex-TestGorilla",
  location: "Remote",
  startDate: "October 2022",
  endDate: "August 2026",
  type: "Open for Work",
  description:
    "Senior Python and Django software engineer based in India, recently wrapped up at TestGorilla after owning core backend systems processing 30M+ requests/month at <0.1% error rate and p95 latency under 150ms. 7+ years building high-scale distributed systems and production cloud infrastructure. Available for full-time senior backend roles and technical consulting engagements.",
};

export const careerJourney: Role[] = [
  {
    title: "Senior Backend Engineer",
    company: "TestGorilla",
    period: "October 2022 - August 2026",
    achievements: [
      "Own a core backend system processing 30M+ requests/month at <0.1% error rate and p95 latency under 150ms, with near-zero on-call burden",
      "Designed the self-serve assessment flow, shifting the platform from customer-initiated to candidate-initiated — scaled to 52K+ candidates at a 78% completion rate with near-zero post-launch defects",
      "Engineered company's first localization support, resolving container-level font rendering, PDF generation, and headless Chrome issues that were blocking international expansion",
      "Designed feature-flag-driven cohorts and A/B testing infrastructure, enabling faster experimentation without redeployments",
      "Raised and addressed security risks in identity verification workflows; proposed multi-layered account-blocking measures to reduce fraud",
      "Solo-built a fully functional ATS demo integrated with the TestGorilla app in a 2-day company-wide hackathon",
      "Winner of the company-wide Ideathon (Croatia, 2024); formalized release management and mentored 3+ engineers to autonomy with PR standards adopted company-wide",
    ],
  },
  {
    title: "Software Engineer",
    company: "Digital Guardian Pvt. Ltd.",
    period: "March 2021 - September 2022",
    achievements: [
      "Built performance profiling tool with minimal runtime overhead",
      "Identified 54% performance boost in product",
      "Developed JS-based UI summary viewer",
      "Led SDK port from Linux to FreeBSD",
      "Fixed memory issues, enabling 70% performance improvement",
      "Improved data protection by introducing IBAN detection",
      "Sole owner of Windows Agent, handling bug fixes and feature enhancements",
    ],
  },
  {
    title: "Software Engineer",
    company: "MAQ Software Pvt. Ltd.",
    period: "April 2019 - March 2021",
    achievements: [
      "Developed backend services for microservices-based web applications using Azure cloud-native technologies",
      "Contributed to Microsoft's learning platform modularization initiative, supporting a rebuild-from-scratch architecture",
      "Subject Matter Expert for Mock/Unit testing",
      "Created CI/CD pipelines and Azure cloud web jobs",
    ],
  },
  {
    title: "Software Development Intern",
    company: "Odessa Technologies Pvt. Ltd.",
    period: "August 2018 - December 2018",
    achievements: [
      "Improved Odessa Build Platform",
      "Conducted performance profiling for Lease Wave project",
    ],
  },
];

export const technicalSkills: TechnicalSkillCategory[] = [
  { category: "Languages", skills: ["Python", "TypeScript", "SQL", "C/C++", "C#"] },
  {
    category: "Frameworks & Core",
    skills: ["Django", "FastAPI", "Node.js", ".NET Core", "React 18"],
  },
  {
    category: "AI & Modern Tooling",
    skills: ["Claude Code", "Antigravity", "Cursor", "OpenAI API", "RAG", "Vector Embeddings", "LangChain"],
  },
  {
    category: "Cloud, DB & Infra",
    skills: ["AWS", "PostgreSQL", "Redis", "Docker", "Supabase", "CI/CD"],
  },
  { category: "Platforms & Systems", skills: ["Linux Kernel", "FreeBSD", "Windows Driver-level"] },
];

export const competencyPillars: CompetencyPillar[] = [
  {
    id: "architecture",
    title: "Technical Architecture & System Design",
    theme: "indigo",
    skills: [
      "Distributed Systems (30M+ req/mo, p95 <150ms)",
      "Microservices & Monolith Decomposition",
      "Event-Driven Architecture & Async Workflows",
      "Atomic Ledger Balances & DB Triggers (PL/pgSQL)",
      "Anti-Fraud Models & Graduated Soft/Hard Blocking",
      "Role-Based Access Control (RBAC) & HIPAA Principles",
      "Low-Level Systems Profiling & Memory Leak Optimization (50%+ gains)",
      "Cross-Team API Contract Design & Architectural RFCs",
    ],
  },
  {
    id: "ai-toolkit",
    title: "AI Toolkit & Agentic Workflows",
    theme: "purple",
    highlight: true,
    skills: [
      "Claude Code · Cursor · Antigravity CLI",
      "Agentic Workflows & Automated Code Generation",
      "OpenAI APIs · Structured Outputs · Function Calling",
      "RAG Architectures & Semantic Search",
      "Vector Embeddings & Hybrid Retrieval",
      "LangChain & Prompt Engineering",
      "Self-Hosted AI Health & Finance Platforms",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud, Systems & DevOps",
    theme: "sky",
    skills: [
      "AWS (EC2, S3, RDS, Lambda, CloudWatch)",
      "Docker & Containerized Ubuntu Environments",
      "CI/CD (GitHub Actions, Azure DevOps)",
      "Feature Flags & Cohort Rollouts (Flagsmith)",
      "FreeBSD Systems Engineering & Linux Kernel Configs",
      "Pre-Boot & Driver-Level Windows Components",
    ],
  },
  {
    id: "data-databases",
    title: "Databases & Data Integrity",
    theme: "emerald",
    skills: [
      "PostgreSQL & PL/pgSQL Atomic Functions",
      "MySQL Database Design & Query Optimization",
      "Redis In-Memory Caching & Session Stores",
      "Supabase (PostgreSQL, Row-Level Security, Storage)",
      "State Machine Transitions & Relational Data Constraints",
    ],
  },
  {
    id: "leadership-delivery",
    title: "Engineering Leadership & Delivery",
    theme: "amber",
    skills: [
      "Cross-Functional Architecture Alignment (3+ Teams)",
      "Company-Wide PR Quality & Engineering Excellence",
      "Release Management & Deployment Governance",
      "Mentoring Senior & Mid-Level Engineers to Autonomy",
      "Ideathon Winner (TestGorilla Croatia, 2024)",
      "Rapid Prototyping (Solo-built ATS Demo in 2 Days)",
    ],
  },
];

export const dailyTasks: string[] = [
  "Reviewing a PR and pushing back on a half-baked API contract",
  "Fixing something I shipped on Friday",
  "Mentoring an engineer through a tricky refactor",
  "Drawing boxes and arrows for a system that's about to get bigger",
];
