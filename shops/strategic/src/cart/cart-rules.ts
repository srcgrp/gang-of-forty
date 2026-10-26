/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CartLine } from '../types';

export const qtyOf = (cart: readonly CartLine[], id: number): number =>
  cart.find((line) => line.productId === id)?.quantity ?? 0;

export function setQuantity(cart: readonly CartLine[], id: number, wanted: number, limit: number): CartLine[] {
  const quantity = Math.max(0, Math.min(wanted, limit));
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