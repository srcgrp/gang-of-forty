import type { AppState, Cart, CartChange } from '../../../shared/types';
import { refreshCartButtons } from '../../../shared/ui/cart-button';
import { applyCartChange } from '../logic/cart';
import { buildCartView } from '../cart-rows';
import { renderCartView } from './cart-view';
import { showCartFeedback } from './cart-feedback';
import { setupCartClicks } from './cart-events';
import { setupCartPanelToggle } from './cart-panel-toggle';

export function setupCart(state: AppState, saveCart: (cart: Cart) => void): () => void {
  function renderCart(): void {
    renderCartView(buildCartView(state), (id) => changeCart(id, 'remove-line'));
  }

  function changeCart(id: number, change: CartChange): void {
    const max = state.stock?.items[id] ?? 0;
    const name = state.products.find((product) => product.id === id)?.name ?? 'کالا';
    const { cart, result } = applyCartChange(state.cart, id, change, max);

    if (result.status === 'max') {
      showCartFeedback(name, result.before, result.after, true);
      return;
    }
    if (result.status === 'noop') return;

    state.cart = cart;
    saveCart(cart);
    refreshCartButtons(id, result.after, max);
    renderCart();
    showCartFeedback(name, result.before, result.after);
  }

  setupCartPanelToggle();
  setupCartClicks(changeCart);
  return renderCart;
}
