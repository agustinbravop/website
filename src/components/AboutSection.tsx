import { ArrowDownToLine } from "lucide-react";
import { profile } from "@/data";

export default function AboutSection() {
  const [first, ...rest] = profile.bio;
  return (
    <section className="mt-8">
      <p className="font-bold text-primary">{first}</p>
      {rest.map((line) => (
        <p key={line}>{line}</p>
      ))}

      <a
        href={profile.resumeUrl}
        download
        className="group/resume inline-flex items-center gap-1.5 mt-4 font-mono text-primary"
      >
        <ArrowDownToLine className="size-3.5 transition-transform duration-150 group-hover/resume:translate-y-0.5" />
        <span className="link-underline">Download resume</span>
      </a>
    </section>
  );
}
