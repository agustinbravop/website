import AccentLink from "@/components/ui/accent-link";

const links = [
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

export default function ContactSection() {
  return (
    <section className="mt-8 mb-20">
      <p className="font-mono text-sm text-muted-foreground mb-4">Contact</p>

      <div className="flex flex-col gap-1">
        {links.map(({ label, handle, href }) => (
          <div key={label} className="flex items-baseline gap-4 text-sm">
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
