/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { clamp } from '../../shared/range';
import type { CartChange, CartLine, ProductItem } from '../../types';
export const qtyOf = (cart: readonly CartLine[], id: number): number =>
  cart.find((line) => line.productId === id)?.quantity ?? 0;

export function setQuantity(cart: readonly CartLine[], id: number, wanted: number, limit: number): CartLine[] {
  const quantity = clamp(Math.floor(wanted), 0, Math.floor(limit));
  const others = cart.filter((line) => line.productId !== id);
  if (quantity === 0) return others;
  return [...others, { productId: id, quantity }].sort((first, second) => first.productId - second.productId);
}

export const addToCart = (cart: readonly CartLine[], id: number, limit: number): CartLine[] =>
  setQuantity(cart, id, qtyOf(cart, id) + 1, limit);

export const removeFromCart = (cart: readonly CartLine[], id: number, limit: number): CartLine[] =>
  setQuantity(cart, id, qtyOf(cart, id) - 1, limit);

export function reconcileCart(cart: readonly CartLine[], limitOf: (id: number) => number): CartLine[] {
  return cart.flatMap((line) => {
    const limit = limitOf(line.productId);
    return limit > 0 ? [{ productId: line.productId, quantity: Math.min(line.quantity, limit) }] : [];
  });
}

export function changeCart(
  cart: readonly CartLine[], items: ReadonlyMap<number, ProductItem>, id: number, direction: 'add' | 'remove',
): CartChange | null {
  const item = items.get(id);
  if (!item) return null;
  const lines = direction === 'add' ? addToCart(cart, id, item.stock) : removeFromCart(cart, id, item.stock);
  return { lines, name: item.product.name, before: qtyOf(cart, id), after: qtyOf(lines, id) };
}
