import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { projects } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.035, duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

const PortfolioModal = () => {
  const { isPortfolioModalOpen, setIsPortfolioModalOpen } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPortfolioModalOpen) return;
    document.body.style.overflow = "hidden";
    containerRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPortfolioModalOpen]);

  useEffect(() => {
    if (!isPortfolioModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setIsPortfolioModalOpen(false);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + projects.length) % projects.length);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % projects.length);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          e.preventDefault();
          setSelectedIndex((i) =>
            e.key === "ArrowLeft"
              ? (i - 1 + projects.length) % projects.length
              : (i + 1) % projects.length,
          );
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPortfolioModalOpen, setIsPortfolioModalOpen]);

  return (
    <AnimatePresence>
      {isPortfolioModalOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsPortfolioModalOpen(false)}
        >
          <motion.div
            ref={containerRef}
            tabIndex={-1}
            key="modal"
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[92vw] h-[88vh] max-w-6xl bg-[#1C1C1C]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:w-80 border-r border-white/10 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Portfolio
                </span>
                <button
                  onClick={() => setIsPortfolioModalOpen(false)}
                  aria-label="Close"
                  className="text-gray-400 hover:text-white text-xl leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {projects.map((project, index) => (
                  <motion.button
                    key={project.title}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-3 text-left border-b border-white/5 transition-all cursor-pointer ${
                      selectedIndex === index
                        ? "bg-teal-500/10 border-l-2 border-l-teal-500"
                        : "hover:bg-white/5 hover:-translate-y-px hover:border-white/20"
                    }`}
                  >
                    <p className="text-white font-semibold text-sm">
                      {project.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {project.year}
                    </p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <ProjectCard
                    project={projects[selectedIndex]}
                    onClose={() => setIsPortfolioModalOpen(false)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;
