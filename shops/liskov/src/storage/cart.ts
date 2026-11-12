import type {CartLine} from '../types';

const CART_KEY = 'cart';

function isCartLine(value: unknown): value is CartLine {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        'productId' in value &&
        typeof value.productId === 'number' &&
        'quantity' in value &&
        typeof value.quantity === 'number'
    );
}

function isCart(value: unknown): value is CartLine[] {
    return Array.isArray(value) && value.every(isCartLine);
}

export function loadCart(): CartLine[] {
    try {
        const saved = localStorage.getItem(CART_KEY);
        if (saved === null) return [];

        const parsed: unknown = JSON.parse(saved);
        return isCart(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveCart(cart: CartLine[]): void {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        // Cart remains available in memory until the page is closed.
    }
}
