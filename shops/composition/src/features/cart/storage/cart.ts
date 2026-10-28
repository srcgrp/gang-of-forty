export function loadCartCount(): number {
  try {
    const count = Number(localStorage.getItem("batshop-cart-count"));
    if (Number.isSafeInteger(count) && count >= 0) return count;
  } catch { return 0; }
  return 0;
}
export function saveCartCount(count: number): boolean {
  try {
    localStorage.setItem("batshop-cart-count", String(count));
    return true;
  } catch { return false; }
}
