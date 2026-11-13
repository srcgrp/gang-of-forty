import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../style.css";

const PALETTES = ["fresh", "lime", "ocean", "violet", "rose", "amber"] as const;

const html = document.documentElement;
const chosen = PALETTES[Math.floor(Math.random() * PALETTES.length)];
if (chosen) html.dataset.palette = chosen;

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}