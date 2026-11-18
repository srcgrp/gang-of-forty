import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ThemeFrame from "./components/ThemeFrame";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeFrame><App /></ThemeFrame>
    </StrictMode>,
  );
}
