/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CartView, ProductItem, QtyOf } from '../types';
import { renderCartBadge } from './cart-badge';
import { refreshCart, renderCart } from './cart-summary';
import { syncAllControls } from './sync-controls';

let shown: CartView = { ready: false, count: 0, rows: [], total: 0, oldTotal: 0, discount: 0 };
export const currentBasket = (): CartView => shown;
export function drawBasket(view: CartView, items: ReadonlyMap<number, ProductItem>, qtyOf: QtyOf, bump = false): void {
  shown = view;
  renderCartBadge(view.count, bump);
  syncAllControls(items, qtyOf);
  refreshCart(() => renderCart(view));
}