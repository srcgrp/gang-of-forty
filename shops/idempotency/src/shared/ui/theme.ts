
import type { Theme } from "../types";
export function setupTheme() {
  const lightButton =
    document.querySelector<HTMLButtonElement>("#theme-light-button");

  const darkButton =
    document.querySelector<HTMLButtonElement>("#theme-dark-button");

  function setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;

    lightButton?.setAttribute(
      "aria-pressed",
      String(theme === "light")
    );

    darkButton?.setAttribute(
      "aria-pressed",
      String(theme === "dark")
    );
  }

  lightButton?.addEventListener("click", () => {
    setTheme("light");
  });

  darkButton?.addEventListener("click", () => {
    setTheme("dark");
  });

  setTheme("light");
}
