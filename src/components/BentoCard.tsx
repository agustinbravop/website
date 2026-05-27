import type { Project } from "../data/portfolioData";
import TagChip from "./TagChip";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function BentoCard({ project, onClick }: Props) {
  if (project.featured) {
    return (
      <div
        onClick={onClick}
        className={`col-span-2 h-[220px] rounded-xl border border-white/10 overflow-hidden cursor-pointer relative bg-gradient-to-br ${project.gradient} transition-all duration-200 hover:scale-[1.02] hover:shadow-xl`}
      >
        {project.media?.type === "image" && (
          <img
            src={project.media.src}
            alt={project.media.alt}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-300 truncate mt-1">{project.description}</p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {project.tags.slice(0, 4).map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm mt-2 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {project.linkLabel ?? "View project"}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="col-span-1 h-[160px] rounded-xl border border-white/10 overflow-hidden cursor-pointer flex flex-col transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className={`flex-[0_0_55%] bg-gradient-to-br ${project.gradient}`} />
      <div className="flex-1 bg-[#1C1C1C] p-3">
        <p className="text-white font-semibold text-sm truncate">{project.title}</p>
        <p className="text-gray-400 text-xs mt-0.5">{project.year}</p>
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
