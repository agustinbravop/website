import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";

const em = (text: string) => (
  <span className="font-semibold text-primary">{text}</span>
);

const experiences: {
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
        {em("within two months")}, working with tools like kubectl, Argo CD,
        Vault, shell-operator and OTel.
      </>,
      <>
        Contributed to an internal full-stack platform building workflows that
        enable infrastructure self-service for developers.
      </>,
      <>
        Migrated {em("50+")} live services with thousands of users to
        Kubernetes.
      </>,
      <>
        Reduced deployment times from {em("hours to minutes")} via CI/CD
        improvements and script automations.
      </>,
      <>
        Deployed observability with Prometheus and Grafana across {em("100+")}{" "}
        apps.
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

const educations = [
  {
    title: "B.S. in Information Systems Engineering",
    institution: "Universidad Tecnológica Nacional",
    date: "2021 – 2025",
    note: "Graduated with academic honors — 2nd highest GPA in cohort.",
  },
  {
    title: "Certified Tech Developer",
    institution: "Digital House",
    date: "2021 – 2022",
    note: null,
  },
];

export default function ExperienceSection() {
  return (
    <>
      <section>
        <p className="mt-8 font-mono text-sm text-muted-foreground mb-2">
          Work
        </p>

        <Accordion type="single" collapsible>
          {experiences.map((exp, i) => (
            <AccordionItem key={i} value={`exp-${i}`}>
              <AccordionTrigger>
                <div className="flex flex-1 items-baseline justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground transition-colors duration-200 group-aria-expanded/accordion-trigger:text-primary">
                      {exp.title}
                    </p>
                    <p className="mt-0.5">{exp.company}</p>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground shrink-0">
                    {exp.date}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-[15px] text-secondary-foreground"
                    >
                      <span className="size-0.75 shrink-0 rounded-full mt-2.5 bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-8">
        <p className="font-mono text-sm text-muted-foreground mb-2">
          Education
        </p>
        <div className="flex flex-col gap-5 pt-2">
          {educations.map((edu, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-medium">{edu.title}</p>
                <span className="font-mono text-sm text-muted-foreground shrink-0">
                  {edu.date}
                </span>
              </div>
              <p className="mt-0.5 text-[15px] text-secondary-foreground">
                {edu.institution}
              </p>
              {edu.note && (
                <p className="mt-0.5 text-[15px] text-secondary-foreground">
                  {edu.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
