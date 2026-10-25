import type { CartItem, Product } from "../types";

export function addProduct(
  cart: CartItem[],
  product: Product,
  available: number,
): { cart: CartItem[]; added: boolean } {
  const existing = cart.find((item) => item.id === product.id);
  const current = existing?.quantity ?? 0;
  if (current >= available || current >= 99) {
    return { cart, added: false };
  }
  if (existing) {
    return {
      cart: cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
      added: true,
    };
  }
  return {
    cart: [
      ...cart,
      {
        id: product.id,
        name: product.name,
        emoji: product.emoji ?? "📦",
        unit: product.unit ?? "",
        price: product.price,
        quantity: 1,
      },
    ],
    added: true,
  };
}

export function removeItem(cart: CartItem[], id: number): CartItem[] {
  return cart.filter((item) => item.id !== id);
}

export function decreaseQuantity(cart: CartItem[], id: number): CartItem[] {
  const item = cart.find((i) => i.id === id);
  if (!item) return cart;
  if (item.quantity <= 1) return removeItem(cart, id);
  return cart.map((i) =>
    i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
  );
}

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
