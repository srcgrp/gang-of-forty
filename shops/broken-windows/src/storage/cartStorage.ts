import type { CartLine } from "../types.ts";
import { isRecord } from "../api/guards.ts";

const KEY = "sara-market:cart";

export function isCartLine(x: unknown): x is CartLine {
    return (
        isRecord(x) &&
        typeof x.id === "number" &&
        typeof x.name === "string" &&
        typeof x.emoji === "string" &&
        typeof x.unit === "string" &&
        typeof x.price === "number" &&
        x.price >= 0 &&
        typeof x.qty === "number" &&
        Number.isInteger(x.qty) &&
        x.qty > 0
    );
}

export function loadCart(): CartLine[] {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw === null) return [];
        const data: unknown = JSON.parse(raw);
        return Array.isArray(data) ? data.filter(isCartLine) : [];
    } catch {
        return [];
    }
}

export function saveCart(cart: CartLine[]): void {
    try {
        localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
        return;
    }
}