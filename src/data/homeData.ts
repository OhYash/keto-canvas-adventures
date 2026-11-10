// Content for the Home/Landing section. Update this file to modify headlines or metrics.

export interface SystemMetric {
  value: string;
  label: string;
}

export interface RecentRoleHighlight {
  role: string;
  company: string;
  period: string;
  summary: string;
  target: string;
  path: string;
  metrics: SystemMetric[];
}

export interface NavLinkItem {
  label: string;
  target: string;
  path: string;
}

export interface ExploreLinkItem {
  label: string;
  target: string;
  path: string;
  icon?: string;
}

export const homeData = {
  name: "Yash Yadav",
  title: "Senior Backend Engineer",
  description:
    "7+ years building and operating production systems at scale. I take ownership of backend infrastructure end-to-end, from architecture to reliability.",

  // Legacy aliases for backwards compatibility
  badge: "YASH YADAV · SENIOR BACKEND ENGINEER",
  headline: "Yash Yadav",
  subtitle:
    "Senior backend engineer with 7+ years shipping production infrastructure at scale. I own backend systems end-to-end. Open for senior roles and client engagements.",

  canvasHint: "2D canvas: drag or press ↑ ↓ ← →",

  workLink: {
    label: "Work history",
    target: "work",
    path: "/work/",
  },

  recentRole: {
    role: "Senior Backend Engineer",
    company: "TestGorilla",
    period: "2022 – 2026",
    summary: "Production scale of skills platform owned:",
    target: "work",
    path: "/work/",
    metrics: [
      {
        value: "30M+",
        label: "Monthly requests",
      },
      {
        value: "<150ms",
        label: "p95 latency",
      },
      {
        value: "<0.1%",
        label: "Error rate",
      },
    ] as SystemMetric[],
  } as RecentRoleHighlight,

  // Legacy alias for backwards compatibility
  systemMetric: {
    title: "Production Scale · TestGorilla",
    context:
      "Core candidate assessment backend powering high-stakes tests worldwide with near-zero on-call burden:",
    metrics: [
      {
        value: "30M+",
        label: "Monthly requests",
      },
      {
        value: "<150ms",
        label: "p95 latency",
      },
      {
        value: "<0.1%",
        label: "Error rate",
      },
    ] as SystemMetric[],
  },

  primaryCta: {
    label: "Contact",
    target: "contact",
    path: "/contact/",
  },

  navigationLinks: [
    {
      label: "Projects (building paise fit)",
      target: "projects",
      path: "/projects/",
    },
    {
      label: "Blog",
      target: "writing",
      path: "/writing/",
    },
  ] as NavLinkItem[],

  exploreLinks: [
    {
      label: "About me",
      target: "personal",
      path: "/personal/",
      icon: "🧍",
    },
    {
      label: "Now",
      target: "now",
      path: "/now/",
      icon: "⚡",
    },
    {
      label: "Travel",
      target: "travel",
      path: "/travel/",
      icon: "✈️",
    },
    {
      label: "Keto",
      target: "keto",
      path: "/keto/",
      icon: "🐱",
    },
    {
      label: "Ataco",
      target: "ataco",
      path: "/ataco/",
      icon: "🏍️",
    },
    {
      label: "Hobbies",
      target: "hobbies",
      path: "/hobbies/",
      icon: "🎨",
    },
  ] as ExploreLinkItem[],
};
