// Content for the Projects section. Update this file to modify project details.

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  badge?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  url?: string;
  links?: ProjectLink[];
}

export const projectsData: Project[] = [
  {
    title: "Solanum Enhanced",
    badge: "v7.2.0",
    description: "An enhanced fork of Solanum, the GNOME Circle Pomodoro timer app, featuring multi-monitor break controls, window pinning, and workflow automation.",
    highlights: [
      "Auto-Start Timer on Launch: Automatically begin Pomodoro countdown as soon as the app opens.",
      "Multi-Monitor Fullscreen Breaks: Break overlays cover all connected displays until session restart.",
      "Keep Above (Always-on-Top): Pin timer window on top of active workspace windows.",
      "Smart Session Transitions: Configurable auto-start preferences for break transitions."
    ],
    technologies: ["GTK / GNOME", "Python", "Flatpak", "Arch AUR"],
    url: "https://github.com/OhYash/Solanum-gnome",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/OhYash/Solanum-gnome",
      },
      {
        label: "v7.2.0 Release",
        url: "https://github.com/OhYash/Solanum-gnome/releases/tag/v7.2.0",
      },
    ],
  },
  {
    title: "INR Finance Compass (WIP)",
    description: "AI-native personal finance platform built to understand your complete financial context — bank, cards, cash, investments, and long-term goals.",
    highlights: [
      "Self-Hosted & INR-Primary: Atomic ledger-derived balances and live financial dashboard.",
      "Full Context Guidance: Evaluates whole financial picture before offering insights, inspired by LLM codebase context models.",
      "Active Development: Budgeting engine, CSV import pipeline, and recurring transaction tracking in progress."
    ],
    technologies: ["React", "TypeScript", "Supabase", "AI-Native"],
    url: "https://finance-compass-dev.surge.sh/",
  },
  {
    title: "AI-Powered Mental Health Platform",
    description: "Backend architecture for an AI-assisted mental health platform serving hospitals and clinical therapists.",
    highlights: [
      "Multi-Role Portals: Patient, Therapist, and Admin interfaces with fine-grained role-based access control (RBAC).",
      "HIPAA Compliance Principles: Secure therapeutic workflow automation integrating OpenAI API with Supabase."
    ],
    technologies: ["Python", "OpenAI API", "Supabase", "HIPAA Compliance"],
    url: "https://mindcare-ai.surge.sh/",
  },
  {
    title: "Tenor Cards",
    description: "Lightweight serverless web application for creating and sharing designer digital message cards.",
    technologies: ["HTML5", "CSS", "JavaScript", "Tailwind CSS"],
    url: "https://tenor-cards.surge.sh",
  },
  {
    title: "Knowledge•Day",
    description: "Newsletter and blog platform delivering curated 3-minute reads on uncommon knowledge and technical insights.",
    technologies: ["Jekyll", ".NET Core", "Email Platform"],
    url: "https://kd_dev.surge.sh/",
  },
  {
    title: "Ava.js Test Library Enhancement",
    description: "Open-source contribution enhancing the timeout() functionality in AVA, the popular JavaScript test runner.",
    technologies: ["JavaScript", "Open Source", "Testing"],
  },
  {
    title: "Sailfish OS Port for YU Yuphoria",
    description: "Alternative mobile OS port adapting Linux kernel configurations and the Hybris abstraction layer for Android hardware.",
    technologies: ["Hybris", "Linux Kernel", "Mobile OS"],
  },
  {
    title: "Image Stitching Software",
    description: "Console panorama generator built during a 48-hour hackathon using OpenCV stitching algorithms.",
    technologies: ["C++", "OpenCV", "Computer Vision"],
  },
];
