import type { AppState } from "../../shared/types";
import type { createCartController } from "../cart/cart-controller";
import type { UrlState } from "./url";
import { writeUrlState } from "./url";
import { initFilterModal } from "../filter/filter-modal";
import { initSearchUI } from "./search-init";
import { searchProducts } from "./search";

export function setupFilterSearchUI(
  state: AppState,
  cart: ReturnType<typeof createCartController>,
  urlState: UrlState,
  onUpdate: () => void, 
): void {
  if (!state.data) return;

  initFilterModal({
    categories: state.data.categories,
    state: state.filters,
    onApply: () => {
      writeUrlState({ query: state.searchQuery, ...state.filters });
      onUpdate(); 
    },
  });

  initSearchUI({
    getProducts: () => state.data!.products,
    getStock: () => state.data!.stock,
    onAdd: cart.addToCart,
    onFilter: (ids, query) => {
      state.searchIds = ids;
      state.searchQuery = query;
      writeUrlState({ query, ...state.filters });
      onUpdate();
    },
  });

  if (urlState.query) {
    const results = searchProducts(state.data.products, urlState.query);
    state.searchIds = new Set(results.map((p) => p.id));
    onUpdate();

    const input = document.getElementById(
      "site-search",
    ) as HTMLInputElement | null;
    if (input) input.value = urlState.query;
  }
}
