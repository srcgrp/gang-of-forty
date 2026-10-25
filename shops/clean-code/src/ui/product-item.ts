import type { Offer, Product } from "../types/product.ts";
import { makeAmount, makePic } from "./card-pic.ts";
import { makeButton, makePrice } from "./card-price.ts";

export function toCard(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
  prices: {
    available: boolean;
    oldLabel: string;
    nowLabel: string | null;
    line: string;
  },
  onAdd: () => void,
): HTMLLIElement {
  const li: HTMLLIElement = document.createElement("li");

  li.className = prices.available ? "product" : "product out-of-stock";

  const name: HTMLHeadingElement = document.createElement("h3");
  name.textContent = product.name;

  const extra: HTMLSpanElement = document.createElement("span");
  extra.hidden = true;
  extra.textContent = prices.line;

  li.appendChild(makePic(product, offer, faNumber, prices.available));
  li.appendChild(name);
  li.appendChild(makeAmount(product, qty, faNumber));
  li.appendChild(extra);
  li.appendChild(makePrice(prices.oldLabel, prices.nowLabel));
  li.appendChild(makeButton(prices.available, onAdd));

  return li;
}
