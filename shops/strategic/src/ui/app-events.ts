/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { drawCart, followOtherTab } from './app-cart';
import { render } from './app-route';
import { cartIsOpen, closeCart, closeCartSoon, isCartPinned, openCart } from './cart-panel';
import type { Context } from './context';
import { dom } from './dom';
import { swapView } from './motion';
import { syncLocation } from './nav-sync';

function bindCartHover(ctx: Context): void {
  dom.cartWrap.addEventListener('pointerenter', (event: PointerEvent) => {
    if (event.pointerType === 'mouse') openCart(() => drawCart(ctx));
  });
  dom.cartWrap.addEventListener('pointerleave', (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || isCartPinned()) return;
    closeCartSoon();
  });
  dom.cartWrap.addEventListener('focusout', (event: FocusEvent) => {
    const next = event.relatedTarget;
    if (cartIsOpen() && next instanceof Node && !dom.cartWrap.contains(next)) closeCart();
  });
}

function onBackOrForward(ctx: Context, event: PopStateEvent): void {
  const { ports } = ctx;
  closeCart();
  if (ports.readSearch() === ctx.state.renderedSearch) {
    syncLocation(ports.readHashId());
    return;
  }
  const saved = ports.savedScroll(event.state);
  void swapView(() => {
    render(ctx);
    if (typeof saved === 'number') window.scrollTo({ top: saved, behavior: 'instant' });
    else if (!ports.hasHash()) window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

export function bindEvents(ctx: Context): void {
  bindCartHover(ctx);
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    if (cartIsOpen()) {
      closeCart({ returnFocus: dom.cartWrap.contains(document.activeElement) });
    } else if (dom.menuToggle.checked) {
      dom.menuToggle.checked = false;
      dom.menuToggle.focus();
    }
  });
  window.addEventListener('popstate', (event: PopStateEvent) => onBackOrForward(ctx, event));
  window.addEventListener('hashchange', () => syncLocation(ctx.ports.readHashId()));
  window.addEventListener('storage', (event: StorageEvent) => followOtherTab(ctx, event));
}