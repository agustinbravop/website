# ADR 0001: Remove Three.js background and draggable panel layout

**Status:** Accepted  
**Date:** 2026-05-28

## Context

The original site used a two-layer architecture: a full-screen Three.js fluid mesh shader (`Scene` + `FluidMesh`) behind a set of Framer Motion draggable panels (`Panel`). This was the defining interaction model — panels floated above a generative background and could be repositioned freely.

## Decision

Remove both layers entirely and replace with a full-page vertical scroll layout.

- `Scene`, `FluidMesh`, and `ArkanoidGame` are deleted.
- `Panel` and `MobileAccordion` are deleted.
- Content sections become full-viewport scroll sections with Framer Motion `whileInView` reveals.
- The hero section replaces the fluid mesh as the signature visual moment, using a terminal typewriter animation.

## Reasons

1. **Narrative coherence**: The draggable panels were visually interesting but narratively inert — users could move things around but there was no story being told. The scroll layout lets sections build on each other as an argument.
2. **Two showpieces compete**: The fluid mesh and any hero animation would fight for attention. One signature moment (terminal hero) lands harder than two.
3. **Recruiter usability**: Draggable panels have no obvious affordance for someone who wants to jump straight to "Experience." A sticky nav + scroll is immediately legible.
4. **Scope**: Three.js adds ~250KB to the bundle and significant complexity for a visual effect that doesn't serve the narrative.

## Alternatives considered

- **Keep mesh as hero-only background**: Adds complexity without proportional payoff; the terminal hero is sufficient.
- **Keep panels, restyle them**: The interaction model itself is the problem, not the styling.

## Consequences

- Bundle size drops significantly (Three.js removed).
- The site loses the "floating panels" differentiator, replaced by the terminal hero + scroll reveal experience.
- Mobile experience improves substantially (no panel positioning logic, no 3D rendering).
