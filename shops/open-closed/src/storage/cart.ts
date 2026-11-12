import { CART_STORAGE_KEY } from '../types.ts';
import type { Cart, CartItem } from '../types.ts';

function isCartItem(x: unknown): x is CartItem {
    return (
        typeof x === 'object' &&
        x !== null &&
        'productId' in x && typeof x.productId === 'number' &&
        'quantity' in x && typeof x.quantity === 'number' &&
        Number.isInteger(x.quantity) &&
        x.quantity > 0
    );
}

export function loadCart(): Cart {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (raw === null) return [];
        const data: unknown = JSON.parse(raw);
        return Array.isArray(data) ? data.filter(isCartItem) : [];
    } catch {
        return [];
    }
}

export function saveCart(cart: Cart): void {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err: unknown) {
        console.warn('ذخیرهٔ سبد ناموفق بود:', err);
    }
}