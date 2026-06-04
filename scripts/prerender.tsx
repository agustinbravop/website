import { renderToString } from "react-dom/server";
import App from "../src/App.tsx";

const template = await Bun.file("./dist/index.html").text();
const appHtml = renderToString(<App />);
const out = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);
await Bun.write("./dist/index.html", out);
console.log("✓ pre-rendered dist/index.html");
