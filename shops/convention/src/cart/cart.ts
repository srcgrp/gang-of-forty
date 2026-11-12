
import type { CartItem } from "../types";

export function addToCart(
    cart: CartItem[],
    productId: number
): CartItem[] {
    const existing = cart.find(
        (item) => item.productId === productId
    );

    if (existing) {
        return cart.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }

    return [...cart, { productId, quantity: 1 }];
}

export function removeFromCart(
    cart: CartItem[],
    productId: number
): CartItem[] {
    return cart.filter(
        (item) => item.productId !== productId
    );
}

export function getCartCount(cart: CartItem[]): number {
    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}
