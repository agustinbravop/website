import { useState, useEffect, useRef } from "react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/agustinbravop", external: true },
  { label: "GitHub", href: "https://github.com/agustinbravop", external: true },
  { label: "Twitter", href: "https://www.x.com/agustinbravop", external: true },
  { label: "Email", href: "mailto:anbravoperez@gmail.com", external: false },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? scrolled / total : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      setScrolled(scrolled > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.6)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      {/* Progress line — scaleX from left, no layout cost */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <div
          ref={progressRef}
          className="w-full h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
            transform: "scaleX(0)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-zinc-50 font-semibold text-base tracking-tight hover:text-amber-400 transition-colors shrink-0"
        >
          Agustín Bravo
        </a>

        <div className="flex items-center gap-5">
          {socialLinks.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-base text-zinc-400 hover:text-amber-400 transition-colors tracking-tight"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
