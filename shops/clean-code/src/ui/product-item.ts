import { productLine } from "../catalog/product-line.ts";
import type { Offer, Product } from "../types/product.ts";
import { makeAmount, makePic } from "./card-pic.ts";
import { makeButton, makePrice } from "./card-price.ts";

export function makeProductItem(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
  onAdd: () => void,
): HTMLLIElement {
  const li: HTMLLIElement = document.createElement("li");

  if (qty === 0) {
    li.className = "product out-of-stock";
  } else {
    li.className = "product";
  }

  const name: HTMLHeadingElement = document.createElement("h3");
  name.textContent = product.name;

  const extra: HTMLSpanElement = document.createElement("span");
  extra.hidden = true;
  extra.textContent = productLine(product, qty, offer, faNumber);

  li.appendChild(makePic(product, qty, offer, faNumber));
  li.appendChild(name);
  li.appendChild(makeAmount(product, qty, faNumber));
  li.appendChild(extra);
  li.appendChild(makePrice(product, qty, offer, faNumber));
  li.appendChild(makeButton(qty, onAdd));

  return li;
}
