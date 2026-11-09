import { loadAllData } from './shared/api/load-all';
import { loadCart, saveCart } from './shared/storage/cart-storage';
import { loadTheme, saveTheme } from './shared/storage/theme-storage';
import { readUrlFilters, writeUrlFilters, readUrlHash } from './shared/storage/url';
import { createState } from './shared/state/app-state';
import { withCategoryImages } from './shared/logic/content-utils';
import { BANNER_IMAGES, PROMO_IMAGES } from './shared/content';
import { setupStaticEvents } from './shared/ui/events';
import { pruneCart } from './features/cart/cart-rows';
import { setupCart } from './features/cart/ui/cart-controller';
import { buildShelves } from './features/products/logic/shelves';
import { renderPage } from './features/products/ui/render-page';
import { setupFilters } from './features/products/ui/filter-controller';
import type { AppState } from './shared/types';

function render(state: AppState, renderCart: () => void): void {
  renderPage({
    ...state,
    shelves: buildShelves(state),
    banners: BANNER_IMAGES,
    promos: PROMO_IMAGES,
  });
  renderCart();
}

async function start(): Promise<void> {
  const state = createState(loadCart());
  setupStaticEvents({ theme: loadTheme(), onTheme: saveTheme });
  const renderCart = setupCart(state, saveCart);

  Object.assign(state, await loadAllData());
  state.categories = withCategoryImages(state.categories);
  state.cart = pruneCart(state);
  saveCart(state.cart);

  render(state, renderCart);
  setupFilters(state, readUrlFilters, writeUrlFilters, readUrlHash);
}

start();
