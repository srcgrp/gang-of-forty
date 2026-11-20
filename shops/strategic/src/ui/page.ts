/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Actions, DrawOptions, PageView, Route } from '../types';
import { bindClicks } from './app-click';
import { bindEvents } from './app-events';
import { closeCart } from './cart-panel';
import { drawRoute } from './draw-route';
import { renderFooterBrand } from './footer-brand';
import { renderFooterData } from './footer-data';
import { renderNav, renderNotice } from './header';
import { playEnter, swapView } from './motion';
import { bindSearchBox, cancelSearch, syncSearchBox } from './search-box';

export function bindUi(actions: Actions, route: Route): void {
  bindClicks(actions);
  bindEvents();
  bindSearchBox(actions);
  syncSearchBox(route);
  renderFooterBrand();
}
export function render(view: PageView, options: DrawOptions = {}): void {
  renderNotice(view.model.shop);
  renderNav(view.model, view.linkOf);
  renderFooterData(view.model, view.linkOf);
  drawRoute(view, options);
}
export function transition(show: () => void): void {
  closeCart();
  cancelSearch();
  void swapView(show);
}
export function enter(): void { playEnter(); }
export function resetNavigation(): void { closeCart(); cancelSearch(); }

export { drawBasket } from './basket-view';
export { ERROR_TEXT } from './error-text';
export { announceLimit, announceQuantity, notifyAdded } from './notify';
export { showSlowNotice } from './skeleton';
export { renderStatus } from './status';