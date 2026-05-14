import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useWindowSize } from "../hooks/useWindowSize";
import { GripVertical, ChevronDown } from "lucide-react";

interface PanelProps {
  id: string;
  label: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
  width?: number;
  zIndex: number;
}

const Panel: React.FC<PanelProps> = ({
  id,
  label,
  content,
  initialPosition,
  width = 384,
  zIndex,
}) => {
  const dragControls = useDragControls();
  const { dispatch } = useAppContext();
  const [windowWidth, windowHeight] = useWindowSize();
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelDimensions, setPanelDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    if (panelRef.current) {
      setPanelDimensions({
        width: panelRef.current.clientWidth,
        height: panelRef.current.clientHeight,
      });
    }
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, [panelRef]);

  const centeredInitialPosition = {
    x: initialPosition.x + windowWidth / 2,
    y: initialPosition.y,
  };

  const clampedPosition = React.useMemo(() => {
    const maxX = Math.max(0, windowWidth - panelDimensions.width);
    const maxY = Math.max(0, windowHeight - panelDimensions.height);
    return {
      x: Math.min(Math.max(0, centeredInitialPosition.x), maxX),
      y: Math.min(Math.max(headerHeight, centeredInitialPosition.y), maxY),
    };
  }, [
    centeredInitialPosition,
    windowWidth,
    windowHeight,
    panelDimensions.width,
    panelDimensions.height,
    headerHeight,
  ]);

  const bringToFront = () => {
    dispatch({ type: "BRING_TO_FRONT", payload: { id } });
  };

  const handleHeaderPointerDown = (event: React.PointerEvent) => {
    setIsDragging(true);
    dragControls.start(event);
  };

  const handleDragStart = () => {
    bringToFront();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const dragConstraints = {
    left: 0,
    right: windowWidth - panelDimensions.width / 1.5,
    top: headerHeight,
    bottom: windowHeight - panelDimensions.height / 3,
  };

  return (
    <motion.div
      ref={panelRef}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragTransition={{ power: 0, timeConstant: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        zIndex,
        width: `${width}px`,
        x: clampedPosition.x,
        y: clampedPosition.y,
      }}
      className={`absolute bg-[#1C1C1C]/60 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl text-gray-200 font-sans ${isDragging ? "select-none" : ""}`}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 15px 40px rgba(0,0,0,0.5)",
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      onMouseDown={bringToFront}
      dragConstraints={dragConstraints}
    >
      <div
        onPointerDown={handleHeaderPointerDown}
        className={`bg-black/20 px-4 ${label ? "py-2" : "py-1"} rounded-t-lg font-bold text-gray-100 cursor-grab active:cursor-grabbing flex items-center justify-between`}
      >
        <div className="flex items-center">
          <GripVertical className="w-4 h-4 mr-2 text-gray-500" />
          {label}
        </div>
        {label && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-mist-800 transition-colors text-gray-400 hover:text-white"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
            />
          </button>
        )}
      </div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="p-4 text-base text-gray-400 whitespace-pre-wrap overflow-hidden"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Panel;
