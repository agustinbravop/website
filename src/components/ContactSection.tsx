import AccentLink from "@/components/ui/accent-link";
import { links } from "@/data";

export default function ContactSection() {
  return (
    <section className="mt-8 mb-20">
      <p className="font-mono text-sm text-muted-foreground mb-4">Contact</p>

      <div className="flex flex-col gap-1">
        {links.map(({ label, handle, href }) => (
          <div key={label} className="flex items-baseline gap-6 text-sm">
            <span className="font-mono text-muted-foreground shrink-0 w-18">
              {label}
            </span>
            <AccentLink
              href={href}
              external={!href.startsWith("mailto")}
              variant="secondary"
            >
              {handle}
            </AccentLink>
          </div>
        ))}
      </div>
    </section>
  );
}
