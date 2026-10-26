import type { Product } from "../types";
import { searchProducts } from "../catalog/search";
import { h } from "./dom";
import { formatPrice } from "./format";

export interface SearchViewOptions {
  input: HTMLInputElement;
  suggestions: HTMLElement;
  clearBtn: HTMLButtonElement;
  products: Product[];
  onSelect: (product: Product) => void;
  onQueryChange: (query: string) => void;
}

let activeIndex = -1;

export function renderSuggestions(query: string, opts: SearchViewOptions): void {
  opts.suggestions.replaceChildren();
  activeIndex = -1;

  if (!query.trim()) {
    closeSuggestions(opts);
    return;
  }

  const results = searchProducts(opts.products, query);
  if (results.length === 0) {
    const empty = h("div", "search-suggestion--empty");
    empty.append(
      h("span", undefined, `نتیجه‌ای برای "${query}" پیدا نشد`),
      h("small", undefined, "عبارت دیگری را امتحان کنید"),
    );
    opts.suggestions.appendChild(empty);
    opts.suggestions.classList.add("search__suggestions--visible");
    opts.input.setAttribute("aria-expanded", "true");
    return;
  }

  for (const product of results) {
    opts.suggestions.appendChild(makeItem(product, opts));
  }
  opts.suggestions.classList.add("search__suggestions--visible");
  opts.input.setAttribute("aria-expanded", "true");
}

function makeItem(product: Product, opts: SearchViewOptions): HTMLButtonElement {
  const item = h("button", "search-suggestion");
  item.type = "button";
  item.setAttribute("role", "option");
  item.dataset.id = String(product.id);
  const emoji = h("span", "search-suggestion__emoji", product.emoji || "📦");
  emoji.setAttribute("aria-hidden", "true");
  const info = h("div", "search-suggestion__info");
  info.append(
    h("span", "search-suggestion__name", product.name),
    h("span", "search-suggestion__unit", product.unit || ""),
  );
  const price = h("span", "search-suggestion__price", formatPrice(product.price));
  item.append(emoji, info, price);
  item.addEventListener("click", () => {
    opts.onSelect(product);
    opts.input.value = "";
    closeSuggestions(opts);
  });
  return item;
}

export function closeSuggestions(opts: SearchViewOptions): void {
  opts.suggestions.classList.remove("search__suggestions--visible");
  opts.suggestions.replaceChildren();
  activeIndex = -1;
  opts.input.setAttribute("aria-expanded", "false");
}

export function navigateSuggestions(direction: "up" | "down", opts: SearchViewOptions): void {
  const items = opts.suggestions.querySelectorAll<HTMLButtonElement>(".search-suggestion");
  if (items.length === 0) return;
  if (direction === "down") activeIndex = Math.min(activeIndex + 1, items.length - 1);
  else activeIndex = Math.max(activeIndex - 1, 0);
  items[activeIndex]?.focus();
}