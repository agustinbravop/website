# Portfolio Modal (Sidebar + Detail) — Design Spec

## Summary

Redesign the existing `PortfolioModal` into a **normal, usable two-pane layout**:

- **Left pane:** a scrollable sidebar list of projects.
- **Right pane:** a **single-page** detail view for the selected project (header, tags, media, text).

The look and feel must remain consistent with the existing resume site: dark, glassy surfaces over the fluid background, Merriweather typography, and teal as the primary accent.

## Goals

- Make portfolio browsing feel obvious: pick from a list, read the selected project.
- Keep the modal feeling premium: crisp glass panels, subtle glow, tight spacing.
- Add microinteractions (hover, active, transitions) without making it noisy.
- Support projects that have **either** an image or a video.

## Non-goals

- No search, filtering, or tag chips as controls (sidebar is a straight scroll list).
- No multi-tab detail view (detail is a single scrollable page).
- No major changes to the overall app layout outside the modal and project data shape.

## Information Architecture

### Modal

- Opening: via the existing "See portfolio" button.
- Closing:
  - click backdrop
  - Escape
  - top-right (or sidebar header) close button
- Focus:
  - the modal container should be focusable for keyboard navigation

### Left Pane: Sidebar Index

Each row shows:

- `title` (primary)
- `year` (secondary)
- 2–3 tags (tiny strip for quick scanning)

Sidebar header shows:

- small label: "Portfolio"
- close button

Interactions:

- Hover row:
  - slight lift (1px)
  - border becomes brighter
  - faint teal sheen sweep across the row
- Active row:
  - persistent teal "charge" indicator (dot or slim bar)
  - slightly stronger glow
  - tags brighten a bit relative to inactive rows

Keyboard navigation:

- `ArrowUp` / `ArrowDown`: move selection in the list.
- `ArrowLeft` / `ArrowRight`: optionally keep existing next/prev navigation semantics.
- `Escape`: close.

### Right Pane: Single-Page Project Detail

Order:

1. Header: `title`, `year`, `role` (role as teal accent line)
2. Tags: full tag list as chips (read-only)
3. Media: hero slot (image or video)
4. Body:
   - `description`
   - optional `highlights` list
   - optional `link` CTA

Detail area is vertically scrollable; it should not scroll the full page behind the modal.

## Motion & Microinteractions

### Modal open/close

- Backdrop fades in/out quickly.
- Modal frame scales in slightly and settles (no overshoot).

### Selection transitions

On changing selected project:

- Sidebar active indicator animates to the new row (or the row switches cleanly with a short transition).
- Detail content swaps with a subtle stagger:
  - header and tags in first
  - media in second (with a blur-to-sharp or opacity + slight translate)
  - body in last

### Media

- Image: slight zoom on hover (very subtle), preserve aspect, never pixelate.
- Video: muted by default, show controls, optional poster.

### Accessibility

- Respect reduced motion preferences (disable staggering and sheen sweeps; keep simple fades).
- Maintain strong focus outlines on interactive elements.

## Visual Design

- Use existing dark/glass language:
  - false blacks (`#1a1a1a`, `#1C1C1C`)
  - subtle borders (`white/10`)
  - backdrop blur
- Accent color: teal (consistent with existing button shimmer and project accents).
- Typography: preserve Merriweather (Tailwind `font-sans` is configured to Merriweather).

## Data Model Changes

Extend `Project` to support media:

- `media` union field or optional fields:
  - image URL (local asset or remote)
  - video URL (mp4/webm)
  - optional poster

Projects without media should still render with a graceful empty state (placeholder panel), but we should prefer populating media for every project.

## Implementation Outline (Files)

- `src/data/portfolioData.ts`
  - update `Project` type for media
  - update project entries with `media`

- `src/components/PortfolioModal.tsx`
  - rewrite layout into two panes
  - manage selected index
  - wire keyboard navigation and close behavior

- `src/components/ProjectCard.tsx`
  - either repurpose into the new right-pane detail component (may rename), or replace it.
  - remove swipe/drag interactions (not part of this design)

## Success Criteria

- Clicking "See portfolio" opens a 2-pane modal with sidebar + detail.
- Sidebar lists all projects with title/year/2–3 tags.
- Selecting a project updates the detail area with header, tags, media (image or video), and body.
- Modal closes via backdrop click, Escape, and close button.
- Microinteractions feel subtle and consistent with the rest of the site.
