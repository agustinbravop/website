import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer items-start gap-2.5 -mx-2.5 px-2.5 py-2.5 text-left outline-none transition-colors duration-500 aria-expanded:duration-0 sm:duration-150 sm:aria-expanded:duration-150 hover:bg-accent aria-expanded:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <Plus
          className="size-3.75 shrink-0 mt-1 text-muted-foreground transition-all duration-200 group-aria-expanded/accordion-trigger:hidden group-hover/accordion-trigger:scale-110"
          aria-hidden
        />
        <Minus
          className="size-3.75 hidden shrink-0 mt-1 text-primary transition-all duration-200 group-aria-expanded/accordion-trigger:block group-hover/accordion-trigger:scale-110"
          aria-hidden
        />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden -mx-2.5 px-2.5 bg-accent h-(--accordion-panel-height) transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-4 pl-6.25 pr-2.5 [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
