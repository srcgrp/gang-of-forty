import type { PageElements } from "./page.ts";

export function showMessage(container: HTMLElement, text: string): void {
    const p: HTMLParagraphElement = document.createElement("p");
    p.textContent = text;
    container.replaceChildren(p);
}

export function showStatus(
    els: PageElements,
    productsText: string,
    categoriesText: string = productsText
): void {
    showMessage(els.offers, productsText);
    showMessage(els.snacks, productsText);
    showMessage(els.categoriesGrid, categoriesText);
}