import { stack } from "@/data";

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: string[];
  duration: string;
  reverse?: boolean;
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
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="font-mono whitespace-nowrap text-muted-foreground px-3 sm:px-4"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StackSection() {
  return (
    <section className="mt-8">
      <p className="font-mono text-sm text-muted-foreground mb-4">Stack</p>
      <div className="flex flex-col gap-3 text-sm">
        <MarqueeRow items={stack[0]} duration="17s" />
        <MarqueeRow items={stack[1]} duration="21s" reverse />
      </div>
    </section>
  );
}
