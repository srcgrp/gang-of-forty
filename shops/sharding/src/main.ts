import { loadAllData } from './shared/api/load-all';
import { loadCart, saveCart } from './shared/storage/cart-storage';
import { loadTheme, saveTheme } from './shared/storage/theme-storage';
import { readUrlFilters, writeUrlFilters, readUrlHash, type UrlFilters } from './shared/storage/url';
import { createState } from './shared/state/app-state';
import { stockOf } from './shared/logic/stock';
import { withCategoryImages } from './shared/logic/content-utils';
import { BANNER_IMAGES, PROMO_IMAGES } from './shared/content';
import { setupStaticEvents } from './shared/ui/events';
import { refreshCartButtons } from './shared/ui/cart-button';
import type { CartChange } from './shared/types';

import { applyCartChange } from './features/cart/logic/cart';
import { pruneCart, getCartUI } from './features/cart/cart-rows';
import { renderCartView } from './features/cart/ui/cart-view';
import { showCartFeedback } from './features/cart/ui/cart-feedback';
import { setupCartPanelToggle } from './features/cart/ui/cart-panel-toggle';
import { setupCartClicks } from './features/cart/ui/cart-events';

import { buildShelves } from './features/products/logic/shelves';
import { cardOf } from './features/products/logic/to-card';
import { renderPage } from './features/products/ui/render-page';
import { showCategory, setupCatFilter } from './features/products/ui/category-filter';
import { setupSearch } from './features/products/ui/search';

const state = createState(loadCart());
let filters: UrlFilters = readUrlFilters();
let restoreSearchQuery = (_q: string) => {};

const renderCartUI = () => renderCartView(getCartUI(state), (id) => changeCart(id, 'remove-line'));
const render = () => { renderPage({ ...state, shelves: buildShelves(state), banners: BANNER_IMAGES, promos: PROMO_IMAGES }); renderCartUI(); };

function changeCart(id: number, change: CartChange): void {
  const max = stockOf(id, state.stock), name = state.products.find((p) => p.id === id)?.name ?? 'کالا';
  const { cart, result } = applyCartChange(state.cart, id, change, max);
  state.cart = cart;
  if (result.status === 'max') return showCartFeedback(name, result.before, result.after, true);
  if (result.status === 'noop') return;
  saveCart(state.cart); refreshCartButtons(id, result.after, max); renderCartUI(); showCartFeedback(name, result.before, result.after);
}

const syncFilters = () => { filters = readUrlFilters(); showCategory(filters.category, state.categories); restoreSearchQuery(filters.query); };

async function start(): Promise<void> {
  setupStaticEvents({ theme: loadTheme(), onTheme: saveTheme }); setupCartPanelToggle(); setupCartClicks(changeCart);
  Object.assign(state, await loadAllData());
  state.categories = withCategoryImages(state.categories);
  state.cart = pruneCart(state); saveCart(state.cart);
  render(); showCategory(filters.category, state.categories);

  restoreSearchQuery = setupSearch({
    products: state.products, toCard: (p) => cardOf(p, state), initialQuery: filters.query,
    onQueryChange: (q) => { filters.query = q; writeUrlFilters(filters); },
  });
  setupCatFilter({
    onSelect: (cat) => { filters.category = cat; writeUrlFilters(filters, 'push'); showCategory(cat, state.categories); },
    onPop: syncFilters,
    onHiddenShelf: () => { filters.category = ''; writeUrlFilters(filters); showCategory('', state.categories); },
    getHash: readUrlHash,
  });
}

start();