import type { CardView } from "../types.ts";
import { createAddButton } from "./addButton.ts";
import { createCardPrices } from "./cardPrices.ts";
import { formatNumber } from "./format.ts";

function createBadge(className: string, text: string): HTMLSpanElement {
    const badge: HTMLSpanElement = document.createElement("span");
    badge.className = className;
    badge.textContent = text;
    return badge;
}

function createImageBox(view: CardView): HTMLDivElement {
    const box: HTMLDivElement = document.createElement("div");
    box.className = "special-offer-image";

    const emoji: HTMLSpanElement = document.createElement("span");
    emoji.className = "special-offer-emoji";
    emoji.textContent = view.emoji;
    box.append(emoji);

    if (view.unavailable) {
        box.append(createBadge("unavailable-badge", "ناموجود"));
    } else if (view.percent !== undefined) {
        box.append(createBadge("discount-badge", formatNumber(view.percent) + "٪"));
    }
    return box;
}

export function createProductCard(view: CardView): HTMLDivElement {
    const card: HTMLDivElement = document.createElement("div");
    card.className = "special-offer-item";
    if (view.unavailable) {
        card.classList.add("unavailable");
    }

    const name: HTMLHeadingElement = document.createElement("h3");
    name.className = "special-offer-name";
    name.textContent = view.name;

    const unit: HTMLParagraphElement = document.createElement("p");
    unit.className = "special-offer-unit";
    unit.textContent = view.unit;

    const details: HTMLDivElement = document.createElement("div");
    details.className = "special-offer-item-details";
    details.append(createCardPrices(view), createAddButton(view.name, view.unavailable));

    card.append(createImageBox(view), name, unit, details);
    return card;
}