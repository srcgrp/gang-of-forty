import type { CartItem, ProductWithDetails } from '../types';

export function addToCart(
  cart: readonly CartItem[],
  product: ProductWithDetails,
  maxStock: number
): CartItem[] {
  const existingIndex = cart.findIndex((item) => String(item.product.id) === String(product.id));

  if (existingIndex === -1) {
    if (maxStock <= 0) return [...cart];
    return [...cart, { product, quantity: 1 }];
  }

  const existingItem = cart[existingIndex];
  if (existingItem.quantity >= maxStock) {
    return [...cart];
  }

  return cart.map((item, index) =>
    index === existingIndex
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
}

export function removeFromCart(
  cart: readonly CartItem[],
  productId: string | number
): CartItem[] {
  const existingIndex = cart.findIndex((item) => String(item.product.id) === String(productId));
  if (existingIndex === -1) return [...cart];

  const existingItem = cart[existingIndex];
  if (existingItem.quantity > 1) {
    return cart.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cart.filter((item) => String(item.product.id) !== String(productId));
}

export function calculateTotalCount(cart: readonly CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function calculateTotalPrice(cart: readonly CartItem[]): number {
  return cart.reduce(
    (total, item) => total + item.product.finalPrice * item.quantity,
    0
  );
}
