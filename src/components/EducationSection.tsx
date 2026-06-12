import { educations } from "@/data";

export default function EducationSection() {
  return (
    <section className="mt-8">
      <p className="font-mono text-sm text-muted-foreground mb-2">Education</p>
      <div className="flex flex-col gap-5 pt-2">
        {educations.map((edu, i) => (
          <div key={i}>
            <div className="grid grid-cols-[1fr_auto] items-start gap-x-4">
              <p className="font-medium">{edu.title}</p>
              <span className="font-mono text-sm text-muted-foreground mt-0.5">
                {edu.date}
              </span>
            </div>
            <p className="mt-0.5 text-[15px] text-secondary-foreground">
              {edu.institution}
            </p>
            {edu.note && (
              <p className="mt-0.5 text-sm text-muted-foreground">{edu.note}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
