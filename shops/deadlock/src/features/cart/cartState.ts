import type { CartLine, Product } from "../../types";

export function addToCart(cart: CartLine[], productId: number): CartLine[] {
  const existingLine = cart.find((line) => line.productId === productId);

  if (!existingLine) {
    return [...cart, { productId, quantity: 1 }];
  }

  return cart.map((line) =>
    line.productId === productId
      ? { ...line, quantity: line.quantity + 1 }
      : line,
  );
}

export function removeFromCart(cart: CartLine[], productId: number): CartLine[] {
  return cart.filter((line) => line.productId !== productId);
}

export function cartTotal(cart: CartLine[], products: Product[]): number {
  return cart.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    return total + (product ? product.price * line.quantity : 0);
  }, 0);
}
