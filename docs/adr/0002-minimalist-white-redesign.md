# ADR 0002: Minimalist white redesign

**Status:** Accepted  
**Date:** 2026-05-28

## Context

After the scroll layout (ADR 0001), the site evolved toward a dark (`#0a0a0a`) cyber-amber aesthetic with heavy motion: typewriter hero, ambient glow, morphing geometry, scroll-linked animations, SplitText reveals, CountUp numbers. This direction maximises visual drama but conflicts with the goal of standing out in the AI era, where most AI-generated portfolios default to the same dark/glowing/animated pattern.

## Decision

Full redesign toward a radical whitespace minimalist aesthetic.

- Background flips to white (`#fafafa`), black text.
- All background effects removed: `AmbientGlow`, `MorphingGeometry`, dot-grid, ambient glow.
- All scroll/load animations removed. Only accordion expand/collapse transitions remain.
- No navbar. Name anchors the top, footer holds contact links.
- Hero becomes static: small circle photo + name + tagline. No typewriter.
- `>` prompt prefixes removed from all copy.
- Sections become accordion rows (About always open; Experience, Projects, Stack collapsed by default).
- Stack section becomes a plain text skill list, no icons.
- Projects become accordion rows (title + year collapsed, details on expand).
- Contact becomes a plain footer only.
- Accent color (used only on interactive elements) to be decided between muted amber (`#d97706`) and forest green (`#3d6b4f`) — implemented as a CSS variable.
- Content column: ~680px max-width, left-aligned.
- Typeface: Geist, `font-normal` baseline, `font-medium` ceiling. No bold headings.

## Reasons

1. **Differentiation**: Dark/glowing portfolios are the AI default. White space is the counterintuitive choice that reads as deliberate craft.
2. **Signal density**: More whitespace forces every word to earn its place. The existing copy is strong enough to stand without visual decoration.
3. **Speed and simplicity**: Removing animations, glow layers, and the typewriter eliminates complexity with no content loss.
4. **Personal site energy**: References (Kent Beck, LoveFrom) treat the page as a person's artifact, not a product landing page. A photo + direct voice achieves that; motion and chrome work against it.

## Alternatives considered

- **Dark minimal**: Keep dark background, strip decorations. Rejected — white creates the strongest differentiation.
- **Keep typewriter, strip everything else**: The animation is the first thing visitors wait through. Removing it respects their time.
- **Keep navbar**: Dropped because the page is compact enough with accordion sections that there is nothing to navigate _to_.

## Consequences

- framer-motion usage drops by ~90%. Dependency can eventually be removed.
- Bundle size decreases (fewer animation components, no ambient/geometry layers).
- The terminal/hacker personality of the current site is replaced by editorial restraint.
- Photo becomes the primary humanising element — needs a good headshot.
