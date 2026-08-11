// Content for the Home/Landing section. Update this file to modify headlines or metrics.

export interface SystemMetric {
  value: string;
  label: string;
}

export interface NavLinkItem {
  label: string;
  target: string;
  path: string;
}

export const homeData = {
  badge: "YASH YADAV · SENIOR BACKEND ENGINEER",
  headline: "I own backend systems end-to-end.",
  subtitle: "7+ years in Python and Django, shipping production infra at scale. Open for freelance and senior roles.",
  systemMetric: {
    title: "A system I own in production, at TestGorilla",
    metrics: [
      {
        value: "30M+",
        label: "Requests / month",
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
    path: "/contact",
  },
  navigationLinks: [
    {
      label: "Work history",
      target: "work",
      path: "/work",
    },
    {
      label: "Also building — Finance Compass",
      target: "projects",
      path: "/projects",
    },
    {
      label: "About me",
      target: "personal",
      path: "/personal",
    },
    {
      label: "What I'm up to right now",
      target: "now",
      path: "/now",
    },
  ] as NavLinkItem[],
};
