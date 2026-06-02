import { ArrowDownToLine } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="mt-8">
      <p className="font-bold text-primary">Full stack, full ownership.</p>
      <p>From idea to production, from interface to infrastructure.</p>
      <p>
        Shipping fast and working closely with customers to build solutions they
        love.
      </p>
      <p>
        Chasing steep learning curves since forever: math olympiads, coding, and
        now AI.
      </p>
      <p>
        Deeply into the future of startups, product design, and business
        strategy.
      </p>

      <a
        href="/AgustinBravo_Resume.pdf"
        download
        className="group/resume inline-flex items-center gap-1.5 mt-4 font-mono text-primary"
      >
        <ArrowDownToLine className="size-3.5 transition-transform duration-150 group-hover/resume:translate-y-0.5" />
        <span className="link-underline">Download resume</span>
      </a>
    </section>
  );
}
