import type { CartItem } from "../../../shared/types";

export function addItem(cart: readonly CartItem[], item: CartItem, stock: number): CartItem[] {
  const existing = cart.find(line => line.id === item.id);
  if ((existing?.quantity ?? 0) >= stock) return [...cart];
  if (!existing) return [...cart, { ...item, quantity: 1 }];
  return cart.map(line => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line);
}
export function removeItem(cart: readonly CartItem[], id: number): CartItem[] {
  return cart.filter(line => line.id !== id);
}
export function cartCount(cart: readonly CartItem[]): number {
  return cart.reduce((count, line) => count + line.quantity, 0);
}
export function cartTotal(cart: readonly CartItem[]): number {
  return cart.reduce((total, line) => total + line.price * line.quantity, 0);
}
