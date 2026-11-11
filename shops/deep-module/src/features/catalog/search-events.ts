import type { Product, StockData } from "../../shared/types";
import { setupSearchActions } from "./search-actions";
import { setupSearchKeyboardNav } from "./search-keyboard";

export interface SearchEventsOptions {
  getProducts: () => Product[];
  getStock: () => StockData;
  onFilter: (ids: Set<number> | null, query: string) => void;
  onAdd: (product: Product) => boolean;
}

export function setupSearchEvents(
  input: HTMLInputElement,
  form: HTMLFormElement | null,
  box: HTMLElement,
  clearBtn: HTMLButtonElement | null,
  opts: SearchEventsOptions,
): void {
  const { close } = setupSearchActions(input, form, box, clearBtn, opts);
  setupSearchKeyboardNav(input, box, close);
}
