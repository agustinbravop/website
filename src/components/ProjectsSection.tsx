import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccentLink from "@/components/ui/accent-link";

const em = (text: string) => (
  <span className="font-semibold text-primary">{text}</span>
);

const projects: {
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
        {em("Airlock")} is a social deduction game set on a space station. You
        must ask 5 questions to identify which of three LLM crewmates is the
        traitor, each with a unique alibi and personality. This project served
        as an interesting playground for experimenting with prompts,
        speech-to-text and text-to-speech.
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
        I built a k3s cluster to self-host everything I ship under{" "}
        <AccentLink
          href="https://agusbravo.dev"
          variant="secondary"
          className="text-primary font-semibold"
        >
          agusbravo.dev
        </AccentLink>
        . Every app has Cloudflare for DNS and DDoS protection, cert-manager for
        TLS, and Argo CD GitOps for auto-deploys on every push. A simple{" "}
        <span className="font-mono tracking-tighter">install.sh</span> spins up
        the entire setup.
      </>
    ),
    link: "https://github.com/agustinbravop/homelab",
    linkLabel: "See the code",
  },
  {
    title: "Mobile App",
    year: "2025",
    tags: ["TypeScript", "React Native", "Expo", "Supabase"],
    description: (
      <>
        Launched {em("Elepad")} on the Google Play Store: a full-stack mobile
        app that connects families with their senior relatives. Built as a
        capstone project by a team of 5 engineers that owned it from product
        discovery to final delivery.
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
        Shipped {em("Michiutilidades")}, an open-source browser extension built
        for students at my university. It took just two days to make and has
        {em(" 100+ weekly active users")}.
      </>
    ),
    link: "https://chromewebstore.google.com/detail/michiutilidades-sysacad-f/hgccklchbgcdkjdjpbhedjjlklpgfjnk",
    linkLabel: "Chrome Web Store",
  },
  {
    title: "University Notes",
    year: "2024",
    tags: ["SSG", "Markdown", "Obsidian", "Documentation"],
    description: (
      <>
        Published {em("Mis Apuntes de ISI")}, a static website with all my class
        notes from university available to everyone. I like open-sourcing
        knowledge, especially when it's useful to others. It's helped dozens of
        students pass their exams.
      </>
    ),
    link: "https://apuntes.agusbravo.dev",
    linkLabel: "Visit",
  },
];

export default function ProjectsSection() {
  return (
    <section className="mt-8">
      <p className="font-mono text-sm text-muted-foreground mb-2">Projects</p>

      <Accordion type="single" collapsible>
        {projects.map((project, i) => (
          <AccordionItem key={i} value={`project-${i}`}>
            <AccordionTrigger>
              <div className="flex flex-1 items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-medium text-base text-foreground shrink-0 transition-colors duration-200 group-aria-expanded/accordion-trigger:text-primary">
                    {project.title}
                  </span>
                  <span className="font-mono text-[0.8125rem] text-muted-foreground truncate">
                    {project.tags.join(" · ")}
                  </span>
                </div>
                <span className="font-mono text-sm text-muted-foreground shrink-0">
                  {project.year}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-[15px] text-secondary-foreground leading-relaxed">
                {project.description}
              </p>
              {project.link && (
                <AccentLink href={project.link} external className="mt-3">
                  {project.linkLabel ?? "View project"}
                </AccentLink>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
