import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const em = (text: string) => (
  <span className="font-semibold" style={{ color: "var(--brand)" }}>
    {text}
  </span>
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
    title: "Mobile App",
    year: "2025",
    tags: ["TypeScript", "React Native", "Expo", "Supabase"],
    description: (
      <>
        Launched {em("Elepad")} on the Google Play Store, a full-stack mobile
        app that connects families with their senior relatives. Built as a
        capstone project by a team of 5 engineers that owned it from product
        discovery to final delivery.
      </>
    ),
    link: "https://www.linkedin.com/posts/agustinbravop_softwareengineering-productdesign-ux-ugcPost-7458876019114995712-J40-/",
    linkLabel: "Demo video",
  },
  {
    title: "LLM Minigame",
    year: "2025",
    tags: ["React", "Python", "OpenAI", "LLM"],
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
        knowledge, especially when it's useful to others.
      </>
    ),
    link: "https://apuntes.agusbravo.dev",
    linkLabel: "Visit",
  },
];

export default function ProjectsSection() {
  return (
    <section className="pt-8">
      <p className="label mb-2">Projects</p>

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
                <span className="label shrink-0">{project.year}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="body-text leading-relaxed">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 mt-3 font-mono text-sm text-primary"
                >
                  <span className="link-underline">
                    {project.linkLabel ?? "View project"}
                  </span>
                  <ArrowUpRight className="size-[13px] mb-px transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
