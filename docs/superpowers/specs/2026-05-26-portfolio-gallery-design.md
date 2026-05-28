# Portfolio Gallery Modal — Design Spec

## Overview

Replace the existing basic `PortfolioModal` with **The Gallery** — a full-screen immersive modal featuring draggable project cards with 3D tilt, parallax transitions, and a minimal sidebar navigator. Integrates into the existing dark/glass/fluid aesthetic.

## Architecture

### Modal Layout

```
┌─────────────────────────────────────────────────┐
│ [sidebar]  │  [main card area - fills rest]      │
│             │                                     │
│  ┌───────┐  │  ┌─────────────────────────────┐   │
│  │ ○  MA  │  │  │  PROJECT HERO               │   │
│  │ ○  CE  │  │  │  (full-width gradient bar,  │   │
│  │        │  │  │   200px height)             │   │
│  └───────┘  │  │                             │   │
│             │  ├─────────────────────────────┤   │
│             │  │  Glass detail panel          │   │
│             │  │  (bottom portion of card)    │   │
│             │  │  - title, year, role         │   │
│             │  │  - description               │   │
│             │  │  - highlights (bullets)      │   │
│             │  │  - tags, link button         │   │
│             │  └─────────────────────────────┘   │
│             │                                     │
└─────────────────────────────────────────────────┘
```

- **No visible modal frame** — cards float on the fluid mesh background with a subtle `bg-black/60 backdrop-blur-md` glass backdrop
- **Sidebar**: ~60px thin vertical strip on the left edge. Each project = a dot (8px) + two-letter initials. Active dot glows (teal + larger).
- **Main card**: Large (~80% of modal width). Glass styling (`bg-[#1C1C1C]/80 backdrop-blur-sm border border-white/10`). Soft shadow.
- **Bottom glass panel**: Overlaid on the card's lower third — frosted glass with project metadata. Sticks to card bottom edge.
- **Close button**: × icon top-right corner of the card. Also click backdrop to close.

### Components

1. **`PortfolioModal.tsx`** — rewritten. Manages layout, sidebar, card container, swipe logic, keyboard nav.
2. **`ProjectCard.tsx`** (new) — individual project card with 3D tilt, drag handling, hero gradient, glass detail panel.
3. **`portfolioData.ts`** (new) — extracted project data with the enriched shape.

No new dependencies. Framer Motion handles all animation.

## Data Model

```typescript
interface Project {
  title: string
  initials: string          // "MA", "CE" — shown in sidebar
  year: string
  role: string              // "Lead Engineer", "Solo Developer"
  description: string
  highlights: string[]      // bullet points
  tags: string[]
  gradient: string          // e.g. "from-teal-900 via-cyan-900 to-blue-900"
  link?: string
  linkLabel?: string        // "View on GitHub", "Try it live"
}
```

Existing 2 placeholder projects updated with realistic data and distinct gradients.

## Interactions

### Modal open/close
- Opens scaling up from the button's position with a blur-fade background.
- Content staggers: card slides in first, then glass panel fades up, then text fades in.
- Close reverses: text fades out, glass fades, card shrinks toward button, backdrop fades.

### Project navigation (3 methods)
1. **Sidebar dots** — click to jump. Active dot pulses.
2. **Horizontal drag** — drag the card left/right. Spring physics with momentum, velocity detection, rubber-band at edges. Settles with damping.
3. **Arrow keys** — left/right keyboard arrows.

### On-switch transition
- Current card slides out (horizontal offset + slight opacity fade)
- Next card slides in from the opposite direction
- Subtle parallax: gradient background scrolls at 0.8x speed of content
- Glass panel pulse on settle (`scale: 1.02` for 300ms)

### 3D tilt (desktop only)
- `perspective: 1000px` on card container
- `rotateX`/`rotateY` computed from mouse position relative to card center
- Max ±3° — subtle, feels alive
- Smooths out on drag (tilt disabled during active drag)

### Close
- × button in top-right of card
- Click backdrop (outside card area)
- Escape key

## Visual Styling

Maintains existing design language:
- Background: `bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10`
- Text: `text-white`, `text-gray-200`, `text-gray-400` hierarchy
- Accent: `teal-500` for active states, highlights
- Font: `font-sans` (Merriweather serif — as configured)
- Sidebar dots: `bg-gray-600` → `bg-teal-500` when active, `w-2 h-2` → `w-3 h-3`

## Implementation Order

1. Create `portfolioData.ts` with enriched Project type and data
2. Create `ProjectCard.tsx` with 3D tilt, swipe, glass panel
3. Rewrite `PortfolioModal.tsx` with new layout and sidebar
4. Uncomment "See portfolio" button in `ButtonsContent.tsx`
5. Delete old `PortfolioModal.tsx` references (it's being rewritten)
