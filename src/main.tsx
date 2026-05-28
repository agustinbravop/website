import React from "react";
import ReactDOM from "react-dom/client";
import Lenis from "lenis";
import App from "./App.tsx";
import "./index.css";

const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => 1 - Math.pow(2, -10 * t),
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
