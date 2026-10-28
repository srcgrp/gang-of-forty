import type { Cart, CartChange } from '../../../shared/types';

export function addToCart(cart: Cart, id: number, max: number): Cart {
  const next = Math.min((cart[id] ?? 0) + 1, max);
  return next > 0 ? { ...cart, [id]: next } : cart;
}

export function removeFromCart(cart: Cart, id: number): Cart {
  const next = (cart[id] ?? 0) - 1;
  const copy = { ...cart };
  if (next > 0) copy[id] = next;
  else delete copy[id];
  return copy;
}

export function removeLine(cart: Cart, id: number): Cart {
  const copy = { ...cart };
  delete copy[id];
  return copy;
}

export function updateCart(cart: Cart, id: number, change: CartChange, max: number): Cart {
  switch (change) {
    case 'add': return addToCart(cart, id, max);
    case 'remove': return removeFromCart(cart, id);
    case 'remove-line': return removeLine(cart, id);
  }
}

export function cartCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, n) => sum + n, 0);
}

export type CartChangeResult =
  | { status: 'max' | 'noop'; before: number; after: number }
  | { status: 'changed'; before: number; after: number };

export function applyCartChange(cart: Cart, id: number, change: CartChange, max: number): { cart: Cart; result: CartChangeResult } {
  const before = cart[id] ?? 0;
  if (change === 'add' && before >= max) {
    return { cart, result: { status: 'max', before, after: before } };
  }
  const nextCart = updateCart(cart, id, change, max);
  const after = nextCart[id] ?? 0;
  if (after === before) {
    return { cart, result: { status: 'noop', before, after } };
  }
  return { cart: nextCart, result: { status: 'changed', before, after } };
}