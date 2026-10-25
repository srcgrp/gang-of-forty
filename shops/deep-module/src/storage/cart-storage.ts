const CART_KEY = "supermarket_cart";

export function readCartRaw(): unknown {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeCartRaw(items: unknown): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
}

export function clearCartStorage(): void {
  try {
    localStorage.removeItem(CART_KEY);
  } catch {
    // ignore
  }
}