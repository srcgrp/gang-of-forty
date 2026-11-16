import { useState, useEffect } from "react";

type ThemeMode = "light" | "dark";

function readTheme(): ThemeMode {
  try {
    const raw = localStorage.getItem("theme");
    if (raw === "light" || raw === "dark") return raw;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(readTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark-theme", "light-theme");
    html.classList.add(`${mode}-theme`);
    try {
      localStorage.setItem("theme", mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return { mode, toggle };
}
