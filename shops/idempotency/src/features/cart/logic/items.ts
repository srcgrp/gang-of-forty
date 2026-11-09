
import type {
  Product,
  CartItem,
} from "../../../shared/types/products";

export function addCartItem(
  cart: CartItem[],
  product: Product,
): CartItem[] {
  const existing = cart.find(
    (item) => item.id === product.id,
  );

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [
    ...cart,
    {
      id: product.id,
      price: product.price,
      quantity: 1,
    },
  ];
}

export function decreaseCartItem(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart
    .filter(
      (item) =>
        item.id !== productId || item.quantity > 1,
    )
    .map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
}

export function removeCartItem(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart.filter(
    (item) => item.id !== productId,
  );
}

export function getCartCount(
  cart: CartItem[],
): number {
  return cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );
}

export function getCartSubtotal(
  cart: CartItem[],
): number {
  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );
}

export function clearCart(): CartItem[] {
  return [];
}

export function increaseCartItem(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart.map((item) =>
    item.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
}

export function canIncreaseCartItem(
  cart: CartItem[],
  productId: number,
  availableStock: number,
): boolean {
  const currentQuantity =
    cart.find((item) => item.id === productId)?.quantity ?? 0;

  return currentQuantity < availableStock;
}