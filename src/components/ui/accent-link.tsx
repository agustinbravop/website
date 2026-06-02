import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccentLink({
  href,
  external,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group/link inline-flex items-center",
        variant === "primary" && "gap-1.5 font-mono text-primary",
        variant === "secondary" &&
          "gap-0.5 text-secondary-foreground transition-colors duration-150 hover:text-primary",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      {external && (
        <ArrowUpRight className="size-3.25 mb-px transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      )}
    </a>
  );
}
