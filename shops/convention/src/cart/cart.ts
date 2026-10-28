import type { CartItem } from "../types";
import { loadCart, saveCart } from "../storage/cart-storage";

let items: CartItem[] = loadCart();

export function getCart(): CartItem[] {
    return items.map((item) => ({ ...item }));
}

export function addToCart(productId: number): void {
    const existing = items.find((item) => item.productId === productId);

    if (existing) {
        items = items.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        items = [...items, { productId, quantity: 1 }];
    }

    saveCart(items);
}

export function removeFromCart(productId: number): void {
    items = items.filter((item) => item.productId !== productId);
    saveCart(items);
}


export function getCartCount(): number {
    return items.reduce((total, item) => total + item.quantity, 0);
}