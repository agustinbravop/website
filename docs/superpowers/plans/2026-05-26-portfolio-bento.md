# Portfolio Bento Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sidebar+detail portfolio modal with a unified bento grid overview where featured projects are larger cells, transitioning into a full-panel detail view on click.

**Architecture:** `PortfolioModal` manages a two-state view (`overview` / `detail`). In overview, a 4-column CSS grid renders `BentoCard` components — `col-span-2` for featured projects, `col-span-1` for regular ones. Clicking any card sets `selectedProject` and switches to detail, which reuses the existing `ProjectCard`.

**Tech Stack:** React, TypeScript, Framer Motion, Tailwind CSS v4, Bun

---

## File Map

| File                                | Action  | Responsibility                                                                                                              |
| ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src/data/portfolioData.ts`         | Modify  | Add `featured?: boolean` to `Project` type; mark featured projects                                                          |
| `src/components/BentoCard.tsx`      | Create  | Renders featured (col-span-2) and regular (col-span-1) card variants                                                        |
| `src/components/PortfolioModal.tsx` | Rewrite | Two-state view, bento grid, keyboard nav                                                                                    |
| `src/components/ProjectCard.tsx`    | Modify  | Add `onBack?: () => void` prop + Back button (spec said no changes, but Back button must live somewhere — here is cleanest) |

---

### Task 1: Add `featured` field to data model

**Files:**

- Modify: `src/data/portfolioData.ts`

- [ ] **Step 1: Add `featured` to the `Project` interface and mark existing projects**

Open `src/data/portfolioData.ts`. The current `Project` interface starts at line 5. Change it to:

```ts
export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export interface Project {
  title: string;
  initials: string;
  year: string;
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  featured?: boolean;
  link?: string;
  linkLabel?: string;
  media?: ProjectMedia;
}
```

Then add `featured: true` to the Atlas Mobile project (the first one in the array — it has richer data and a real image):

```ts
  {
    title: "Atlas Mobile",
    initials: "AM",
    year: "2025",
    featured: true,
    description: "...",
    // rest unchanged
  },
```

Leave Bloom Motion without `featured` (it becomes a regular card).

- [ ] **Step 2: Verify TypeScript accepts the change**

```bash
cd /home/agustinbravop/spellbook/website && bun run tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolioData.ts
git commit -m "feat: add featured field to Project type"
```

---

### Task 2: Create `BentoCard` component

**Files:**

- Create: `src/components/BentoCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
          <p className="text-sm text-gray-300 truncate mt-1">
            {project.description}
          </p>
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
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
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
        <p className="text-white font-semibold text-sm truncate">
          {project.title}
        </p>
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
```

- [ ] **Step 2: Verify TypeScript accepts the new file**

```bash
cd /home/agustinbravop/spellbook/website && bun run tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/BentoCard.tsx
git commit -m "feat: add BentoCard component for portfolio bento grid"
```

---

### Task 3: Add `onBack` prop to `ProjectCard`

**Files:**

- Modify: `src/components/ProjectCard.tsx`

The spec marked this file as unchanged, but the Back button (← overview) must live here — it's the only component rendered in detail view.

- [ ] **Step 1: Add `onBack` to the Props interface**

In `src/components/ProjectCard.tsx`, change the interface at lines 4–7:

```tsx
interface Props {
  project: Project;
  onClose: () => void;
  onBack?: () => void;
}
```

- [ ] **Step 2: Update the function signature and add the Back button**

Change the function signature at line 9:

```tsx
export default function ProjectCard({ project, onClose, onBack }: Props) {
```

Then, inside the `<section>` (after the opening tag at line 11), add the Back button before the existing close button:

```tsx
{
  onBack && (
    <button
      type="button"
      onClick={onBack}
      aria-label="Back to overview"
      className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white rounded-full transition-colors text-sm cursor-pointer z-10"
    >
      ← Back
    </button>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd /home/agustinbravop/spellbook/website && bun run tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add onBack prop to ProjectCard for bento overview navigation"
```

---

### Task 4: Rewrite `PortfolioModal` with bento grid and two-state view

**Files:**

- Modify: `src/components/PortfolioModal.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /home/agustinbravop/spellbook/website && bun run tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run the dev server and open the portfolio modal**

```bash
cd /home/agustinbravop/spellbook/website && bun run dev
```

Open `http://localhost:5173`. Click "See portfolio". Verify:

1. Modal opens with a bento grid — Atlas Mobile as a wide featured card (col-span-2), Bloom Motion as a regular 1-col card
2. Featured card shows gradient background, image overlay (blurred, low opacity), title, description, tags, link
3. Regular card shows gradient swatch top + title/year/tags bottom
4. Hovering any card shows scale + shadow
5. Clicking a card transitions to the detail view (overview fades, ProjectCard appears)
6. "← Back" button appears top-left in detail view — clicking it returns to the overview
7. "×" button top-right closes the modal entirely
8. Pressing Escape in detail view goes back to overview; pressing Escape in overview closes the modal

- [ ] **Step 4: Commit**

```bash
git add src/components/PortfolioModal.tsx
git commit -m "feat: rewrite PortfolioModal with bento grid overview and two-state view"
```
