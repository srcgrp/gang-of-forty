import type {Cart} from '../types';

const CART_KEY = 'cart';

function isCart(value: unknown): value is Cart {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    return Object.values(value).every(
        (quantity: unknown): boolean => typeof quantity === 'number',
    );
}

export function loadCart(): Cart {
    try {
        const saved = localStorage.getItem(CART_KEY);
        if (saved === null) return {};

        const parsed: unknown = JSON.parse(saved);
        return isCart(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

export function saveCart(cart: Cart): void {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        // Cart remains available in memory until the page is closed.
    }
}
