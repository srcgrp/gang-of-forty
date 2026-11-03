import type { Banner, Promo } from "../types";

export function renderPromos(
    container: HTMLElement,
    promos: Promo[]
): void {
    container.replaceChildren();

    promos.forEach(promo => {
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = promo.href;

        const emoji: HTMLElement = document.createElement("span");
        emoji.setAttribute("aria-hidden", "true");
        emoji.textContent = promo.emoji;

        link.append(promo.text, " ", emoji);
        container.append(link);
    });
}

export function renderBanner(
    section: HTMLElement,
    banner: Banner
): void {
    const title = section.querySelector<HTMLElement>("h2");
    const text = section.querySelector<HTMLParagraphElement>("p");
    const link = section.querySelector<HTMLAnchorElement>("a");

    if (!title || !text || !link) {
        throw new Error("missing elements");
    }

    const emoji: HTMLElement = document.createElement("span");
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = banner.emoji;

    title.textContent = banner.title;
    title.append(" ", emoji);
    text.textContent = banner.text;
    link.textContent = banner.cta.label;
    link.href = banner.cta.href;
}