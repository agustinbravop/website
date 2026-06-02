import { ArrowUpRight } from "lucide-react";

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
    <section className="pt-8 mb-20">
      <p className="label mb-4">Contact</p>

      <div className="flex flex-col gap-1">
        {links.map(({ label, handle, href }) => (
          <div key={label} className="flex items-baseline gap-4">
            <span className="label shrink-0 w-[4.5rem]">{label}</span>
            <a
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              className="group/link inline-flex items-center gap-0.5 text-sm text-secondary-foreground transition-colors duration-150 hover:text-primary"
            >
              <span className="link-underline">{handle}</span>
              <ArrowUpRight className="size-[13px] mb-px transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
