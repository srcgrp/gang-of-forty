import type { Hero } from "../../types";

export function renderHero(hero: Hero): void {
  const title = document.querySelector("#hero-title");
  const text = document.querySelector("#hero-text");
  const cta =
    document.querySelector<HTMLAnchorElement>("#hero-cta");

  if (!title || !text || !cta) {
    throw new Error(
      "Required hero elements are missing from the DOM.",
    );
  }

  title.textContent = hero.title;
  text.textContent = hero.text;
  cta.textContent = hero.cta.label;
  cta.href = hero.cta.href;
}