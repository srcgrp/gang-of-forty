/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { cartIsOpen, closeCart, closeCartSoon, isCartPinned, openCart } from './cart-panel';
import { currentBasket } from './basket-view';
import { renderCart } from './cart-summary';
import { dom } from './dom';

export function bindEvents(): void {
  dom.cartWrap.addEventListener('pointerenter', (event: PointerEvent) => {
    if (event.pointerType === 'mouse') openCart(() => renderCart(currentBasket()));
  });
  dom.cartWrap.addEventListener('pointerleave', (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && !isCartPinned()) closeCartSoon();
  });
  dom.cartWrap.addEventListener('focusout', (event: FocusEvent) => {
    const next = event.relatedTarget;
    if (cartIsOpen() && next instanceof Node && !dom.cartWrap.contains(next)) closeCart();
  });
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (cartIsOpen()) closeCart({ returnFocus: dom.cartWrap.contains(document.activeElement) });
      else if (dom.menuToggle.checked) {
        dom.menuToggle.checked = false;
        dom.menuToggle.focus();
      }
    }
  });
}