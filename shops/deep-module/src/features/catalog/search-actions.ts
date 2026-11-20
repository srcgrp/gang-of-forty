import type { Product, StockData } from "../../shared/types";
import { searchProducts } from "./search";
import { renderSuggestionList, updateSearchBadge } from "./search-render";
import { setupSearchFormEvents } from "./search-form";

export interface SearchActionsOptions {
  getProducts: () => Product[];
  getStock: () => StockData;
  onFilter: (ids: Set<number> | null, query: string) => void;
  onAdd: (product: Product) => boolean;
}

export function setupSearchActions(
  input: HTMLInputElement,
  form: HTMLFormElement | null,
  box: HTMLElement,
  clearBtn: HTMLButtonElement | null,
  opts: SearchActionsOptions,
): { close: () => void } {
  let searchQuery = "";

  const close = (): void => {
    box.classList.remove("search__suggestions--visible");
    box.replaceChildren();
    input.setAttribute("aria-expanded", "false");
  };

  const applyFilter = (query: string): void => {
    searchQuery = query.trim();
    updateSearchBadge(searchQuery, () => {
      input.value = "";
      applyFilter("");
      if (clearBtn) clearBtn.hidden = true;
      close();
    });
    if (!searchQuery) {
      opts.onFilter(null, "");
      return;
    }
    const results = searchProducts(opts.getProducts(), searchQuery);
    opts.onFilter(new Set(results.map((p) => p.id)), searchQuery);
  };

  const handleRender = (): void => {
    renderSuggestionList(
      box,
      input,
      input.value,
      opts.getProducts(),
      opts.getStock(),
      opts.onAdd,
      close,
    );
    if (clearBtn) clearBtn.hidden = input.value.trim().length === 0;
  };

  input.addEventListener("input", handleRender);
  input.addEventListener("focus", () => {
    if (input.value.trim()) handleRender();
  });

  document.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    if (!e.target.closest(".search")) close();
  });

  setupSearchFormEvents(input, form, clearBtn, applyFilter, close);

  return { close };
}
