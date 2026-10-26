import {
  readTheme,
  writeTheme,
  type ThemeMode,
} from "../storage/theme-storage";

const BTN = "#theme-btn";
const ICON = ".theme-btn__icon";

const SVG_SUN = `<svg class="svg_theme" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;

const SVG_MOON = `<svg class="svg_theme" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

function svgElement(svgString: string): Element {
  const doc = new DOMParser().parseFromString(
    svgString.trim(),
    "image/svg+xml",
  );
  return doc.documentElement;
}

function applyTheme(mode: ThemeMode): void {
  const html = document.documentElement;
  const icon = document.querySelector(ICON);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  html.classList.remove("dark-theme", "light-theme");

  let isDark: boolean;
  if (mode === "dark") isDark = true;
  else if (mode === "light") isDark = false;
  else isDark = prefersDark;

  html.classList.add(isDark ? "dark-theme" : "light-theme");

  const svg = isDark ? SVG_SUN : SVG_MOON;
  if (icon) icon.replaceChildren(svgElement(svg));
  writeTheme(mode);
}

export function initTheme(): void {
  applyTheme(readTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (readTheme() === "auto") applyTheme("auto");
    });

  document.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest(BTN);
    if (!btn) return;

    const isDark = document.documentElement.classList.contains("dark-theme");
    applyTheme(isDark ? "light" : "dark");
  });
}
