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

export const currentRole: Role = {
  title: "Senior Backend Engineer",
  company: "Ex-TestGorilla",
  location: "Remote",
  startDate: "October 2022",
  endDate: "August 2026",
  type: "Open for Work",
  description:
    "Recently wrapped up at TestGorilla after owning core backend systems processing 30M+ requests/month at <0.1% error rate and p95 latency under 150ms. Currently available for full-time senior backend roles and freelance client engagements.",
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
  { category: "Languages", skills: ["Python", "TypeScript", "C#", "SQL"] },
  {
    category: "Frameworks",
    skills: ["Django", "LangChain", "Node.js", ".NET/ASP.NET"],
  },
  {
    category: "AI / ML",
    skills: ["RAG", "Vector Embeddings", "Prompt Engineering", "OpenAI API"],
  },
  {
    category: "Cloud & Infra",
    skills: ["AWS", "Docker", "PostgreSQL", "Redis", "CI/CD"],
  },
  { category: "Platforms", skills: ["Linux", "FreeBSD", "Windows"] },
];

export const dailyTasks: string[] = [
  "Reviewing a PR and pushing back on a half-baked API contract",
  "Fixing something I shipped on Friday",
  "Mentoring an engineer through a tricky refactor",
  "Drawing boxes and arrows for a system that's about to get bigger",
];
