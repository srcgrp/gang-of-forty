import type { CartView } from '../../../shared/types';
import { updateCartBadge } from './cart-badge';
import { renderCart } from './cart-panel';
import { renderTotal } from './cart-total';

export function renderCartView(view: CartView, onRemove: (id: number) => void): void {
  updateCartBadge(view.count);
  renderCart(view.rows, onRemove);
  renderTotal(view.total);
}