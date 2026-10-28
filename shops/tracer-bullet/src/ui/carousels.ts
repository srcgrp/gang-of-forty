import type { Carousel } from "../types";
import { createArrowLink } from "./links";
import { renderProductCards } from "./product-card-list";

export function createCarouselSection(
    def: Carousel
): { section: HTMLElement; list: HTMLUListElement } {
    const section: HTMLElement = document.createElement("section");
    section.id = def.id;
    section.setAttribute("aria-labelledby", `${def.id}-title`);

    const head: HTMLElement = document.createElement("div");
    head.classList.add("section-head");

    const heading: HTMLElement = document.createElement("h2");
    heading.id = `${def.id}-title`;

    const emoji: HTMLElement = document.createElement("span");
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = def.emoji;

    heading.append(emoji, " ", def.title);

    const nav: HTMLElement = document.createElement("div");
    nav.classList.add("carousel-nav");

    nav.append(
        createArrowLink(
            `#${def.id}-first`,
            "→",
            `رفتن به ابتدای ${def.title}`
        ),
        createArrowLink(
            `#${def.id}-last`,
            "←",
            `رفتن به انتهای ${def.title}`
        )
    );

    const list: HTMLUListElement = document.createElement("ul");
    list.classList.add("carousel");

    head.append(heading, nav);
    section.append(head, list);

    return { section, list };
}

export { renderProductCards };