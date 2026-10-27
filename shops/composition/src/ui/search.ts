import type { CardView, CartItem } from "../types";
import { createProductCard } from "./product-card";
export function setSearchReady(ready: boolean, placeholder: string): void {
  const input = document.querySelector<HTMLInputElement>("#product-search");
  if (!input) throw new Error("ورودی جست‌وجو پیدا نشد.");
  input.disabled = !ready;
  input.placeholder = placeholder;
}
export function showSearch(active: boolean, cards: CardView[], message: string,
  onAdd: (item: CartItem) => void): void {
  const results = document.querySelector<HTMLElement>("#search-results");
  const list = document.querySelector<HTMLElement>("#search-products");
  const status = document.querySelector<HTMLElement>("#search-status");
  const content = document.querySelector<HTMLElement>("#shop-content");
  if (!results || !list || !status || !content) throw new Error("بخش جست‌وجو پیدا نشد.");
  results.hidden = !active;
  content.hidden = active;
  status.textContent = message;
  list.replaceChildren();
  if (active) for (const card of cards) list.appendChild(createProductCard(card, onAdd));
}
