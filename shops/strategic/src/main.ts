/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { asApiFailure, loadWithSlowNotice } from './api/load-slow';
import { addToCart, qtyOf, reconcileCart, removeFromCart } from './features/cart/cart-rules';
import { cartCount, cartRows, cartTotal } from './features/cart/cart-totals';
import { buildModel } from './features/products/build-model';
import { emptyModel } from './features/products/empty-model';
import { visibleProducts } from './features/products/search';
import { CART_KEY, loadCart, saveCart } from './storage/cart-storage';
import { goBackInHistory, goToUrl, hasAppHistory, hasHash, homePath, pushHash, readHashId, readRoute, readSearch, replaceSearchUrl, routeUrl, savedScroll } from './storage/url-state';
import type { AppState } from './types';
import { bindClicks } from './ui/app-click';
import { showBadge } from './ui/app-cart';
import { bindEvents } from './ui/app-events';
import { bindSearch } from './ui/app-search';
import { start } from './ui/app-start';
import type { Context, Ports } from './ui/context';
import { renderFooterBrand } from './ui/footer-brand';
import { syncLocation } from './ui/nav-sync';

const state: AppState = { model: emptyModel(), ready: false, cart: loadCart(), pendingQuery: '', renderedSearch: readSearch() };

const ports: Ports = {
  loadWithSlowNotice, asApiFailure, loadCart, saveCart, cartKey: CART_KEY,
  readRoute, readSearch, readHashId, hasHash, homePath, routeUrl, hasAppHistory, savedScroll,
  goToUrl, replaceSearchUrl, pushHash, goBackInHistory,
  buildModel, emptyModel, visibleProducts, qtyOf, addToCart, removeFromCart, reconcileCart, cartCount, cartRows, cartTotal,
};

const ctx: Context = { state, ports };

bindClicks(ctx);
bindSearch(ctx);
bindEvents(ctx);
renderFooterBrand();
showBadge(ctx);
syncLocation(readHashId());
void start(ctx);