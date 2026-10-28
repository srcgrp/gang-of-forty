import type { Cart, CartItem, Product } from "../types";
export function addProduct(cart: Cart, product: Product, price: number): Cart {
  const existing = cart.find((item) => item.productId === product.id);
  if (existing)
    return cart.map((item) =>
      item.productId === product.id
        ? { ...item, quantity: item.quantity + 1, price }
        : item,
    );
  const item: CartItem = {
    productId: product.id,
    name: product.name,
    price,
    quantity: 1,
  };
  return [...cart, item];
}
export function countCartItems(cart: Cart): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
export function totalCartPrice(cart: Cart): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function addToCart(
  cart: Cart,
  product: Product,
  price = product.price,
): Cart {
  return addProduct(cart, product, price);
}
export function removeFromCart(cart: Cart, productId: number): Cart {
  return cart.filter((item) => item.productId !== productId);
}
export const cartCount = countCartItems;
export const cartTotal = totalCartPrice;
export function cartRows(cart: Cart): CartItem[] {
  return cart.slice();
}
export function formatPrice(price: number): string {
  return `${price.toLocaleString("fa-IR")} تومان`;
}
