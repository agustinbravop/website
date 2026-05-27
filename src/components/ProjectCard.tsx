import type { Project } from "../data/portfolioData";
import TagChip from "./TagChip";

interface Props {
  project: Project;
  onClose: () => void;
  onBack?: () => void;
}

export default function ProjectCard({ project, onClose, onBack }: Props) {
  return (
    <section className="relative w-full h-full bg-[#1C1C1C]/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to overview"
          className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white rounded-full transition-colors text-sm cursor-pointer z-10"
        >
          ← Back
        </button>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white rounded-full transition-colors text-xl leading-none cursor-pointer z-10"
      >
        ×
      </button>

      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm sm:text-base transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {project.linkLabel ?? "View project"}
                </a>
              )}
              <span className="ml-auto text-sm sm:text-base text-gray-400 whitespace-nowrap">
                {project.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>

            <div
              className={`w-full rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient} mb-6`}
            >
              {project.media?.type === "video" ? (
                <video
                  src={project.media.src}
                  poster={project.media.poster}
                  muted
                  controls
                  playsInline
                  className="w-full h-auto object-cover"
                />
              ) : project.media?.type === "image" ? (
                <img
                  src={project.media.src}
                  alt={project.media.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="aspect-[16/9]" />
              )}
            </div>

            <div className="mt-6 space-y-5">
              <p className="text-gray-200 text-base leading-relaxed">
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
          </div>
        </div>
      </div>
    </section>
  );
}
