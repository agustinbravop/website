import { renderToString } from "react-dom/server";
import App from "../src/App.tsx";
import { profile, links, stack, educations } from "../src/data.tsx";

const template = await Bun.file("./dist/index.html").text();
const appHtml = renderToString(<App />);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.bio.slice(1).join(" "),
  url: profile.siteUrl,
  image: `${profile.siteUrl}/profile.jpg`,
  email: links.find((l) => l.label === "Email")?.handle,
  sameAs: links.filter((l) => l.label !== "Email").map((l) => l.href),
  knowsAbout: stack.flat(),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: educations[0].institution,
  },
};

const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

const out = template
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace("</head>", `  ${jsonLdTag}\n  </head>`);

await Bun.write("./dist/index.html", out);
console.log("✓ pre-rendered dist/index.html");
