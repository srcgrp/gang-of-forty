const ICON_URL = 'https://api.iconify.design/mdi/';

function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (!element) {
        throw new Error(`index.html is missing an element: ${selector}`);
    }

    return element;
}

export const dom = {
    main: getElement<HTMLElement>('#main'),
    topBarText: getElement<HTMLParagraphElement>('#top-bar-text'),
    mainMenu: getElement<HTMLUListElement>('#main-menu'),
    navCategories: getElement<HTMLUListElement>('#nav-categories'),
    search: getElement<HTMLInputElement>('#search'),
    cart: getElement<HTMLButtonElement>('#cart'),
    cartCount: getElement<HTMLSpanElement>('#cart-count'),
    banners: getElement<HTMLDivElement>('#banners'),
    categories: getElement<HTMLDivElement>('#categories'),
    carousels: getElement<HTMLDivElement>('#carousels'),
    footerAbout: getElement<HTMLDivElement>('#footer-about'),
    footerCategories: getElement<HTMLElement>('#footer-categories'),
    footerHelp: getElement<HTMLElement>('#footer-help'),
    footerSchedule: getElement<HTMLDivElement>('#footer-schedule'),
    copyright: getElement<HTMLParagraphElement>('#copyright'),
};

export function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
    text?: string,
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

export function createLink(
    href: string,
    text?: string,
    className?: string,
): HTMLAnchorElement {
    const link = el('a', className, text);
    link.href = href;
    return link;
}

export function createIcon(name: string, color?: string): HTMLImageElement {
    const img = el('img', 'icon');
    img.src = `${ICON_URL}${name}.svg${color ? `?color=${color}` : ''}`;
    img.alt = '';
    return img;
}

export function createEmoji(emoji: string, className: string): HTMLSpanElement {
    const span = el('span', className, emoji);
    span.setAttribute('aria-hidden', 'true');
    return span;
}
