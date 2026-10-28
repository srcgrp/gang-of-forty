import type { Category } from "../types.ts";
import { createCategoryTile } from "./categoryTile.ts";
import type { PageElements } from "./page.ts";

function createCategoryListItem(
    category: Category,
    withEmoji: boolean,
    className?: string
): HTMLLIElement {
    const item: HTMLLIElement = document.createElement("li");
    if (className) {
        item.className = className;
    }

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = "#" + category.slug;

    if (withEmoji) {
        const emoji: HTMLSpanElement = document.createElement("span");
        emoji.className = "dropdown-emoji";
        emoji.textContent = category.emoji;
        link.append(emoji, " " + category.name);
    } else {
        link.textContent = category.name;
    }

    item.append(link);
    return item;
}

export function renderCategories(categories: Category[], els: PageElements): void {
    els.categoriesGrid.replaceChildren(...categories.map(createCategoryTile));
    els.menuList.replaceChildren(
        ...categories.map((category: Category): HTMLLIElement => createCategoryListItem(category, true))
    );
    els.footerList.replaceChildren(
        ...categories.map(
            (category: Category): HTMLLIElement =>
                createCategoryListItem(category, false, "footer-top-categories-list-item")
        )
    );
}