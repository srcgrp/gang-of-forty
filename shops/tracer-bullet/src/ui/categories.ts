import type { Category } from "../types";

export function createCategoryItem(category: Category): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li");

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = `#${category.slug}`;

    const icon: HTMLElement = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.emoji;
    icon.style.background = category.color;

    link.append(icon, " ", category.name);
    li.append(link);

    return li;
}

export function renderCategories(
    list: HTMLElement,
    categories: Category[]
): void {
    list.replaceChildren();

    categories.forEach(category => {
        list.append(createCategoryItem(category));
    });
}

export function createCategoryLink(category: Category): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li");

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;

    li.append(link);

    return li;
}

export function renderCategoryLinks(
    list: HTMLElement,
    categories: Category[]
): void {
    list.replaceChildren();

    categories.forEach(category => {
        list.append(createCategoryLink(category));
    });
}