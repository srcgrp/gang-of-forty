import { formatNumber } from "./formatting";

export function renderCartCount(cartCount: number): void {
    const cartCountEl = document.querySelector<HTMLElement>(".cartCount");
    const cartCountTextEl = document.querySelector<HTMLElement>(".cartCountText");

    if (!cartCountEl || !cartCountTextEl) {
        throw new Error("missing cart elements");
    }

    cartCountEl.textContent = formatNumber(cartCount);
    cartCountTextEl.textContent = `${formatNumber(cartCount)} کالا در سبد`;
}