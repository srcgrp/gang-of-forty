import type { Link } from "../types";

export function createLinkItem(label: string, href: string): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li");
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = href;
    link.textContent = label;
    li.append(link);
    return li;
}

export function createArrowLink(
    href: string,
    arrow: string,
    hiddenText: string
): HTMLAnchorElement {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = href;

    const arrowSpan: HTMLElement = document.createElement("span");
    arrowSpan.setAttribute("aria-hidden", "true");
    arrowSpan.textContent = arrow;

    const textSpan: HTMLElement = document.createElement("span");
    textSpan.classList.add("visually-hidden");
    textSpan.textContent = hiddenText;

    link.append(arrowSpan, " ", textSpan);
    return link;
}

export function renderLinks(list: HTMLElement, items: Link[]): void {
    items.forEach(item => {
        list.append(createLinkItem(item.label, item.href));
    });
}