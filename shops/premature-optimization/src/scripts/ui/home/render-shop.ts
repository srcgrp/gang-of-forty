import type { Shop } from "../../types";
import { makeElement, appendLink } from "../shared/make-element";
export function renderShop(shop: Shop): void {
  const setText = (selector: string, value: string | null | undefined) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (el && value != null) {
      el.textContent = value;
      el.classList.remove("skeleton-text");
    }
  };
  setText("#shop-notice", shop.notice);
  setText("#shop-name", "سوپرینو");
  setText("#footer-shop-name", "سوپرینو");
  setText("#shop-slogan", shop.slogan);
  setText("#shop-about", shop.about);
  setText("#shop-address", shop.address);
  setText("#shop-phone", shop.phone);
  setText("#shop-copyright", shop.copyright || "© سوپرینو");
  const menu = document.querySelector<HTMLDivElement>("#shop-menu-links"),
    hours = document.querySelector<HTMLDivElement>("#shop-hours");
  if (!menu || !hours) return;
  menu.replaceChildren();
  shop.menu.forEach((item) =>
    appendLink(menu, item.label, item.href, "menu-texts"),
  );
  hours.replaceChildren();
  shop.schedule.forEach((item) =>
    hours.append(makeElement("p", "", `${item.days}: ${item.time}`)),
  );
}
