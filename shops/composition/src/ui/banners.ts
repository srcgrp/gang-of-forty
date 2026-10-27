import type { Banner, Home, Promo } from "../types";
import { createElement, createLink } from "./elements";
export function showBanner(banner: Banner, headingTag: "h1" | "h2"): void {
  const banners = document.querySelector<HTMLElement>("#banners");
  if (!banners) {
    throw new Error("Required page elements were not found");
  }

  const section = createElement("section", "hero", "");
  section.appendChild(createElement(headingTag, "", banner.title));
  section.appendChild(createElement("p", "", banner.text));
  const emoji = createElement("span", "banner-emoji", banner.emoji);
  emoji.setAttribute("aria-hidden", "true");
  section.appendChild(emoji);
  section.appendChild(
    createLink(banner.cta.label, banner.cta.href, "primary-link"),
  );
  banners.appendChild(section);
}

export function showBanners(home: Home): void {
  const promos = document.querySelector<HTMLElement>("#promos");
  if (!promos) {
    throw new Error("Required page elements were not found");
  }

  showBanner(home.hero, "h1");
  showBanner(home.side, "h2");
  home.promos.forEach(function (promo: Promo): void {
    const link = createLink("", promo.href, "promo");
    link.style.backgroundColor = promo.color;
    const emoji = createElement("span", "promo-emoji", promo.emoji);
    emoji.setAttribute("aria-hidden", "true");
    link.appendChild(emoji);
    link.appendChild(createElement("span", "", promo.text));
    promos.appendChild(link);
  });
}
