
import type { Shop, LinkItem } from "./types";

export function renderShopHelp(shop: Shop) {
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

function renderShopMenu(
  container: Element | null,
  menuItems: LinkItem[]
) {
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

  const mainMenuItems = menuItems.filter((item) => {
    return !categoryHrefs.has(item.href);
  });

  const links = mainMenuItems.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    return link;
  });

  const customLinks = [
    { label: "درباره ما", href: "#about" },
  ];

  customLinks.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    links.push(link);
  });

  container.replaceChildren(...links);
}

export function renderShopMenus(shop: Shop) {
  const desktopMenu = document.querySelector("#shop-desktop-menu");
  const mobileMenu = document.querySelector("#shop-mobile-menu");

  renderShopMenu(desktopMenu, shop.menu);
  renderShopMenu(mobileMenu, shop.menu);
}
export function renderShopAbout(shop: Shop) {
  const aboutElement = document.querySelector("#shop-about");

  if (!aboutElement) {
    throw new Error("Shop about element is missing from the DOM.");
  }

  aboutElement.textContent = shop.about;
}

export function renderShopSchedule(shop: Shop) {
  const container = document.querySelector("#shop-schedule");

  if (!container) {
      throw new Error("Shop schedule container is missing from the DOM.");
  }

  const title = document.createElement("p");
  title.textContent = "ساعات کاری:";

  const scheduleItems = shop.schedule.map((item) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${item.days}: ${item.time}`;
    return paragraph;
  });

  container.replaceChildren(title, ...scheduleItems);
}

export function renderShopContact(shop: Shop) {
  const phoneElement = document.querySelector("#shop-phone");
  const addressElement = document.querySelector("#shop-address");
  const phoneLink = document.querySelector<HTMLAnchorElement>(
    '.footer-social-link[aria-label="تماس تلفنی"]'
  );

  if (!phoneElement || !addressElement || !phoneLink) {
      throw new Error("Required shop contact elements are missing from the DOM.");
  }

  phoneElement.textContent = shop.phone;
  addressElement.textContent = shop.address;

  const normalizedPhone = shop.phone.replace(/[^\d+]/g, "");
  phoneLink.href = `tel:${normalizedPhone}`;
}

export function renderShopCopyright(shop: Shop) {
  const copyrightElement = document.querySelector("#shop-copyright");

  if (!copyrightElement) {
      throw new Error("Shop copyright element is missing from the DOM.");
  }

  copyrightElement.textContent = shop.copyright.replace(
    shop.name,
    "تازه‌خانه"
  );
}

export function renderShopNotice(shop: Shop) {
  const noticeElement = document.querySelector("#shop-notice");

  if (!noticeElement) {
      throw new Error("Shop notice element is missing from the DOM.");

  }

  noticeElement.textContent = shop.notice;
}
