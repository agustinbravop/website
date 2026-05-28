# Portfolio Gallery Modal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the basic PortfolioModal with The Gallery — a full-screen immersive modal with draggable project cards, 3D tilt, parallax transitions, and a sidebar navigator.

**Architecture:** Three files: data layer (`portfolioData.ts`) with enriched Project type, card component (`ProjectCard.tsx`) with tilt/swipe/glass panel, and the rewritten `PortfolioModal.tsx` orchestrating sidebar + AnimatePresence transitions. Framer Motion handles all animation.

**Tech Stack:** React 19, TypeScript, Framer Motion, Tailwind CSS v4, Vite

---

### Task 1: Create portfolioData.ts

**Files:**
- Create: `src/data/portfolioData.ts`

- [ ] **Create the data file**

```typescript
export interface Project {
  title: string
  initials: string
  year: string
  role: string
  description: string
  highlights: string[]
  tags: string[]
  gradient: string
  link?: string
  linkLabel?: string
}

export const projects: Project[] = [
  {
    title: "Mobile App",
    initials: "MA",
    year: "2025",
    role: "Lead Engineer",
    description:
      "Built a React Native app to help families stay connected with senior relatives. Led a team of 5 engineers to ensure delivery on time.",
    highlights: [
      "Led cross-functional team of 5 engineers",
      "React Native with Expo for cross-platform deployment",
      "Real-time messaging with Firebase Cloud Messaging",
    ],
    tags: ["React Native", "TypeScript", "Firebase", "Expo"],
    gradient: "from-teal-900 via-cyan-900 to-blue-900",
    link: "https://github.com",
    linkLabel: "View on GitHub",
  },
  {
    title: "Chrome Extension",
    initials: "CE",
    year: "2024",
    role: "Solo Developer",
    description:
      "Extension with 100+ weekly active users for my university's website.",
    highlights: [
      "100+ weekly active users",
      "Automated course registration workflow",
      "Chrome Web Store publishing & maintenance",
    ],
    tags: ["JavaScript", "Chrome APIs", "HTML/CSS"],
    gradient: "from-violet-900 via-purple-900 to-fuchsia-900",
    link: "https://github.com",
    linkLabel: "View on GitHub",
  },
]
```

- [ ] **Commit**
```bash
git add src/data/portfolioData.ts
git commit -m "feat: add portfolio data layer with enriched Project type"
```

---

### Task 2: Create ProjectCard.tsx

**Files:**
- Create: `src/components/ProjectCard.tsx`

Component with:
- Framer Motion `motion.div` with drag, for swipe
- 3D tilt via mouse position tracking
- Hero gradient area + glass detail panel
- Close button

- [ ] **Create the ProjectCard component**

```typescript
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import type { Project } from "../data/portfolioData"

interface Props {
  project: Project
  onClose: () => void
  onSwipe: (direction: "left" | "right") => void
}

export default function ProjectCard({ project, onClose, onSwipe }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotate({
      x: ((y - centerY) / centerY) * -3,
      y: ((x - centerX) / centerX) * 3,
    })
  }

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 })

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    setIsDragging(false)
    setRotate({ x: 0, y: 0 })
    const swipeThreshold = 80
    if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      onSwipe("right")
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      onSwipe("left")
    }
  }

  return (
    <motion.div
      ref={cardRef}
      drag="x"
      dragElastic={0.3}
      dragSnapToOrigin
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="relative w-full h-full bg-[#1C1C1C]/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* Hero gradient area */}
      <div className={`h-72 bg-gradient-to-br ${project.gradient}`} />

      {/* Glass detail panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1C1C1C]/80 backdrop-blur-md border-t border-white/10 p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white">
                {project.title}
              </h2>
              <span className="text-sm text-gray-400">{project.year}</span>
            </div>
            <p className="text-teal-400 text-sm font-medium mb-3">
              {project.role}
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              {project.description}
            </p>
            {project.highlights.length > 0 && (
              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                    <span className="text-teal-500 mt-1">◆</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto px-4 py-1.5 bg-teal-600/80 hover:bg-teal-600 text-white text-sm rounded-lg transition-colors"
                >
                  {project.linkLabel ?? "View project"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white rounded-full transition-colors text-lg leading-none cursor-pointer z-10"
      >
        ×
      </button>
    </motion.div>
  )
}
```

- [ ] **Commit**
```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard with swipe, 3D tilt, and glass detail panel"
```

---

### Task 3: Rewrite PortfolioModal.tsx

**Files:**
- Modify: `src/components/PortfolioModal.tsx` (full rewrite)

Full-screen modal with:
- AnimatePresence open/close
- 60px sidebar with dots + initials
- AnimatePresence card transitions (slide direction based on nav)
- Arrow key + Escape keyboard nav
- Click-outside to close

- [ ] **Rewrite PortfolioModal.tsx**

```typescript
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppContext } from "../context/AppContext"
import { projects } from "../data/portfolioData"
import ProjectCard from "./ProjectCard"

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
}

export default function PortfolioModal() {
  const { isPortfolioModalOpen, setIsPortfolioModalOpen } = useAppContext()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = useCallback(
    (dir: "left" | "right") => {
      setDirection(dir === "right" ? 1 : -1)
      setSelectedIndex((prev) => {
        const next = dir === "right" ? prev + 1 : prev - 1
        if (next < 0) return projects.length - 1
        if (next >= projects.length) return 0
        return next
      })
    },
    [],
  )

  const goTo = useCallback((index: number) => {
    setDirection(index > selectedIndex ? 1 : -1)
    setSelectedIndex(index)
  }, [selectedIndex])

  const close = useCallback(() => {
    setIsPortfolioModalOpen(false)
  }, [setIsPortfolioModalOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPortfolioModalOpen) return
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") navigate("right")
      if (e.key === "ArrowLeft") navigate("left")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPortfolioModalOpen, navigate, close])

  if (!isPortfolioModalOpen) return null

  const cardVariants = {
    enter: (d: number) => ({ x: d > 0 ? 400 : -400, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -400 : 400, opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={close}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-[90vw] h-[85vh] max-w-6xl flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="w-16 flex flex-col items-center justify-center gap-5 mr-4">
          {projects.map((project, i) => (
            <motion.button
              key={project.initials}
              custom={i}
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              onClick={() => goTo(i)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
              aria-label={project.title}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-3 h-3 bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                    : "w-2 h-2 bg-gray-600 group-hover:bg-gray-400"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  i === selectedIndex ? "text-teal-400" : "text-gray-600 group-hover:text-gray-400"
                }`}
              >
                {project.initials}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Card area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
              className="absolute inset-0"
            >
              <ProjectCard
                project={projects[selectedIndex]}
                onClose={close}
                onSwipe={navigate}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Commit**
```bash
git add src/components/PortfolioModal.tsx
git commit -m "feat: rewrite PortfolioModal with Gallery layout, sidebar, swipe, and keyboard nav"
```

---

### Task 4: Wire up "See portfolio" button in ButtonsContent.tsx

**Files:**
- Modify: `src/components/ButtonsContent.tsx`

Uncomment the "See portfolio" button and wire it to the context. Add the import.

- [ ] **Edit ButtonsContent.tsx**

Uncomment the import, the button wrapper, and the button itself. Add back the teal shimmer styling:

```typescript
import { useAppContext } from "../context/AppContext";

const ButtonsContent = () => {
  const { setIsPortfolioModalOpen } = useAppContext();

  return (
    <div className="flex gap-3 px-4">
      <div className="relative flex-1 rounded group">
        <div
          className="absolute inset-0 rounded border border-teal-500/40 group-hover:border-teal-500/80 animate-[shimmer_5s_linear_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.5) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
        <button
          onClick={() => setIsPortfolioModalOpen(true)}
          className="relative w-full py-2 px-4 bg-[#1C1C1C]/80 text-gray-300 hover:text-teal-400 font-medium text-md rounded transition-all cursor-pointer border border-teal-500/20 active:scale-[0.97] duration-75"
        >
          See portfolio
        </button>
      </div>
      {/* ... download resume button stays the same ... */}
    </div>
  );
};
```

- [ ] **Commit**
```bash
git add src/components/ButtonsContent.tsx
git commit -m "feat: enable See portfolio button with teal shimmer styling"
```

---

### Task 5: Verify build

- [ ] **Run the build to check for TypeScript errors**

```bash
bun run build
```

Expected: No errors, build succeeds.

- [ ] **If errors, fix and re-run**
