function getDom() {
    const list = document.querySelector<HTMLUListElement>('#dairy-list');
    const carousel = document.querySelector<HTMLElement>('#dairy-carousel');
    const statusBox = document.querySelector<HTMLElement>('#dairy-status');
    const firstBtn = document.querySelector<HTMLAnchorElement>('#dairy-first');
    const lastBtn = document.querySelector<HTMLAnchorElement>('#dairy-last');
    const cartCount = document.querySelector<HTMLElement>('#cart-count');

    if (!list || !carousel || !statusBox || !firstBtn || !lastBtn || !cartCount) {
        throw new Error('index.html is missing an element');
    }
    return { list, carousel, statusBox, firstBtn, lastBtn, cartCount };
}

export const dom = getDom();

export function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string | null,
    text?: string
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}