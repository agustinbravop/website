import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolioData";
import TagChip from "./TagChip";
import SplitText from "./SplitText";

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-bold text-zinc-50 tracking-tighter mb-12">
          <SplitText>Projects.</SplitText>
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {projects.map((project, i) => {
            const isOpen = expanded === i;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div key={project.title} className="border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full py-8 text-left group cursor-pointer"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <div className="flex items-baseline gap-6">
                      <span className="text-amber-500 font-mono text-sm w-6 shrink-0 select-none">
                        {num}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight group-hover:text-amber-400 transition-colors duration-150">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="text-zinc-400 font-mono text-sm hidden sm:block">
                        {project.year}
                      </span>
                      <span className="text-amber-500 font-mono text-base leading-none w-3 text-right select-none">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 ml-12 flex-wrap">
                    {project.tags.map((tag) => (
                      <TagChip key={tag} tag={tag} />
                    ))}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="ml-12 mb-12">
                        {/* Amber border draws left-to-right on open */}
                        <div className="overflow-hidden h-px mb-6" aria-hidden>
                          <motion.div
                            className="h-full origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                            style={{ background: "rgba(245,158,11,0.25)" }}
                          />
                        </div>
                      <div className="grid sm:grid-cols-[220px_1fr] gap-8">
                        {/* Visual block */}
                        <div
                          className={`w-full aspect-[4/3] bg-gradient-to-br ${project.gradient} overflow-hidden relative flex-none`}
                        >
                          {project.media?.type === "image" && (
                            <img
                              src={project.media.src}
                              alt={project.media.alt}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                            />
                          )}
                          {project.media?.type === "video" && (
                            <video
                              src={project.media.src}
                              poster={project.media.poster}
                              muted
                              autoPlay
                              loop
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                            />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-5">
                          <p className="text-zinc-200 text-lg leading-relaxed" style={{ maxWidth: "55ch" }}>
                            {project.description}
                          </p>

                          {project.highlights.length > 0 && (
                            <ul className="space-y-2">
                              {project.highlights.map((h, j) => (
                                <li key={j} className="flex items-start gap-3 text-lg">
                                  <span className="text-amber-500 font-mono mt-0.5 select-none">▪</span>
                                  <span className="text-zinc-300">{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-base font-medium transition-colors self-start mt-1"
                            >
                              {project.linkLabel ?? "View project"}
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="border-t border-white/[0.06]" />
        </motion.div>
      </div>
    </section>
  );
}
