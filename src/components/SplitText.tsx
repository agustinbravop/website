import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitText({ children, className, delay = 0, stagger = 0.045 }: Props) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <span ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {/* Clip box — only wraps the animating word, not the space */}
          <span style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.15 }}>
            <motion.span
              style={{ display: "inline-block" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: delay + i * stagger,
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* Space lives outside the clip box — always visible, never clipped */}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
