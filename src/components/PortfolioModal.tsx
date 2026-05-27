import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { projects } from "../data/portfolioData";
import type { Project } from "../data/portfolioData";
import BentoCard from "./BentoCard";
import ProjectCard from "./ProjectCard";

const PortfolioModal = () => {
  const { isPortfolioModalOpen, setIsPortfolioModalOpen } = useAppContext();
  const [view, setView] = useState<"overview" | "detail">("overview");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!isPortfolioModalOpen) {
      setView("overview");
      setSelectedProject(null);
    }
  }, [isPortfolioModalOpen]);

  useEffect(() => {
    if (!isPortfolioModalOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPortfolioModalOpen]);

  useEffect(() => {
    if (!isPortfolioModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view === "detail") setView("overview");
        else setIsPortfolioModalOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPortfolioModalOpen, view, setIsPortfolioModalOpen]);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setView("detail");
  };

  return (
    <AnimatePresence>
      {isPortfolioModalOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setIsPortfolioModalOpen(false)}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[92vw] h-[88vh] max-w-6xl bg-[#1C1C1C]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {view === "overview" ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Portfolio
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPortfolioModalOpen(false)}
                      aria-label="Close"
                      className="text-gray-400 hover:text-white text-xl leading-none cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-4 gap-3">
                      {projects.map((project) => (
                        <BentoCard
                          key={project.title}
                          project={project}
                          onClick={() => handleCardClick(project)}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-h-0"
                >
                  {selectedProject && (
                    <ProjectCard
                      project={selectedProject}
                      onClose={() => setIsPortfolioModalOpen(false)}
                      onBack={() => setView("overview")}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;
