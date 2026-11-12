import type { CartItem, ProductView } from '../../types';

export const reconcileCart = (items: CartItem[], products: ProductView[]): CartItem[] =>
  items.flatMap((item): CartItem[] => {
    const product = products.find((entry) => entry.id === item.id);
    return product && product.stock > 0
      ? [{ id: item.id, quantity: Math.min(item.quantity, product.stock) }] : [];
  });
export const setQuantity = (items: CartItem[], product: ProductView, quantity: number): CartItem[] => {
  if (!Number.isSafeInteger(quantity)) return items;
  const next = items.filter((item) => item.id !== product.id);
  const clamped = Math.max(0, Math.min(quantity, product.stock));
  return clamped > 0 ? [...next, { id: product.id, quantity: clamped }] : next;
};
export const cartCount = (items: CartItem[]): number => items.reduce((sum, item) => sum + item.quantity, 0);
