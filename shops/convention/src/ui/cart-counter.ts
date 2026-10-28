import { getCartCount } from "../cart/cart";

export function updateCartCounter(): void {
    const counter = document.querySelector<HTMLElement>(".cart-count");

    if (!counter) {
        return;
    }

    counter.textContent = String(getCartCount());
}
