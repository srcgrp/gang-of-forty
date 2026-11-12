import type { CartLine, Product } from '../types';


export function addToCart(cart: CartLine[], product: Product): CartLine[] {
  const existing = cart.find((line) => line.id === product.id);
  if (existing) {
    return cart.map((line) => (line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line));
  }
  return [...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
}

export function removeFromCart(cart: CartLine[], id: number): CartLine[] {
  return cart.filter((line) => line.id !== id);
}

export function cartCount(cart: CartLine[]): number {
  return cart.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartTotal(cart: CartLine[]): number {
  return cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
}