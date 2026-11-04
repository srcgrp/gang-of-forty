import type { AppState } from "./shared/types";
import { readCartRaw } from "./features/cart/cart-storage";
import { readUrlState } from "./features/catalog/url";
import { parseCart } from "./features/cart/parse";
import { showOfflineBanner, hideOfflineBanner } from "./shared/ui/banner";
import { createCartController } from "./features/cart/cart-controller";
import { setupGlobalEvents } from "./shared/ui/global-events";
import { renderApp } from "./main-render";
import { boot } from "./boot";

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

setupGlobalEvents(
  () => cart.renderCartView(),
  () => {
    hideOfflineBanner();
    if (!state.data) void boot(state, cart, urlState);
  },
);

window.addEventListener("offline", () => showOfflineBanner());
if (!navigator.onLine) showOfflineBanner();

void boot(state, cart, urlState);
