import type { Shop } from "../../types";

export function renderShopContact(shop: Shop): void {
  const phoneElement = document.querySelector("#shop-phone");
  const addressElement = document.querySelector("#shop-address");

  const phoneLink = document.querySelector<HTMLAnchorElement>(
    '.footer-social-link[aria-label="تماس تلفنی"]',
  );

  if (!phoneElement || !addressElement || !phoneLink) {
    throw new Error(
      "Required shop contact elements are missing from the DOM.",
    );
  }

  phoneElement.textContent = shop.phone;
  addressElement.textContent = shop.address;

  const normalizedPhone = shop.phone.replace(/[^\d+]/g, "");
  phoneLink.href = `tel:${normalizedPhone}`;
}