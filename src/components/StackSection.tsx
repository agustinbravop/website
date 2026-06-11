import { stack } from "@/data";

function MarqueeRow({
  items,
  duration,
}: {
  items: string[];
  duration: string;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-mono whitespace-nowrap text-muted-foreground px-3 sm:px-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StackSection() {
  return (
    <section className="pt-8">
      <p className="font-mono text-sm text-muted-foreground mb-4">Stack</p>
      <div className="flex flex-col gap-3 text-sm">
        <MarqueeRow items={stack[0]} duration="15s" />
        <MarqueeRow items={stack[1]} duration="15s" />
      </div>
    </section>
  );
}
