import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

interface MobileAccordionProps {
  items: { id: string; label: string; content: React.ReactNode }[];
}

const MobileAccordion: React.FC<MobileAccordionProps> = ({ items }) => {
  const [openIds, setOpenIds] = React.useState<string[]>(["about", "skills"]);
  const nonButtonsItems = items.filter((item) => item.id !== "buttons");
  const buttonsItem = items.find((item) => item.id === "buttons");

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-[#1C1C1C]/60 backdrop-blur-md border border-white/10 rounded-t-lg overflow-hidden">
        {nonButtonsItems.map((item) => (
          <div key={item.id} className="border-b border-white/10">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between w-full bg-black/20 px-4 py-3 font-bold text-gray-100 hover:bg-black/30 transition-colors"
            >
              <span>{item.label}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  openIds.includes(item.id) && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {openIds.includes(item.id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden bg-black/10 px-4 py-3 text-base text-gray-400 whitespace-pre-wrap"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {buttonsItem && (
        <div className="bg-[#1C1C1C]/60 backdrop-blur-md border border-white/10 border-t-0 rounded-b-lg">
          <div className="bg-black/20 px-4 py-3 font-bold text-gray-100">
            <span>{buttonsItem.label}</span>
          </div>
          <div className="px-4 py-3 text-base text-gray-400 whitespace-pre-wrap">
            {buttonsItem.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAccordion;
