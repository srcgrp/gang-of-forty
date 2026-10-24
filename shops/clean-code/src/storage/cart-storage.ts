const KEY = "cartCount";

export function loadCart(): number {
  return Number(localStorage.getItem(KEY)) || 0;
}

export function saveCart(count: number): void {
  localStorage.setItem(KEY, String(count));
}
