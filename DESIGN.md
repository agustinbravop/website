# DESIGN.md

## Narrative

**"Interface to infrastructure. I own the whole thing."**

The visitor's journey: arrive at a calm, confident identity statement (hero + name) → read the philosophy (About headline) → explore the evidence on demand (accordion sections) → leave with a clear picture of a builder who owns the whole stack.

## Visual Direction

Inspired by: inakivalencia.com, julianozen.com, kentbeck.com, lovefrom.com.

- **Aesthetic**: Minimalist white. Radical whitespace. Text carries all the weight.
- **Tone**: Quiet confidence. The restraint is the statement — it differentiates from the dark/glowing AI-portfolio default.
- **Whitespace**: Generous. Pages breathe. White space is not empty space; it's the design.

## Color System (OKLCH)

All colors are defined as CSS variables in `index.css`.

| Variable       | Value                   | Role                                               |
| -------------- | ----------------------- | -------------------------------------------------- |
| `--bg`         | `oklch(98.5% 0.006 85)` | Warm near-white background                         |
| `--text`       | `oklch(17% 0.005 85)`   | Warm near-black, primary text                      |
| `--text-muted` | `oklch(45% 0.004 85)`   | Body text, descriptions                            |
| `--text-quiet` | `oklch(63% 0.003 85)`   | Metadata, dates, labels                            |
| `--border`     | `oklch(91% 0.005 85)`   | Section separators                                 |
| `--accent`     | `oklch(60% 0.14 65)`    | Interactive elements only (links, open indicators) |

The accent alternate (forest green `oklch(40% 0.10 145)`) is commented in the CSS.

## Typography

Single family: **Geist** (sans-serif). Weight ceiling: `font-medium`. Never bold headings.

| Element                     | Size                                | Weight       | Color                     |
| --------------------------- | ----------------------------------- | ------------ | ------------------------- |
| Hero name                   | `clamp(1.75rem, 4vw, 2.5rem)`       | medium       | `--text`                  |
| About headline              | `clamp(1.25rem, 3vw, 1.625rem)`     | medium       | `--text` / `--text-quiet` |
| Body text                   | `0.9rem`                            | normal       | `--text-muted`            |
| Entry titles (job, project) | `0.875rem`                          | medium       | `--text`                  |
| Metadata (dates, tags)      | `0.75rem`                           | normal, mono | `--text-quiet`            |
| Section accordion labels    | `0.75rem` uppercase tracking-widest | normal       | `--text-quiet`            |

## Layout

Single content column, `max-w-[640px]`, left-aligned, `px-6`. No navbar.

**Section order:**

1. Hero (always visible)
2. About (always open, no toggle)
3. Experience (collapsed accordion)
4. Projects (collapsed accordion, with inner project rows)
5. Stack (collapsed accordion)
6. Footer

## Interaction

- **Accordion only**: sections expand/collapse with a `height` + `opacity` transition (framer-motion AnimatePresence).
- **No scroll animations, no load animations, no hover effects beyond color transitions.**
- **Open indicator**: `+` collapses to `−`, both use `--accent` color when open.

## Removed from Previous Version

- **Dark background + amber glow**: Replaced by white + OKLCH color system.
- **Terminal typewriter hero**: Replaced by static name + tagline.
- **AmbientGlow, MorphingGeometry**: Deleted.
- **NavBar with scroll progress**: Deleted — no nav.
- **SplitText, CountUp**: Deleted — no load/scroll animations.
- **TagChip, skillIcons**: Deleted — tags are plain text, skills are plain lists.
- **Framer Motion whileInView reveals**: Removed — accordion transitions only.
