import type { CartItem } from "../types/product.ts";

export function renderCart(
  rows: CartItem[],
  count: number,
  total: number,
  faNumber: Intl.NumberFormat,
): void {
  const countEl = document.querySelector<HTMLSpanElement>(".cart-count");
  const list = document.querySelector<HTMLUListElement>("#cart-list");
  if (!countEl || !list) throw new Error("index.html is missing an element");
  countEl.textContent = faNumber.format(count);
  list.replaceChildren();
  for (const row of rows) {
    const li: HTMLLIElement = document.createElement("li");
    li.textContent =
      row.emoji + " " + row.name + " × " + faNumber.format(row.qty);
    list.appendChild(li);
  }
  renderTotal(total, faNumber);
}

export function renderTotal(total: number, faNumber: Intl.NumberFormat): void {
  const cartText = document.querySelector<HTMLParagraphElement>("#cart-text");
  if (!cartText) throw new Error("index.html is missing an element");
  if (total === 0) {
    cartText.textContent = "سبد خالی است.";
  } else {
    cartText.textContent = "جمع: " + faNumber.format(total) + " تومان";
  }
}
