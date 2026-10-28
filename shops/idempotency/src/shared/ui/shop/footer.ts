import type { Shop } from "../../types";

export function renderShopHelp(shop: Shop): void {
  const container = document.querySelector("#footer-help");

  if (!container) {
    throw new Error("Footer help container is missing from the DOM.");
  }

  const links = shop.help.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    return link;
  });

  container.replaceChildren(...links);
}

export function renderShopCopyright(shop: Shop): void {
  const copyrightElement = document.querySelector("#shop-copyright");

  if (!copyrightElement) {
    throw new Error("Shop copyright element is missing from the DOM.");
  }

  copyrightElement.textContent = shop.copyright.replace(
    shop.name,
    "تازه‌خانه",
  );
}