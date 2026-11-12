import { useEffect } from "react";

const PALETTES = ["fresh", "lime", "ocean", "violet", "rose", "amber"] as const;

export function PaletteSwitcher() {
  useEffect(() => {
    const html = document.documentElement;
    let timer: number | undefined;

    const switchPalette = (name: string) => {
      html.classList.add("theme-switching");
      html.dataset.palette = name;
      if (timer !== undefined) clearTimeout(timer);
      timer = window.setTimeout(() => {
        html.classList.remove("theme-switching");
      }, 450);
    };

    let i = Math.floor(Math.random() * PALETTES.length);

    const first = PALETTES[i];
    if (first) switchPalette(first);

    i = (i + 1) % PALETTES.length;
    const second = PALETTES[i];
    if (second) switchPalette(second);

    return () => {
      if (timer !== undefined) clearTimeout(timer);
      html.classList.remove("theme-switching");
    };
  }, []);

  return null;
}
