const CART_COUNT_KEY = "cartCount";

export function loadCartCount(): number {
  const savedCount = localStorage.getItem(CART_COUNT_KEY);
  const count = Number(savedCount);

  return savedCount !== null && Number.isFinite(count) && count >= 0
    ? count
    : 0;
}

export function saveCartCount(count: number): void {
  localStorage.setItem(CART_COUNT_KEY, String(count));
}