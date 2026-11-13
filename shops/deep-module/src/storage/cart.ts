import type { CartLine } from "../types";

const KEY = "cart";

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartLine => {
      if (typeof item !== "object" || item === null) return false;
      const c = item as Record<string, unknown>;
      return (
        typeof c.id === "number" &&
        typeof c.name === "string" &&
        typeof c.price === "number" &&
        typeof c.quantity === "number"
      );
    });
  } catch {
    return [];
  }
}

export function saveCart(cart: CartLine[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {
    /* ignore */
  }
}
