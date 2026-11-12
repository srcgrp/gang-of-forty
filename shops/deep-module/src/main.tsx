import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../style.css";

const PALETTES = ["fresh", "lime", "ocean", "violet", "rose", "amber"] as const;

const html = document.documentElement;
let pi = Math.floor(Math.random() * PALETTES.length);
const first = PALETTES[pi];
if (first) html.dataset.palette = first;
pi = (pi + 1) % PALETTES.length;
const second = PALETTES[pi];
if (second) html.dataset.palette = second;

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
