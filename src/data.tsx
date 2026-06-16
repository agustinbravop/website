import type { ReactNode } from "react";
import AccentLink from "@/components/ui/accent-link";
import resumePdfUrl from "@/assets/AgustinBravo_Resume.pdf";

const em = (text: string) => (
  <span className="font-semibold text-primary">{text}</span>
);

const mono = (text: string) => (
  <span className="font-mono tracking-tighter">{text}</span>
);

export const profile = {
  name: "Agustín Bravo",
  title: "Full-Stack Software Engineer",
  tagline: "AI-Focused · Startup-Paced · Customer-Obsessed",
  bio: [
    "Full stack, full ownership.",
    "From idea to production, from interface to infrastructure.",
    "Shipping fast and working closely with customers to build solutions they love.",
    "Chasing steep learning curves since forever: math olympiads, coding, and now AI.",
    "Deeply into the future of startups and product design.",
  ],
  siteUrl: "https://agusbravo.dev",
  resumeUrl: resumePdfUrl,
};

export const links = [
  {
    label: "LinkedIn",
    handle: "agustinbravop",
    href: "https://www.linkedin.com/in/agustinbravop",
  },
  {
    label: "GitHub",
    handle: "agustinbravop",
    href: "https://github.com/agustinbravop",
  },
  {
    label: "Twitter",
    handle: "agustinbravop",
    href: "https://www.x.com/agustinbravop",
  },
  {
    label: "Email",
    handle: "agustinbravop1@gmail.com",
    href: "mailto:agustinbravop1@gmail.com",
  },
];

export const stack = [
  ["TailwindCSS", "React", "TypeScript", "Python", "Go", "SQL", "Claude Code"],
  [
    "PostgreSQL",
    "AWS (SAA Certified)",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Linux",
  ],
];

export const experiences: {
  title: string;
  company: string;
  date: string;
  bullets: ReactNode[];
}[] = [
  {
    title: "Engineering Intern",
    company: "ECOM Chaco S.A.",
    date: "Jun 2025 – Nov 2025",
    bullets: [
      <>
        Intense internship at a software agency, reporting to senior engineers.
      </>,
      <>
        Became a key contributor in platform engineering{" "}
        {em("within two months")}, managing {em("100+")} apps with tools like
        kubectl, Argo CD, Vault, Prometheus, and Grafana.
      </>,
      <>
        Migrated {em("50+")} live services with thousands of users to
        Kubernetes.
      </>,
      <>
        Built workflows that enabled infrastructure self-service for {em("20+")}{" "}
        developers.
      </>,
      <>
        Reduced deployment times from {em("hours to minutes")} via CI/CD
        improvements and script automations.
      </>,
      <>
        Created a data pipeline with Python and SQL to gather metrics and prove
        team impact with {em("data-driven insights")}.
      </>,
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    company: "Universidad Tecnológica Nacional",
    date: "Apr 2023 – Nov 2025",
    bullets: [
      <>Collaborated on three interdisciplinary research projects.</>,
      <>Helped develop a security control framework for IoT networks.</>,
      <>
        Co-authored and published {em("two papers")} at national academic
        conferences.
      </>,
    ],
  },
];

export const educations: {
  title: string;
  institution: string;
  date: string;
  note: string | null;
}[] = [
  {
    title: "B.S. in Information Systems Engineering",
    institution: "Universidad Tecnológica Nacional",
    date: "2021 – 2026",
    note: "Graduated with academic honors — 2nd highest GPA in cohort.",
  },
  {
    title: "Certified Tech Developer",
    institution: "Digital House",
    date: "2021 – 2022",
    note: null,
  },
];

export const projects: {
  title: string;
  year: string;
  tags: string[];
  description: ReactNode;
  link: string | null;
  linkLabel: string | null;
}[] = [
  {
    title: "LLM Minigame",
    year: "2026",
    tags: ["React", "Python", "OpenAI"],
    description: (
      <>
        {em("Airlock")} is a single-player social deduction game set on a space
        station. You must ask 5 questions to identify which of three AI
        crewmates is the traitor, each with a unique alibi and personality.
        Playground for experimenting with prompts, speech-to-text and
        text-to-speech.
      </>
    ),
    link: "https://airlock.agusbravo.dev",
    linkLabel: "Play",
  },
  {
    title: "Kubernetes Homelab",
    year: "2026",
    tags: ["Kubernetes", "Argo CD", "Cloudflare"],
    description: (
      <>
        A k3s cluster self-hosts everything I ship under{" "}
        <AccentLink
          href="https://agusbravo.dev"
          variant="secondary"
          className="text-primary font-semibold"
        >
          agusbravo.dev
        </AccentLink>
        . Every app has Cloudflare for DNS and DDoS protection, cert-manager for
        TLS, and Argo CD GitOps for auto-deploys on every push. A simple{" "}
        {mono("install.sh")} spins up the entire setup.
      </>
    ),
    link: "https://github.com/agustinbravop/homelab",
    linkLabel: "See the code",
  },
  {
    title: "Mobile App",
    year: "2025",
    tags: ["React Native", "TypeScript", "Supabase"],
    description: (
      <>
        Launched {em("Elepad")} on the Google Play Store: a full-stack mobile
        app that connects families with their senior relatives. Built with Expo
        and Material UI. Final-year capstone project executed by a team of 5 top
        students, from product discovery to final delivery.
      </>
    ),
    link: "https://www.linkedin.com/posts/agustinbravop_softwareengineering-productdesign-ux-ugcPost-7458876019114995712-J40-/",
    linkLabel: "Watch the demo",
  },
  {
    title: "Chrome Extension",
    year: "2024",
    tags: ["JavaScript", "Open Source"],
    description: (
      <>
        {em("Michiutilidades")} is an open-source browser extension for my
        university's website that gives students useful additional tools. Built
        in two days, now with {em("100+ weekly active users")}.
      </>
    ),
    link: "https://chromewebstore.google.com/detail/michiutilidades-sysacad-f/hgccklchbgcdkjdjpbhedjjlklpgfjnk",
    linkLabel: "Chrome Web Store",
  },
  {
    title: "University Notes",
    year: "2024",
    tags: ["Obsidian", "Markdown", "Documentation"],
    description: (
      <>
        All my class notes from university are available to everyone on{" "}
        {em("Mis Apuntes de ISI")}, a static website generated from an Obsidian
        wiki. It has helped dozens of students pass their exams.
      </>
    ),
    link: "https://apuntes.agusbravo.dev",
    linkLabel: "Visit",
  },
];
