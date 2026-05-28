import { motion } from "framer-motion";
import icons from "./skillIcons";
import SplitText from "./SplitText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const productSkills = [
  { label: "React", icon: icons.react },
  { label: "TypeScript", icon: icons.typescript },
  { label: "Python", icon: icons.python },
  { label: "Tailwind CSS", icon: icons.tailwindcss },
  { label: "PostgreSQL", icon: icons.postgresql },
];

const platformSkills = [
  { label: "Go", icon: icons.go },
  { label: "Docker", icon: icons.docker },
  { label: "Kubernetes", icon: icons.kubernetes },
  { label: "AWS", icon: icons.aws },
  { label: "Linux", icon: icons.linux },
];

const educations = [
  {
    title: "B.S. in Information Systems Engineering",
    institution: "Universidad Tecnológica Nacional",
    location: "Argentina",
    date: "2021 – 2025",
    note: "Graduated with academic honors — 2nd highest GPA in cohort.",
  },
  {
    title: "Certified Tech Developer",
    institution: "Digital House",
    location: "Argentina",
    date: "2021 – 2022",
    note: null,
  },
];

function SkillRow({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-white/[0.06] group">
      <div
        className="w-4 h-4 flex-none opacity-60 group-hover:opacity-100 transition-opacity"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <span className="text-zinc-300 text-lg tracking-tight group-hover:text-zinc-100 transition-colors">
        {label}
      </span>
    </div>
  );
}

export default function StackSection() {
  return (
    <section id="stack" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-zinc-50 tracking-tighter mb-12">
            <SplitText>Full-stack.</SplitText>
            {" "}
            <SplitText className="text-zinc-500" delay={0.22}>Product to platform.</SplitText>
          </h2>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-0"
          >
            {/* Left 50%: Skills */}
            <div className="sm:pr-12 pb-12 sm:pb-0 relative">
              <div className="grid grid-cols-2 gap-x-8">
                <div>
                  <p className="text-amber-500 text-xs font-mono uppercase tracking-widest mb-6">Product</p>
                  {productSkills.map((s) => <SkillRow key={s.label} {...s} />)}
                </div>
                <div>
                  <p className="text-amber-500 text-xs font-mono uppercase tracking-widest mb-6">Platform</p>
                  {platformSkills.map((s) => <SkillRow key={s.label} {...s} />)}
                </div>
              </div>

              {/* Drawn vertical divider — right edge of skills column */}
              <div className="absolute top-0 right-0 bottom-0 w-px overflow-hidden hidden sm:block" aria-hidden>
                <motion.div
                  className="w-full h-full origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>
            </div>

            {/* Right 50%: Education */}
            <div className="sm:pl-12 pt-12 sm:pt-0">
              <p className="text-amber-500 text-xs font-mono uppercase tracking-widest mb-6">Education</p>
              <div className="space-y-8">
                {educations.map((edu, i) => (
                  <div key={i} className="border-b border-white/[0.06] pb-8 last:border-0 last:pb-0">
                    <p className="text-zinc-100 font-semibold text-lg leading-snug">{edu.title}</p>
                    <p className="text-zinc-400 text-base mt-1">{edu.institution}, {edu.location}</p>
                    <p className="text-zinc-400 text-sm font-mono mt-1">{edu.date}</p>
                    {edu.note && <p className="text-zinc-400 text-base mt-2 leading-relaxed">{edu.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
