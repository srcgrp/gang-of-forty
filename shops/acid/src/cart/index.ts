import type { Product, CartLine } from '../types';

export function addToCart(cart: CartLine[], product: Product): CartLine[] {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
    return [...cart];
  }
  return [...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
}

export function getCartCount(cart: CartLine[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}