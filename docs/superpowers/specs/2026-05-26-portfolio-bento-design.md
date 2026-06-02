# Portfolio Bento Modal — Design Spec

## Overview

Replace the current sidebar+detail `PortfolioModal` with a unified bento grid overview that gives featured projects visual dominance through cell size alone, then transitions into a full-panel detail view on click.

## Layout

The modal keeps its current dimensions (~92vw × 88vh) and glass background (`bg-[#1C1C1C]/95 border border-white/10 rounded-2xl`). The sidebar is removed. Inside:

- **Header bar**: "Portfolio" label (left) + × close button (right), `border-b border-white/10`
- **Content area**: vertically scrollable, contains the bento grid

### Bento Grid

4-column CSS grid (`grid-cols-4 gap-3 p-4`). CSS auto-placement handles flow — no manual positioning.

- `featured: true` → `col-span-2` (~220px tall)
- Regular project → `col-span-1` (~160px tall)

```
┌──────────────────────┬──────────┬──────────┐
│  FEATURED (2-wide)   │  normal  │  normal  │
│  gradient bg         │  grad.   │  grad.   │
│  media as bg         │  title   │  title   │
│  title + desc        │  year    │  year    │
│  tags + link         │  tags    │  tags    │
├──────────┬───────────┴──────────┴──────────┤
│  normal  │  FEATURED (2-wide)              │
│  ...     │  ...                            │
└──────────┴─────────────────────────────────┘
```

Featured cards naturally break visual rhythm and draw the eye. Regular projects are visible but not competing.

## Cards

### Featured card (`col-span-2`, ~220px tall)

- Background: project `gradient` field as `bg-gradient-to-br`
- If project has `media.type === "image"`: render as `object-cover` background image with `opacity-40` on top of the gradient
- Dark scrim overlay: `bg-gradient-to-t from-black/80 via-black/20 to-transparent`
- Content anchored to bottom: title (xl, bold), one-line description (truncated, text-sm text-gray-300), tags row, optional external link icon
- Hover: `scale-[1.02]` + `shadow-xl` transition

### Regular card (`col-span-1`, ~160px tall)

- Top ~55%: gradient color block (`bg-gradient-to-br ${project.gradient}`)
- Bottom ~45%: dark section (`bg-[#1C1C1C]`) with title, year (text-gray-400), 2–3 tag chips
- Hover: `scale-[1.02]` + `shadow-xl` transition

### Both

- `rounded-xl border border-white/10 overflow-hidden cursor-pointer`
- `transition-all duration-200`

## Detail View

Two-state view managed by `view: 'overview' | 'detail'` and `selectedProject: Project | null` in `PortfolioModal` state.

### Transition: overview → detail

1. Bento grid animates out: `opacity: 0, scale: 0.97` (150ms)
2. Existing `ProjectCard` animates in: `opacity: 1, scale: 1` from `opacity: 0, scale: 0.97` (200ms)

### Detail chrome

- **← Back** button top-left: returns to overview (reverse animation)
- **×** button top-right: closes modal entirely
- `Escape` key: back to overview if in detail, close modal if at overview

`ProjectCard` is reused as-is — no changes to its internals.

## Data Model

One field added to `Project` in `portfolioData.ts`:

```ts
featured?: boolean  // col-span-2 with media-as-background treatment
```

All other fields (`title`, `initials`, `year`, `description`, `highlights`, `tags`, `gradient`, `link`, `linkLabel`, `media`) are unchanged.

## Components Changed

| File                 | Change                                                             |
| -------------------- | ------------------------------------------------------------------ |
| `portfolioData.ts`   | Add `featured?: boolean` to `Project` type; mark featured projects |
| `PortfolioModal.tsx` | Rewrite: remove sidebar, add bento grid, add two-state view logic  |
| `ProjectCard.tsx`    | No changes — reused as the detail panel                            |
| `TagChip.tsx`        | No changes                                                         |

A new `BentoCard.tsx` component handles the individual card rendering (featured and regular variants) to keep `PortfolioModal` clean.

## Keyboard Navigation

| Key               | Behavior                             |
| ----------------- | ------------------------------------ |
| `Escape`          | Back to overview, or close modal     |
| `Enter` / `Space` | Open focused card's detail view      |
| Arrow keys        | Focus next/previous card in the grid |

## Out of Scope

- Filtering or sorting projects by tag
- Drag-to-reorder
- Animations triggered by scroll position
