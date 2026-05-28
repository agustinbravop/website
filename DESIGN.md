# DESIGN.md

This document outlines the design, architecture, and core principles of the portfolio website.

## Narrative

**"I build things that matter."**

The site's job is to complement the fast-shipping, high-output signal that already comes through LinkedIn and direct messages. Here, the emphasis is on craft, intentionality, and end-to-end ownership. Every section is evidence of deliberate, high-quality work — not just velocity.

The visitor's journey: arrive at a striking terminal hero → scroll through confident claims backed by real proof → leave remembering a builder who cares about the work.

## Visual Direction

Inspired by: Ramp, Bending Spoons, 011h, Lleverage.ai.

- **Aesthetic**: Sharp, dark, confident. Bold declarative typography. Amber accent used purposefully and often — not as a border hint, but as a statement.
- **Tone**: Premium tool energy. Warm (amber) but precise (Geist). Not corporate, not hacker — startup craftsman.
- **Whitespace**: Generous. Sections breathe. Content is never crowded.

## Design Tokens

| Token | Value | Notes |
|---|---|---|
| Background | `#0a0a0a` | Near-black, not pure black |
| Surface | `#111111` | Cards, nav |
| Border | `rgba(255,255,255,0.08)` | Subtle |
| Accent | `#F59E0B` | True gold — amber-500 |
| Accent dim | `rgba(245,158,11,0.15)` | Backgrounds, hover fills |
| Text primary | `#FAFAFA` | Off-white |
| Text muted | `#71717A` | zinc-500 |
| Font | Geist, sans-serif | Loaded from Google Fonts / Vercel CDN |

## Layout

Full-page vertical scroll. Each section is a distinct viewport-height block. Sticky top navigation with frosted glass treatment.

**Section order:**
1. Hero
2. About
3. Experience
4. Stack
5. Work (portfolio)
6. Contact / Footer

## Core Technologies

- **Frontend**: React with TypeScript (Vite)
- **Animations**: Framer Motion — scroll-triggered reveals, terminal typewriter hero
- **Styling**: Tailwind CSS v4
- **State**: Valtio (retained for PortfolioModal project detail view)

## Removed from Previous Version

- **Three.js / fluid mesh background**: Removed. The terminal hero is the signature moment; two competing showpieces diluted each other.
- **Draggable panels**: Removed. Replaced by scroll-based sections — more navigable for recruiters, more readable for content-heavy sections.
- **ArkanoidGame easter egg**: Removed for simplicity.
- **Merriweather font**: Replaced by Geist.

## Section Design Notes

### 1. Hero
Full-viewport. Terminal typewriter animation types identity progressively:
```
> Agustín Bravo
> Software Engineer.
> Full-stack. Startup-paced. I build things that matter.
```
Amber blinking cursor. No background image — pure dark with a very subtle dot grid texture. Single CTA button scrolls to About or links to CV.

### 2. About
One bold declarative claim as headline (large, Ramp-style). Short 3-line bio below. No walls of text.

### 3. Experience
Timeline layout. Metrics surface as typographic statements — not buried in bullets. Inspired by Ramp's data-as-design approach: `50+`, `days → minutes`, `100+` in large amber type.

### 4. Stack
Two-column split: **Product side** (React, TypeScript, Tailwind) and **Platform side** (Docker, Kubernetes, AWS, Go). Reinforces the full-stack-to-infrastructure narrative.

### 5. Work
Portfolio cards. Featured project gets a wide card. Secondary projects in a grid. Clicking opens the existing PortfolioModal detail view.

### 6. Contact / Footer
Minimal. Name, social links, email CTA. One line.

## Interaction Model

- **Scroll-triggered reveals**: Elements animate in as sections enter the viewport (fade + slight upward translate). Framer Motion `whileInView`.
- **Terminal typewriter**: Hero types character by character with a blinking cursor. Amber `#F59E0B`.
- **Hover states**: Amber glow on interactive elements, scale on cards.
- **Navigation**: Sticky top bar with section links. Frosted glass (`backdrop-blur`). Active section highlighted in amber.

## Mobile

Responsive. Single-column on mobile. Terminal hero still works (shorter lines). Navigation collapses to a hamburger or simplified link row.
