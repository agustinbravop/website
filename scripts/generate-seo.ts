import type { ReactNode } from "react";
import {
  profile,
  links,
  stack,
  experiences,
  educations,
  projects,
} from "../src/data.tsx";

const publicDir = `${import.meta.dir}/../public`;

// Flatten any ReactNode (rich JSX descriptions/bullets) to plain text for SEO.
function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && "props" in node) {
    return toText(
      (node as { props?: { children?: ReactNode } }).props?.children,
    );
  }
  return "";
}

function buildLlmsTxt() {
  const experienceSection = experiences
    .map((e) =>
      [
        `### ${e.title} at ${e.company} (${e.date})`,
        ...e.bullets.map((b) => `- ${toText(b)}`),
      ].join("\n"),
    )
    .join("\n\n");

  const educationSection = educations
    .map(
      (e) =>
        `- ${e.title}, ${e.institution} (${e.date})${e.note ? " — " + e.note : ""}`,
    )
    .join("\n");

  const projectsSection = projects
    .map((p) =>
      [
        `### ${p.title} (${p.year}) — ${p.tags.join(", ")}`,
        toText(p.description),
        p.link ? `${p.linkLabel}: ${p.link}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  const linksSection = links.map((l) => `- ${l.label}: ${l.href}`).join("\n");
  const stackSection = stack.flat().join(", ");

  return `# ${profile.name}
> ${profile.title}

${profile.bio.join(" ")}

## Experience
${experienceSection}

## Education
${educationSection}

## Projects
${projectsSection}

## Stack
${stackSection}

## Links
${linksSection}
`;
}

function buildSitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${profile.siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

await Bun.write(`${publicDir}/llms.txt`, buildLlmsTxt());
console.log("✓ generated public/llms.txt");

await Bun.write(`${publicDir}/sitemap.xml`, buildSitemapXml());
console.log("✓ generated public/sitemap.xml");
