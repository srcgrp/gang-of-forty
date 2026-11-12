import type { Cart } from '../types';


export function removeLine(cart: Cart, id: number): Cart {
  return Object.fromEntries(Object.entries(cart).filter(([key]) => Number(key) !== id));
}

export function cartTotal(cart: Cart): number {
  return Object.values(cart).reduce((sum, line) => sum + line.price * line.quantity, 0);
}