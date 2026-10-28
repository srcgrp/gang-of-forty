import type { Offer, Prices, Product } from "../types/product.ts";
import { makeAmount, makePic } from "./card-pic.ts";
import { makeButton, makePrice } from "./card-price.ts";

export function toCard(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
  prices: Prices,
  onAdd: () => void,
): HTMLLIElement {
  const li: HTMLLIElement = document.createElement("li");

  li.className = prices.available ? "product" : "product out-of-stock";

  const name: HTMLHeadingElement = document.createElement("h3");
  name.textContent = product.name;

  li.appendChild(makePic(product, offer, faNumber, prices.available));
  li.appendChild(name);
  li.appendChild(makeAmount(product, qty, faNumber));
  li.appendChild(makePrice(prices.oldLabel, prices.nowLabel));
  li.appendChild(makeButton(prices.available, onAdd));

  return li;
}
