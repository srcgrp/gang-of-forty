import type { Cart } from '../types.ts';

export function addItem(cart: Cart, productId: number): Cart {
    const exists = cart.some((item) => item.productId === productId);
    if (!exists) return [...cart, { productId, quantity: 1 }];

    return cart.map((item) =>
        item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );
}

export function totalQuantity(cart: Cart): number {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}