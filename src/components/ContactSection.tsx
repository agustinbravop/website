import { motion } from "framer-motion";
import SplitText from "./SplitText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/agustinbravop",
    external: true,
  },
  { label: "GitHub", href: "https://github.com/agustinbravop", external: true },
  { label: "Twitter", href: "https://www.x.com/agustinbravop", external: true },
  { label: "Email", href: "mailto:anbravoperez@gmail.com", external: false },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-50 tracking-tighter leading-[1.05]">
          <SplitText>Let's build something.</SplitText>
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-8"
        >
          <motion.p
            variants={fadeUp}
            className="text-zinc-300 text-xl leading-relaxed"
            style={{ maxWidth: "40ch" }}
          >
            Looking for my next challenge at an ambitious startup where talented
            teams work hard.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-8">
            {links.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-zinc-400 hover:text-amber-400 transition-colors text-lg tracking-tight"
              >
                {label}
              </a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-24 pt-8 border-t border-white/[0.05]"
          >
            <p className="text-zinc-400 text-sm font-mono">
              Agustín Bravo &copy; {new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
