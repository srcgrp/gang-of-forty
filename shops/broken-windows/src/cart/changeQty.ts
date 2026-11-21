import type { CartLine } from "../types.ts";

export function changeQty(cart: CartLine[], id: number, delta: number): CartLine[] {
    return cart
        .map((line) => (line.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0);
}