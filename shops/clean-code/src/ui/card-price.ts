import type { Offer, Product } from "../types/product.ts";

export function makePrice(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
): HTMLParagraphElement {
  const price: HTMLParagraphElement = document.createElement("p");
  price.className = "price";

  if (offer && qty !== 0) {
    const oldPrice: HTMLSpanElement = document.createElement("span");
    oldPrice.textContent = faNumber.format(product.price) + " تومان";
    price.appendChild(oldPrice);

    const newPrice = (product.price * (100 - offer.percent)) / 100;
    const now: HTMLSpanElement = document.createElement("span");
    now.textContent = faNumber.format(newPrice) + " تومان";
    price.appendChild(now);
  } else {
    price.textContent = faNumber.format(product.price) + " تومان";
  }

  return price;
}

export function makeButton(qty: number, onAdd: () => void): HTMLButtonElement {
  const btn: HTMLButtonElement = document.createElement("button");
  btn.type = "button";
  if (qty === 0) {
    btn.textContent = "ناموجود";
    btn.disabled = true;
  } else {
    btn.textContent = "افزودن به سبد";
    btn.addEventListener("click", onAdd);
  }
  return btn;
}
