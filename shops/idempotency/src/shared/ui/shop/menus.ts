import type { Shop, LinkItem } from "../../types";

function renderShopMenu(
  container: Element | null,
  menuItems: LinkItem[],
): void {
  if (!container) {
    throw new Error("Required shop menu container is missing from the DOM.");
  }

  const categoryHrefs = new Set([
    "#fruits",
    "#dairy",
    "#bakery",
    "#pantry",
    "#drinks",
    "#protein",
    "#snacks",
  ]);

  const mainMenuItems = menuItems.filter(
    (item) => !categoryHrefs.has(item.href),
  );

  const links = mainMenuItems.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    return link;
  });

  const customLinks = [
    { label: "درباره ما", href: "#about" },
  ];

  for (const item of customLinks) {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    links.push(link);
  }

  container.replaceChildren(...links);
}

export function renderShopMenus(shop: Shop): void {
  const desktopMenu = document.querySelector("#shop-desktop-menu");
  const mobileMenu = document.querySelector("#shop-mobile-menu");

  renderShopMenu(desktopMenu, shop.menu);
  renderShopMenu(mobileMenu, shop.menu);
}