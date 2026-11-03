import { loadAll } from "./shared/api/load";
import { readConsumedStock } from "./features/catalog/stock-storage";
import { mergeStock } from "./features/catalog/stock";
import { initSearch } from "./features/catalog/search";
import {
  renderSkeletonCategories,
  renderSkeletonProducts,
} from "./shared/ui/skeleton";
import { renderError } from "./shared/ui/error-state";
import { showLoading, hideLoading } from "./shared/ui/loading";
import { initTheme } from "./features/theme/theme";
import { setupAutoAnimate } from "./shared/ui/animate";
import { renderApp } from "./main-render";
import { setupFilterSearchUI } from "./features/catalog/setup-filter-search";
import type { AppState } from "./shared/types";
import type { createCartController } from "./features/cart/cart-controller";
import type { UrlState } from "./features/catalog/url";

export async function boot(
  state: AppState,
  cart: ReturnType<typeof createCartController>,
  urlState: UrlState,
): Promise<void> {
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
        onRetry: () => boot(state, cart, urlState),
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

  setupFilterSearchUI(state, cart, urlState, () =>
    renderApp({ state, onAdd: cart.addToCart }),
  );
}
