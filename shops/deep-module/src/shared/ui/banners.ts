import type { Home } from "../types";
import { h } from "./dom";
import { safeHref } from "./format";

export function renderBanners(home: Home): void {
  const wrapper = document.getElementById("banners-wrapper");
  if (!wrapper) return;
  wrapper.replaceChildren();
  if (!home.promos) return;
  for (const promo of home.promos.slice(0, 10)) {
    const a = h("a", "banner");
    a.href = safeHref(promo.href);
    const icon = h("span", "banner__icon", promo.emoji ?? "");
    icon.setAttribute("aria-hidden", "true");
    const content = h("div", "banner__content");
    content.appendChild(h("strong", undefined, promo.text ?? ""));
    const arrow = h("span", "banner__arrow", "←");
    arrow.setAttribute("aria-hidden", "true");
    a.append(icon, content, arrow);
    wrapper.appendChild(a);
  }
}