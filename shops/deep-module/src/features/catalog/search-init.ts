import type { Product, StockData } from "../../shared/types";
import { setupSearchEvents } from "./search-events";

let searchInitialized = false;

export interface SearchInitOptions {
  getProducts: () => Product[];
  getStock: () => StockData;
  onFilter: (ids: Set<number> | null, query: string) => void;
  onAdd: (product: Product) => boolean;
}

export function initSearchUI(opts: SearchInitOptions): void {
  if (searchInitialized) return;
  searchInitialized = true;
  const input = document.getElementById(
    "site-search",
  ) as HTMLInputElement | null;
  const form = document.getElementById("search-form") as HTMLFormElement | null;
  const box = document.getElementById("search-suggestions");
  const clearBtn = document.getElementById(
    "search-clear",
  ) as HTMLButtonElement | null;
  if (!input || !box) return;

  setupSearchEvents(input, form, box, clearBtn, opts);
}
