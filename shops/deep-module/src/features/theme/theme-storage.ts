const THEME_KEY = "theme";

export type ThemeMode = "auto" | "light" | "dark";

export function readTheme(): ThemeMode {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark" || raw === "auto") return raw;
    return "auto";
  } catch {
    return "auto";
  }
}

export function writeTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {
    // ignore
  }
}