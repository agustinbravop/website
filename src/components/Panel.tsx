import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useWindowSize } from "../hooks/useWindowSize";

interface PanelProps {
  id: string;
  label: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
  width?: number;
  zIndex: number;
  headerHeight: number;
}

const Panel: React.FC<PanelProps> = ({
  id,
  label,
  content,
  initialPosition,
  width = 384,
  zIndex,
  headerHeight,
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

  useLayoutEffect(() => {
    if (panelRef.current) {
      setPanelDimensions({
        width: panelRef.current.clientWidth,
        height: panelRef.current.clientHeight,
      });
    }
  }, [panelRef]);

  const clampedPosition = React.useMemo(() => {
    const maxX = Math.max(0, windowWidth - panelDimensions.width);
    const maxY = Math.max(0, windowHeight - panelDimensions.height);
    return {
      x: Math.min(Math.max(0, initialPosition.x), maxX),
      y: Math.min(Math.max(headerHeight, initialPosition.y), maxY),
    };
  }, [
    initialPosition,
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
        className="bg-black/20 px-4 py-2 rounded-t-lg font-bold text-gray-100 cursor-grab active:cursor-grabbing"
      >
        {label}
      </div>
      <div className="p-4 text-base text-gray-400 whitespace-pre-wrap">
        {content}
      </div>
    </motion.div>
  );
};

export default Panel;
