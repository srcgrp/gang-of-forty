import type { Product, StockData } from "../../shared/types";
import { h } from "../../shared/ui/dom";
import { formatPrice } from "../../shared/ui/format";
import { openProductDetail } from "./detail";
import { searchProducts } from "./search";

export function makeSuggestionElement(
  product: Product,
  stock: StockData,
  onAdd: (p: Product) => boolean,
  onClick: () => void
): HTMLButtonElement {
  const item = h("button", "search-suggestion");
  item.type = "button";
  item.setAttribute("role", "option");
  const emoji = h("span", "search-suggestion__emoji", product.emoji ?? "📦");
  emoji.setAttribute("aria-hidden", "true");
  const info = h("div", "search-suggestion__info");
  info.append(
    h("span", "search-suggestion__name", product.name),
    h("span", "search-suggestion__unit", product.unit ?? "")
  );
  const price = h("span", "search-suggestion__price", formatPrice(product.price));
  item.append(emoji, info, price);
  item.addEventListener("click", () => {
    openProductDetail(product, stock, { onAdd, onAfterAdd: () => {} });
    onClick();
  });
  return item;
}

export function renderSuggestionList(
  box: HTMLElement,
  input: HTMLInputElement,
  query: string,
  products: Product[],
  stock: StockData,
  onAdd: (p: Product) => boolean,
  onClose: () => void
): void {
  box.replaceChildren();
  if (!query.trim()) {
    onClose();
    return;
  }
  const results = searchProducts(products, query);
  if (results.length === 0) {
    const empty = h("div", "search-suggestion--empty");
    empty.append(
      h("span", undefined, `نتیجه‌ای برای "${query}" پیدا نشد`),
      h("small", undefined, "عبارت دیگری را امتحان کنید")
    );
    box.appendChild(empty);
  } else {
    for (const product of results) {
      box.appendChild(makeSuggestionElement(product, stock, onAdd, onClose));
    }
  }
  box.classList.add("search__suggestions--visible");
  input.setAttribute("aria-expanded", "true");
}

export function updateSearchBadge(searchQuery: string, onClear: () => void): void {
  const title = document.getElementById("all-products-title");
  if (!title) return;
  title.querySelector(".search-active-badge")?.remove();
  if (!searchQuery) return;
  const badge = document.createElement("span");
  badge.className = "search-active-badge";
  const text = document.createElement("span");
  text.textContent = `"${searchQuery}"`;
  const x = document.createElement("button");
  x.type = "button";
  x.setAttribute("aria-label", "پاک کردن جستجو");
  x.textContent = "✕";
  x.addEventListener("click", onClear);
  badge.append(text, x);
  title.appendChild(badge);
}