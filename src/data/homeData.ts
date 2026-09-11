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
  subtitle: "Senior Python and Django software engineer based in India with 7+ years shipping production infrastructure at scale. Open for senior roles and client engagements.",
  canvasIntro: "This portfolio is built on an infinite 2D canvas — because life and experiences are rarely linear. Drag around, explore the grid, and enjoy the site.",
  systemMetric: {
    title: "A system I owned in production, at TestGorilla",
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
      label: "Writing & Essays",
      target: "writing",
      path: "/writing",
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
