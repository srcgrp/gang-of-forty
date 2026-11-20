const CART_KEY = 'big-o-cart';

// Reads the saved cart count; returns 0 if nothing (or something invalid) is saved,
// or if the browser does not allow reading the storage.
export function loadCartCount(): number {
  try {
    const count = Number(localStorage.getItem(CART_KEY));
    return Number.isInteger(count) && count >= 0 ? count : 0;
  } catch {
    return 0;
  }
}

// Saves the cart count. If the browser does not allow it, the page keeps working
// with the in-memory count (it is just not saved after a reload).
export function saveCartCount(count: number): void {
  try {
    localStorage.setItem(CART_KEY, String(count));
  } catch {
    console.warn('Cart count could not be saved.');
  }
}