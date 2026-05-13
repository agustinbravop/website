import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";

interface Project {
  title: string;
  year: string;
  description: string;
  tags?: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: "Mobile App",
    year: "2025",
    description:
      "Built a React Native app to help families stay connected with senior relatives. Led a team of 5 engineers to ensure delivery on time.",
  },
  {
    title: "Chrome Extension",
    year: "2024",
    description:
      "Extension with 100+ weekly active users for my university's website.",
  },
];

const PortfolioModal = () => {
  const { isPortfolioModalOpen, setIsPortfolioModalOpen } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedProject = projects[selectedIndex];

  return (
    <AnimatePresence>
      {isPortfolioModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsPortfolioModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-[900px] h-[600px] bg-[#1C1C1C]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden flex"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-64 border-r border-white/10 flex flex-col">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">Projects</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full p-4 text-left border-b border-white/5 transition-colors cursor-pointer ${
                      selectedIndex === index
                        ? "bg-teal-500/20 border-l-2 border-l-teal-500"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <p className="text-sm text-gray-400">{project.year}</p>
                    <p className="text-white font-semibold">{project.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="p-6 border-b border-white/10 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-400 mt-1">{selectedProject.year}</p>
                </div>
                <button
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-gray-200 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>
                {selectedProject.tags && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;
