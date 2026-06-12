import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experiences } from "@/data";

export default function WorkSection() {
  return (
    <section>
      <p className="mt-8 font-mono text-sm text-muted-foreground mb-2">
        Work
      </p>

      <Accordion>
        {experiences.map((exp, i) => (
          <AccordionItem key={i} value={`exp-${i}`} className="border-none">
            <AccordionTrigger>
              <div className="w-full sm:grid sm:grid-cols-[1fr_auto] sm:items-start sm:gap-x-4">
                <p className="font-medium text-foreground transition-colors duration-200 group-aria-expanded/accordion-trigger:text-primary sm:col-start-1 sm:row-start-1">
                  {exp.title}
                </p>
                <p className="mt-0.5 sm:col-start-1 sm:row-start-2">
                  {exp.company}
                </p>
                <p className="mt-0.5 font-mono text-sm text-muted-foreground sm:col-start-2 sm:row-start-1 sm:mt-0.5">
                  {exp.date}
                </p>
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
  );
}
