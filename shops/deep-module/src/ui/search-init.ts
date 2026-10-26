import type { Product, StockData } from "../types";
import { searchProducts } from "../catalog/search";
import { h } from "./dom";
import { formatPrice } from "./format";
import { openProductDetail } from "./detail";

let activeIndex = -1;

export interface SearchInitOptions {
  getProducts: () => Product[];
  getStock: () => StockData;
  onFilter: (ids: Set<number> | null, query: string) => void;
  onAdd: (product: Product) => boolean;
}

export function initSearchUI(opts: SearchInitOptions): void {
  const input = document.getElementById(
    "site-search",
  ) as HTMLInputElement | null;
  const form = document.getElementById("search-form") as HTMLFormElement | null;
  const box = document.getElementById("search-suggestions");
  const clearBtn = document.getElementById(
    "search-clear",
  ) as HTMLButtonElement | null;
  if (!input || !box) return;

  let searchQuery = "";
  let timer: ReturnType<typeof setTimeout> | undefined;

  const close = (): void => {
    box.classList.remove("search__suggestions--visible");
    box.replaceChildren();
    activeIndex = -1;
    input.setAttribute("aria-expanded", "false");
  };

  const updateBadge = (): void => {
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
    x.addEventListener("click", () => {
      input.value = "";
      applyFilter("");
      if (clearBtn) clearBtn.hidden = true;
      close();
    });
    badge.append(text, x);
    title.appendChild(badge);
  };

  const applyFilter = (query: string): void => {
    searchQuery = query.trim();
    updateBadge();
    if (!searchQuery) {
      opts.onFilter(null, "");
      return;
    }
    const results = searchProducts(opts.getProducts(), searchQuery);
    opts.onFilter(new Set(results.map((p) => p.id)), searchQuery);
  };

  const makeSuggestion = (product: Product): HTMLButtonElement => {
    const item = h("button", "search-suggestion");
    item.type = "button";
    item.setAttribute("role", "option");
    const emoji = h("span", "search-suggestion__emoji", product.emoji ?? "📦");
    emoji.setAttribute("aria-hidden", "true");
    const info = h("div", "search-suggestion__info");
    info.append(
      h("span", "search-suggestion__name", product.name),
      h("span", "search-suggestion__unit", product.unit ?? ""),
    );
    const price = h(
      "span",
      "search-suggestion__price",
      formatPrice(product.price),
    );
    item.append(emoji, info, price);
    item.addEventListener("click", () => {
      openProductDetail(product, opts.getStock(), {
        onAdd: opts.onAdd,
        onAfterAdd: () => {},
      });
      input.value = "";
      close();
    });
    return item;
  };

  const renderSuggestions = (query: string): void => {
    box.replaceChildren();
    activeIndex = -1;
    if (!query.trim()) {
      close();
      return;
    }
    const results = searchProducts(opts.getProducts(), query);
    if (results.length === 0) {
      const empty = h("div", "search-suggestion--empty");
      empty.append(
        h("span", undefined, `نتیجه‌ای برای "${query}" پیدا نشد`),
        h("small", undefined, "عبارت دیگری را امتحان کنید"),
      );
      box.appendChild(empty);
    } else {
      for (const product of results) {
        box.appendChild(makeSuggestion(product));
      }
    }
    box.classList.add("search__suggestions--visible");
    input.setAttribute("aria-expanded", "true");
  };

  input.addEventListener("input", () => {
    renderSuggestions(input.value);
    if (clearBtn) clearBtn.hidden = input.value.trim().length === 0;
    clearTimeout(timer);
    timer = setTimeout(() => applyFilter(input.value), 350);
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    const items = box.querySelectorAll<HTMLButtonElement>(".search-suggestion");
    if (e.key === "Escape") {
      close();
      input.blur();
      return;
    }
    if (e.key === "ArrowDown" && items.length > 0) {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items[activeIndex]?.focus();
    }
    if (e.key === "ArrowUp" && items.length > 0) {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items[activeIndex]?.focus();
    }
  });

  input.addEventListener("focus", () => {
    if (input.value.trim()) renderSuggestions(input.value);
  });

  document.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    if (!e.target.closest(".search")) close();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.hidden = true;
      applyFilter("");
      close();
      input.focus();
    });
  }

  if (form) {
    form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      applyFilter(q);
      close();
      document.getElementById("all-products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
}
