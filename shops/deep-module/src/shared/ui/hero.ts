import type { Home } from "../types";
import { safeHref } from "./format";

export function renderHero(home: Home): void {
  if (home.hero) {
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle && typeof home.hero.title === "string") {
      heroTitle.replaceChildren();
      home.hero.title.slice(0, 200).split("،").forEach((line, i) => {
        if (i > 0) heroTitle.appendChild(document.createElement("br"));
        heroTitle.appendChild(document.createTextNode(line.trim()));
      });
    }
    const text = document.querySelector<HTMLElement>(".hero-card--primary .hero-card__text");
    if (text && typeof home.hero.text === "string") text.textContent = home.hero.text.slice(0, 300);
    const btn = document.querySelector<HTMLAnchorElement>(".hero-card--primary .hero-card__btn");
    if (btn && home.hero.cta) {
      btn.href = safeHref(home.hero.cta.href);
      const span = btn.querySelector<HTMLElement>("span:first-child");
      if (span && home.hero.cta.label) span.textContent = String(home.hero.cta.label).slice(0, 50);
    }
  }
  if (home.side) {
    const title = document.querySelector<HTMLElement>(".hero-card--secondary .hero-card__title");
    if (title && home.side.title) title.textContent = String(home.side.title).slice(0, 100);
    const text = document.querySelector<HTMLElement>(".hero-card--secondary .hero-card__text");
    if (text && home.side.text) text.textContent = String(home.side.text).slice(0, 200);
    const btn = document.querySelector<HTMLAnchorElement>(".hero-card--secondary .hero-card__btn");
    if (btn && home.side.cta) {
      btn.href = safeHref(home.side.cta.href);
      const span = btn.querySelector<HTMLElement>("span:first-child");
      if (span && home.side.cta.label) span.textContent = String(home.side.cta.label).slice(0, 50);
    }
  }
}