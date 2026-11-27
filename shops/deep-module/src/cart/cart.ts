import type { CartLine, Product } from "../types";

export function addLine(items: CartLine[], product: Product): CartLine[] {
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    return items.map((i) =>
      i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
    );
  }
  return [
    ...items,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      emoji: product.emoji,
    },
  ];
}

export function incLine(items: CartLine[], id: number): CartLine[] {
  return items.map((i) =>
    i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
  );
}

export function decLine(items: CartLine[], id: number): CartLine[] {
  const item = items.find((i) => i.id === id);
  if (!item) return items;
  if (item.quantity <= 1) return items.filter((i) => i.id !== id);
  return items.map((i) =>
    i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
  );
}

export function removeLine(items: CartLine[], id: number): CartLine[] {
  return items.filter((i) => i.id !== id);
}

export function cartCount(items: CartLine[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: CartLine[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
