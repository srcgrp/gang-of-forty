import type { CartItem } from "../types";

const STORAGE_KEY = "convention-cart";

export function loadCart(): CartItem[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const data: unknown = JSON.parse(saved);

        if (!Array.isArray(data)) {
            return [];
        }

        return data.filter(isCartItem);
    } catch {
        return [];
    }
}

export function saveCart(items: CartItem[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        return;
    }
}

function isCartItem(value: unknown): value is CartItem {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    if (!("productId" in value) || !("quantity" in value)) return false;
    const item = value;

    return (
        typeof item.productId === "number" &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.productId) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
}