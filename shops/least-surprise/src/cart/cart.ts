import type { CartItem, Product } from '../types';



export function addToCart(cart: CartItem[], product: Product, maxStock: number): CartItem[] {
  const existing = cart.find(item => item.product.id === product.id);

  if (existing) {
    if (existing.quantity >= maxStock) return cart;
    return cart.map(item =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  if (maxStock <= 0) return cart;
  return [...cart, { product, quantity: 1 }];
}

export function removeFromCart(cart: CartItem[], productId: number): CartItem[] {
  const existing = cart.find(item => item.product.id === productId);
  if (!existing) return cart;

  if (existing.quantity > 1) {
    return cart.map(item =>
      item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  }

  return cart.filter(item => item.product.id !== productId);
}

export function calculateTotalCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateTotalPrice(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
import confetti from 'canvas-confetti';

export function triggerConfetti(): void {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
}
