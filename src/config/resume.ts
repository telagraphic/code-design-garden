/** Resume jobs for the About page. */

export type ResumeJob = {
  company: string;
  role: string;
  dates: string;
  location?: string;
  highlights: string[];
};

export const resumeJobs: ResumeJob[] = [
  {
    company: "Bixal",
    role: "Front End Developer",
    dates: "2022–2025",
    location: "3 years",
    highlights: [
      "Refactored Hugo codebase by implementing a component-based architecture using U.S. Web Design System, resulting in a 50% reduction in code size, design consistency and improved accessibility.",
      "Led Hugo to Drupal migration by automating content removal/cleanup with shell scripts, implementing SEO-preserving redirects, and normalizing markdown files for seamless data transfer.",
      "Optimized the team's Trello agile workflow by streamlining the review process & implementing automation tools, resulting in reduced review times and increased sprint velocity.",
    ],
  },
  {
    company: "GSB Printers",
    role: "Print Pre-Press & Online Projects Coordinator",
    dates: "2018–2021",
    location: "3 years",
    highlights: [
      "Developed automated workflows for bulk product and file management on client websites using Node.js, Excel, and Chrome Puppeteer, significantly reducing manual errors and mitigating repetition fatigue.",
      "Developed a Node.js application to aggregate orders from three internal systems, displaying them in a streamlined table format on production floor monitors, enhancing real-time tracking and visibility.",
      "Collaborated with executive leadership to design and launch a WooCommerce store targeting West Coast law firms, expanding the client base beyond New York and driving increased sales.",
      "Managed two web-to-print platforms for 40+ client sites, streamlining e-commerce, CMS, and customer support to enhance stationery printing workflows and client satisfaction.",
    ],
  },
  {
    company: "Nationwide Insurance",
    role: "Software Test Analyst",
    dates: "2014–2018",
    location: "4 years",
    highlights: [
      "Led the transition to a new test case management system by mentoring junior analysts, resulting in a one-third reduction in agile testing time.",
      "Developed an onboarding website that consolidated cross-team processes and documentation, streamlining training and reducing new hire ramp-up time from three months to one.",
    ],
  },
];
