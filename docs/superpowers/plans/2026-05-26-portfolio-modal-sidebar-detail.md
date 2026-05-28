# Portfolio Modal (Sidebar + Detail) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current portfolio gallery modal with a normal two-pane modal: a left sidebar project list and a right single-page project detail view (header, tags, media, text).

**Architecture:** Keep `PortfolioModal.tsx` as the orchestrator (open/close, keyboard, selection). Rework `ProjectCard.tsx` into the right-pane detail renderer (no swipe/drag). Extend `portfolioData.ts` to support `media` (image or video).

**Tech Stack:** React 19, TypeScript, Framer Motion, Tailwind CSS v4, Vite, bun

---

## File Map (What Changes Where)

- Modify: `src/data/portfolioData.ts`
  - Add `media` support to `Project`.
  - Provide at least one image and one video example.

- Modify: `src/components/ProjectCard.tsx`
  - Replace the draggable/tilt card with a scrollable single-page project detail.
  - Render image or video based on `project.media`.

- Modify: `src/components/PortfolioModal.tsx`
  - Replace the current “Gallery” navigation with a two-pane frame:
    - left sidebar list (title/year + 2–3 tags)
    - right detail pane (ProjectCard)
  - Keyboard: `Escape` closes; `ArrowUp/ArrowDown` changes selection; keep `ArrowLeft/ArrowRight` as optional next/prev.
  - Add focus-on-open and prevent background scroll while open.

---

### Task 0: Baseline Sanity Check (Before Changes)

**Files:** none

- [ ] **Run build to confirm current state**

Run: `bun run build`

Expected: exit code 0.

- [ ] **Run lint to confirm current state**

Run: `bun run lint`

Expected: exit code 0.

Notes:
- This repo does not include a unit/integration test runner currently. For this feature, we treat `bun run build` (typecheck + build) and `bun run lint` as the primary automated checks, plus manual UI verification in dev.

---

### Task 1: Add Project Media Support

**Files:**
- Modify: `src/data/portfolioData.ts`

- [ ] **Update the Project type with a media union**

Edit `src/data/portfolioData.ts` to:

```ts
export type ProjectMedia =
  | {
      type: "image"
      src: string
      alt: string
    }
  | {
      type: "video"
      src: string
      poster?: string
    }

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
  media?: ProjectMedia
}
```

- [ ] **Add example media to the existing projects**

Update the existing `projects` entries to include at least one image and one video. Example:

```ts
media: {
  type: "image",
  src: "https://picsum.photos/seed/mobile-app/1200/700",
  alt: "Mobile App preview",
},
```

and:

```ts
media: {
  type: "video",
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  poster: "https://picsum.photos/seed/chrome-extension/1200/700",
},
```

- [ ] **Verify build still passes**

Run: `bun run build`

Expected: exit code 0.

- [ ] **Commit**

```bash
git add src/data/portfolioData.ts
git commit -m "feat: add portfolio project media model"
```

---

### Task 2: Rework ProjectCard into a Single-Page Detail View

**Files:**
- Modify: `src/components/ProjectCard.tsx`

This file currently implements the draggable/tilt/swipe “gallery card”. Replace it with a right-pane detail component that:

- shows header (title + year + role)
- shows tag chips (full tag list)
- renders media (image or video)
- shows description + highlights
- has a close button (kept)

- [ ] **Replace component API (remove swipe/drag)**

New props:

```ts
interface Props {
  project: Project
  onClose: () => void
}
```

- [ ] **Implement media rendering**

Use the `ProjectMedia` union:

```tsx
{project.media?.type === "video" ? (
  <video
    className="w-full h-full object-cover"
    src={project.media.src}
    poster={project.media.poster}
    muted
    controls
    playsInline
  />
) : project.media?.type === "image" ? (
  <img
    className="w-full h-full object-cover"
    src={project.media.src}
    alt={project.media.alt}
    loading="lazy"
  />
) : (
  <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
)}
```

- [ ] **Add subtle, consistent motion (reduced-motion aware)**

Use Framer Motion’s `useReducedMotion()` and simple opacity/translate variants on mount and when `project` changes.

- [ ] **Verify build and lint**

Run: `bun run build`

Expected: exit code 0.

Run: `bun run lint`

Expected: exit code 0.

- [ ] **Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: redesign project detail view for portfolio modal"
```

---

### Task 3: Rewrite PortfolioModal as Two-Pane Sidebar + Detail

**Files:**
- Modify: `src/components/PortfolioModal.tsx`

- [ ] **Replace the current layout with a two-pane frame**

Target structure:

```tsx
<motion.div className="fixed inset-0 ..." onClick={close}>
  <motion.div className="w-[92vw] h-[88vh] max-w-6xl ..." onClick={stop}>
    <aside className="...">...project list...</aside>
    <section className="...">...<ProjectCard />...</section>
  </motion.div>
</motion.div>
```

Use responsive layout:

- `flex-col sm:flex-row`
- Sidebar: `sm:w-80` and fixed; on small screens it becomes a top strip.

- [ ] **Implement sidebar rows (title/year + 2–3 tags)**

Row content:

- title (primary)
- year (secondary)
- tags: `project.tags.slice(0, 3)`

Active indicator:

- left bar or dot using teal (`bg-teal-500/80`) and a subtle shadow.

Hover microinteraction:

- slight translate (`-translate-y-px`)
- brighter border
- optional shimmer overlay using existing `@keyframes shimmer`.

- [ ] **Keyboard navigation**

When open:

- `Escape`: close
- `ArrowUp`: `setSelectedIndex((i) => (i - 1 + projects.length) % projects.length)`
- `ArrowDown`: `setSelectedIndex((i) => (i + 1) % projects.length)`
- Keep optional `ArrowLeft/ArrowRight` as previous/next for parity.

Make sure key handlers call `e.preventDefault()` for arrows to avoid scrolling.

- [ ] **Focus on open and prevent background scroll**

On open:

- focus a `div` with `tabIndex={-1}`
- set `document.body.style.overflow = "hidden"`; restore on close/unmount

- [ ] **Wire detail transitions**

Use `AnimatePresence` keyed by `selectedIndex` to animate the right pane swap. Keep it subtle (opacity + y).

- [ ] **Verify manually in dev**

Run: `bun run dev`

Manual checks:

- Click "See portfolio" opens modal.
- Sidebar shows rows with title/year and 2–3 tags.
- Clicking a row updates detail pane.
- Arrow up/down changes selection.
- Escape and backdrop click close.
- Video renders with controls, image renders with correct alt.

- [ ] **Verify build and lint**

Run: `bun run build`

Expected: exit code 0.

Run: `bun run lint`

Expected: exit code 0.

- [ ] **Commit**

```bash
git add src/components/PortfolioModal.tsx
git commit -m "feat: redesign portfolio modal with sidebar and detail"
```

---

### Task 4: Cleanup + Final Verification

**Files:**
- Modify: any file that has unused imports/props after the rewrite

- [ ] **Remove unused props/imports created by the rewrite**

Examples:

- `navigate` helpers that were only for swipe.
- `direction` state if no longer used.
- `onSwipe` prop in `ProjectCard` (should be removed).

- [ ] **Final checks**

Run: `bun run build`

Expected: exit code 0.

Run: `bun run lint`

Expected: exit code 0.

- [ ] **Commit**

```bash
git add src/components/ProjectCard.tsx src/components/PortfolioModal.tsx src/data/portfolioData.ts
git commit -m "chore: polish portfolio modal sidebar/detail"
```
