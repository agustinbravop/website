import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccentLink from "@/components/ui/accent-link";
import { projects } from "@/data";

export default function ProjectsSection() {
  return (
    <section className="mt-8">
      <p className="font-mono text-sm text-muted-foreground mb-2">Projects</p>

      <Accordion>
        {projects.map((project, i) => (
          <AccordionItem key={i} value={`project-${i}`} className="border-none">
            <AccordionTrigger>
              <div className="grid grid-cols-[1fr_auto] w-full items-start gap-x-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 min-w-0">
                  <span className="font-medium text-base text-foreground shrink-0 transition-colors duration-200 group-aria-expanded/accordion-trigger:text-primary">
                    {project.title}
                  </span>
                  <span className="font-mono text-[0.8125rem] text-muted-foreground sm:truncate">
                    {project.tags.join(" · ")}
                  </span>
                </div>
                <span className="font-mono text-sm text-muted-foreground mt-0.5">
                  {project.year}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-[15px] text-secondary-foreground leading-relaxed mb-2!">
                {project.description}
              </p>
              {project.link && (
                <AccentLink
                  href={project.link}
                  external
                  className="text-[15px]"
                >
                  {project.linkLabel ?? "View"}
                </AccentLink>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
