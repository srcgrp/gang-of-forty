import type { AppState } from "./shared/types";
import { loadAll } from "./shared/api/load";
import { readCartRaw } from "./features/cart/cart-storage";
import { readUrlState, writeUrlState } from "./features/catalog/url";
import { parseCart } from "./features/cart/parse";
import { initSearch, searchProducts } from "./features/catalog/search";
import { mergeStock } from "./features/catalog/stock";
import { readConsumedStock } from "./features/catalog/stock-storage";
import {
  renderSkeletonCategories,
  renderSkeletonProducts,
} from "./shared/ui/skeleton";
import { showOfflineBanner, hideOfflineBanner } from "./shared/ui/banner";
import { initTheme } from "./features/theme/theme";
import { setupAutoAnimate } from "./shared/ui/animate";
import { renderError } from "./shared/ui/error-state";
import { initFilterModal } from "./features/filter/filter-modal";
import { initSearchUI } from "./features/catalog/search-init";
import { createCartController } from "./features/cart/cart-controller";
import { setupGlobalEvents } from "./shared/ui/global-events";
import { renderApp } from "./main-render";
import { showLoading, hideLoading } from "./shared/ui/loading";

const urlState = readUrlState();
const state: AppState = {
  data: null,
  cart: parseCart(readCartRaw()),
  filters: {
    categoryId: urlState.categoryId,
    stock: urlState.stock,
    discount: urlState.discount,
    sort: urlState.sort,
  },
  searchIds: null,
  searchQuery: urlState.query,
};

const cart = createCartController(state, () =>
  renderApp({ state, onAdd: cart.addToCart }),
);

async function boot(): Promise<void> {
  showLoading();

  initTheme();
  setupAutoAnimate();
  renderSkeletonCategories(document.getElementById("categories-grid"), 7);
  renderSkeletonProducts(document.getElementById("special-track"), 4);
  renderSkeletonProducts(document.getElementById("all-track"), 8);

  const result = await loadAll();

  hideLoading();

  if (result.status !== "success") {
    const msg = result.status === "error" ? result.message : "خطای نامشخص";
    for (const id of ["categories-grid", "special-track", "all-track"]) {
      renderError(document.getElementById(id), {
        title: "خطا در دریافت اطلاعات",
        text: msg,
        onRetry: () => boot(),
      });
    }
    return;
  }

  state.data = {
    ...result.data,
    stock: mergeStock(result.data.stock, readConsumedStock()),
  };

  initSearch(state.data.products);
  renderApp({ state, onAdd: cart.addToCart });
  cart.updateCartBadge();
  cart.renderCartView();

  if (!state.data) return;

  initFilterModal({
    categories: state.data.categories,
    state: state.filters,
    onApply: () => {
      writeUrlState({ query: state.searchQuery, ...state.filters });
      renderApp({ state, onAdd: cart.addToCart });
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
      renderApp({ state, onAdd: cart.addToCart });
    },
  });

  if (urlState.query) {
    const results = searchProducts(state.data.products, urlState.query);
    state.searchIds = new Set(results.map((p) => p.id));
    renderApp({ state, onAdd: cart.addToCart });

    const input = document.getElementById(
      "site-search",
    ) as HTMLInputElement | null;
    if (input) input.value = urlState.query;
  }
}

setupGlobalEvents(
  () => cart.renderCartView(),
  () => {
    hideOfflineBanner();
    if (!state.data) void boot();
  },
);

window.addEventListener("offline", () => showOfflineBanner());
if (!navigator.onLine) showOfflineBanner();

void boot();
