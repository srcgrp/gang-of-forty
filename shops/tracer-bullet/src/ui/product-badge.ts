import { formatNumber } from "./formatting";

export function createProductBadge(
    text: string,
    percent?: number
): HTMLParagraphElement {
    const badge = document.createElement("p");
    badge.classList.add("badge");

    if (percent !== undefined) {
        const hidden = document.createElement("span");
        hidden.classList.add("visually-hidden");
        hidden.textContent = text;
        badge.append(hidden, " ", `${formatNumber(percent)}٪`);
    } else {
        badge.textContent = text;
    }

    return badge;
}