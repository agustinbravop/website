# DESIGN.md

This document outlines the design, architecture, and core principles of the interactive portfolio website.

## High-Level Concept

The portfolio is designed as an immersive digital environment rather than a traditional webpage. It presents professional resume content as a series of movable panels floating above a dynamic, interactive background. The core experience is centered around the playful and sophisticated interaction between the user's actions and the fluid, generative visuals, creating a memorable impression of technical and design-oriented skill.

## Core Technologies

- **Frontend Framework:** React with TypeScript (via Vite)
- **3D Rendering:** Three.js, managed declaratively with `@react-three/fiber`.
- **Draggable UI:** Framer Motion for smooth, physics-based dragging of content panels.
- **State Management:** Valtio for performant, real-time state synchronization between the UI and the 3D scene.
- **Styling:** Tailwind CSS for a utility-first styling workflow.

## Architecture: A Decoupled Two-Layer System

The application is built on a two-layer architecture that separates the UI from the 3D background, allowing each to be optimized for its specific purpose.

### 1. UI Layer (React & Framer Motion)

- **Responsibility:** Renders all content, including the header and the individual resume panels (`About Me`, `Experience`, etc.).
- **Implementation:**
  - This is a standard React application that lives on a transparent background with a high `z-index`.
  - Each resume section is a `<DraggablePanel>` component built with `motion.div` from **Framer Motion**.
  - Dragging is handled by a "drag handle" on the header of each panel, leaving the body content free for text selection.
  - The entire layout is static; there is no canvas-wide panning or zooming.

### 2. 3D Background Layer (Three.js)

- **Responsibility:** Renders the full-screen, interactive `FluidMesh` visual that lives behind the UI layer.
- **Implementation:**
  - A single, full-screen `<Canvas>` component from `@react-three/fiber` is positioned with a low `z-index`.
  - It contains the `<FluidMesh>` component, which is a `planeGeometry` with a custom `shaderMaterial`.

## Design Philosophy

- **Aesthetic:** Minimalist, dark, and monochromatic. It uses "false blacks" (`#1a1a1a`) and "false whites" (off-white and gray text) to create a sophisticated, high-contrast theme that is easy on the eyes.
- **Typography:** The primary font is **Merriweather** (from Google Fonts), a serif font that provides a professional, established feel, contrasting with the high-tech visuals.
- **Interaction:** Interactions are designed to be exploratory and satisfying. The fluid response of the mesh and the smooth animations of the panels create a polished, "premium" user experience.
