const CART_KEY = 'big-o-cart';

// Reads the saved cart count; returns 0 if nothing (or something invalid) is saved
export function loadCartCount(): number {
    const count = Number(localStorage.getItem(CART_KEY));
    return Number.isNaN(count) ? 0 : count;
}

// Saves the cart count
export function saveCartCount(count: number): void {
    localStorage.setItem(CART_KEY, String(count));
}