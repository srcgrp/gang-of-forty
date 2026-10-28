import type { Category } from "../types.ts";

export function createCategoryTile(category: Category): HTMLDivElement {
    const tile: HTMLDivElement = document.createElement("div");
    tile.className = "items";

    const link: HTMLAnchorElement = document.createElement("a");
    link.className = "items-link";
    link.href = "#" + category.slug;

    const icon: HTMLSpanElement = document.createElement("span");
    icon.className = "items-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.emoji;
    icon.style.backgroundColor = category.color;

    const title: HTMLParagraphElement = document.createElement("p");
    title.className = "items-title";
    title.textContent = category.name;

    link.append(icon, title);
    tile.append(link);
    return tile;
}