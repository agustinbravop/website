import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Project } from "../data/portfolioData";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectCard({ project, onClose }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.section
      key={project.title}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      className="relative w-full h-full bg-[#1C1C1C]/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white rounded-full transition-colors text-xl leading-none cursor-pointer z-10"
      >
        ×
      </button>

      <div className="h-full flex flex-col">
        <div
          className={`relative w-full aspect-[16/9] bg-gradient-to-br ${project.gradient} border-b border-white/10`}
        >
          {project.media?.type === "video" ? (
            <video
              src={project.media.src}
              poster={project.media.poster}
              muted
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : project.media?.type === "image" ? (
            <img
              src={project.media.src}
              alt={project.media.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight truncate">
                    {project.title}
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 text-teal-400 text-sm font-medium">
                  {project.role}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs text-gray-200 bg-white/5 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              <p className="text-gray-200 leading-relaxed">
                {project.description}
              </p>

              {project.highlights.length > 0 && (
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400/90 flex-none" />
                      <span className="text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {project.link && (
              <div className="mt-8">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-teal-600/80 hover:bg-teal-600 text-white text-sm font-medium transition-colors border border-teal-400/20"
                >
                  {project.linkLabel ?? "View project"}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
