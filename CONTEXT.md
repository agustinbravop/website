# Context

## Glossary

**Minimalist aesthetic**
The design language of the site. White/light background (`#fafafa`), Geist typeface, no decorative elements, no background effects, generous whitespace. Inspired by inakivalencia.com, julianozen.com, kentbeck.com, lovefrom.com.

**Accent color**
A single color used only on interactive elements (accordion triggers, links, hover states). Two candidates: muted amber (`#d97706`) and forest green (`#3d6b4f`). Implemented as a CSS variable so both can be compared visually.

**Accordion section**
A content section that has a clickable header row. Clicking expands/collapses the content with a smooth height transition. About is always open. Experience, Projects, and Stack are collapsed by default.

**Hero**
The top block of the page. Contains a small circle photo, name, and tagline. Static — no typewriter, no animation, no `>` prefixes. Sits above the accordion sections.

**Content column**
The single layout column for all page content. Max-width ~680px, left-aligned, generous side padding. No navbar above it.

**Footer**
The page's contact surface. Plain text links: email, GitHub, LinkedIn. No contact form, no section header.
