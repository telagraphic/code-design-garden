/** Placeholder resume jobs for the About page. */

export type ResumeJob = {
  company: string;
  role: string;
  dates: string;
  location?: string;
  highlights: [string, string, string];
};

export const resumeJobs: ResumeJob[] = [
  {
    company: "Northline Studio",
    role: "Senior Design Engineer",
    dates: "2023 — Present",
    location: "Remote",
    highlights: [
      "Shipped a component system and motion library used across marketing and product surfaces.",
      "Partnered with design to prototype interfaces in code before locking visual specs.",
      "Cut page weight on key landing routes by converting assets and tightening critical CSS.",
    ],
  },
  {
    company: "Cascade Labs",
    role: "Frontend Engineer",
    dates: "2020 — 2023",
    location: "New York, NY",
    highlights: [
      "Built the customer dashboard in React, including auth flows and billing states.",
      "Led the migration from a legacy CSS bundle to a token-based design system.",
      "Improved Core Web Vitals on the docs site through image strategy and route splitting.",
    ],
  },
  {
    company: "Harbor Digital",
    role: "UI Developer",
    dates: "2017 — 2020",
    location: "Boston, MA",
    highlights: [
      "Implemented responsive marketing pages and editorial templates for client launches.",
      "Created reusable layout primitives that replaced one-off grid hacks across projects.",
      "Worked with writers and designers to ship accessible, content-first page patterns.",
    ],
  },
];
