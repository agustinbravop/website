import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "./SplitText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(2, -10 * t);
          el.textContent = String(Math.round(eased * to)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix]);

  return (
    <span
      ref={ref}
      className="text-zinc-100 font-semibold"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      0{suffix}
    </span>
  );
}

const experiences = [
  {
    title: "Engineering Intern",
    company: "ECOM Chaco S.A.",
    date: "Jun 2025 – Nov 2025",
    highlight: "Ramped up to key contributor across dev tooling and platform engineering within two months.",
    bullets: [
      { jsx: <>Built the internal portal for our infrastructure self-service platform, end-to-end.</> },
      { jsx: <>Migrated <CountUp to={50} suffix="+" /> live services to Kubernetes.</> },
      { jsx: <>Reduced deployment times from <span className="text-zinc-100 font-semibold">days to minutes</span> via CI/CD improvements.</> },
      { jsx: <>Deployed observability with Prometheus and Grafana across <CountUp to={100} suffix="+" /> apps.</> },
      { jsx: <>Implemented a data pipeline to prove team impact with data-driven insights.</> },
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    company: "Universidad Tecnológica Nacional",
    date: "Apr 2023 – Nov 2025",
    highlight: null,
    bullets: [
      { jsx: <>Collaborated on three interdisciplinary research projects.</> },
      { jsx: <>Co-authored and published <span className="text-zinc-100 font-semibold">two papers</span> at national academic conferences.</> },
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.25"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bold text-zinc-50 tracking-tighter mb-12">
            <SplitText>Experience.</SplitText>
          </h2>

          {/* Entries with scroll-linked vertical line scoped to this div */}
          <div ref={sectionRef} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px overflow-hidden hidden sm:block" aria-hidden>
              <motion.div
                className="w-full h-full origin-top"
                style={{
                  background: "linear-gradient(to bottom, rgba(245,158,11,0.08), rgba(245,158,11,0.3), rgba(245,158,11,0.08))",
                  scaleY: lineScaleY,
                }}
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="sm:pl-10 space-y-20"
            >
              {experiences.map((exp, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-50 tracking-tight">{exp.title}</h3>
                      <p className="text-zinc-400 text-lg mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-zinc-400 text-base font-mono tracking-tight">{exp.date}</span>
                  </div>

                  {exp.highlight && (
                    <p className="text-zinc-200 text-lg mt-4 mb-5 leading-relaxed" style={{ maxWidth: "60ch" }}>
                      {exp.highlight}
                    </p>
                  )}

                  <ul className="space-y-2.5 mt-4">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-lg">
                        <span className="text-amber-500 font-mono mt-1 select-none shrink-0">▪</span>
                        <span className="text-zinc-300">{b.jsx}</span>
                      </li>
                    ))}
                  </ul>

                  {i < experiences.length - 1 && (
                    <div className="mt-20 h-px bg-white/[0.06]" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
      </div>
    </section>
  );
}
