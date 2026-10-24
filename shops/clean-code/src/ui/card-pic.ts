import type { Offer, Product } from "../types/product.ts";

export function makePic(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
): HTMLDivElement {
  const pic: HTMLDivElement = document.createElement("div");
  pic.className = "pic";

  const emoji: HTMLSpanElement = document.createElement("span");
  emoji.textContent = product.emoji;
  pic.appendChild(emoji);

  if (qty === 0) {
    const badge: HTMLSpanElement = document.createElement("span");
    badge.className = "off sold";
    badge.textContent = "ناموجود";
    pic.appendChild(badge);
  } else if (offer) {
    const badge: HTMLSpanElement = document.createElement("span");
    badge.className = "off";
    badge.textContent = faNumber.format(offer.percent) + "٪";
    pic.appendChild(badge);
  }

  return pic;
}

export function makeAmount(
  product: Product,
  qty: number,
  faNumber: Intl.NumberFormat,
): HTMLParagraphElement {
  const amount: HTMLParagraphElement = document.createElement("p");
  amount.className = "amount";
  if (qty === 0) {
    amount.textContent = product.unit;
  } else {
    amount.textContent = product.unit + " · مانده " + faNumber.format(qty);
  }
  return amount;
}
