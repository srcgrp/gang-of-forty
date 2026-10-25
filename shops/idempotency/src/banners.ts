
import type { Hero, Promo } from "./types";

export function renderSideBanner(side: Hero) {
  const container = document.querySelector("#home-side");

  if (!container) {
     throw new Error("Side banner container is missing from the DOM.");
  }

  const banner = document.createElement("article");
  banner.className = "home-side-banner";

  const title = document.createElement("h2");
  title.textContent = side.title;

  const text = document.createElement("p");
  text.textContent = side.text;

  const percent = document.createElement("span");
  percent.className = "banner-percent";
  percent.textContent = "٪";
  percent.setAttribute("aria-hidden", "true");

  const link = document.createElement("a");
  link.className = "home-banner-link";
  link.href = side.cta.href;
  link.textContent = side.cta.label;

  banner.append(title, text, link, percent);
  container.replaceChildren(banner);
}

export function renderPromoBanners(promos: Promo[]) {
  const container = document.querySelector("#home-promos");

  if (!container) {
      throw new Error("Promo banners container is missing from the DOM.");
  }

  const cards = promos.map((promo) => {
    const link = document.createElement("a");
    link.className = "home-promo-card";
    link.href = promo.href;

    const text = document.createElement("span");
    text.textContent = promo.text;

    link.append(text);
    return link;
  });

  container.replaceChildren(...cards);
}
