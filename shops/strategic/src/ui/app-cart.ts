/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { renderCartBadge } from './cart-badge';
import { refreshCart, renderCart } from './cart-summary';
import { qtyOfCart } from './context';
import type { Context } from './context';
import { announceLimit, announceQuantity, notifyAdded } from './notify';
import { syncAllControls, syncControls } from './sync-controls';

export function drawCart({ state, ports }: Context): void {
  const { cart, ready, model } = state;
  const rows = ready ? ports.cartRows(cart, model.items) : [];
  const { total, oldTotal } = ports.cartTotal(rows);
  renderCart({ ready, count: ports.cartCount(cart), rows, total, oldTotal });
}

export const showBadge = ({ state, ports }: Context, bump = false): void =>
  renderCartBadge(ports.cartCount(state.cart), bump);

export function changeQuantity(ctx: Context, id: number, change: 'add' | 'remove', source: 'add-button' | 'stepper' = 'stepper'): void {
  const { state, ports } = ctx;
  const item = state.model.items.get(id);
  if (!item) return;
  const { name } = item.product;
  const before = ports.qtyOf(state.cart, id);
  const next = change === 'add' ? ports.addToCart(state.cart, id, item.stock) : ports.removeFromCart(state.cart, id, item.stock);
  const after = ports.qtyOf(next, id);

  if (after === before) {
    if (change === 'add') announceLimit(name);
    return;
  }
  state.cart = next;
  ports.saveCart(next);
  if (after > before) notifyAdded(name, source === 'add-button');
  showBadge(ctx, after > before);
  syncControls(id, state.model.items, qtyOfCart(ctx));
  refreshCart(() => drawCart(ctx));
  announceQuantity(name, after, ports.cartCount(next));
}

export function reconcileStored(ctx: Context): void {
  const { state, ports } = ctx;
  state.cart = ports.reconcileCart(state.cart, (id) => state.model.items.get(id)?.stock ?? 0);
  ports.saveCart(state.cart);
  showBadge(ctx);
}

export function followOtherTab(ctx: Context, event: StorageEvent): void {
  const { state, ports } = ctx;
  if (event.key !== ports.cartKey) return;
  state.cart = ports.loadCart();
  showBadge(ctx);
  if (state.ready) syncAllControls(state.model.items, qtyOfCart(ctx));
  refreshCart(() => drawCart(ctx));
}