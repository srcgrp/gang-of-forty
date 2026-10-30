import {createEmoji, createLink, dom, el} from './dom';

import type {Category} from '../types';

export function renderCategories(categories: Category[]): void {
    // Cards of the "Categories" section
    dom.categories.replaceChildren(
        ...categories.map((category: Category) => {
            const icon = createEmoji(category.emoji, 'category-icon');
            icon.style.backgroundColor = category.color;

            const link = createLink(
                `#${category.slug}`,
                '',
                'categories-items',
            );
            link.append(icon, category.name);
            return link;
        }),
    );

    // "All categories" dropdown menu
    dom.navCategories.replaceChildren(
        ...categories.map((category: Category) => {
            const li = el('li');
            const link = createLink(`#${category.slug}`);
            link.append(
                createEmoji(category.emoji, 'menu-emoji'),
                category.name,
            );
            li.append(link);
            return li;
        }),
    );

    // Footer links
    dom.footerCategories.append(
        ...categories.map((category: Category) =>
            createLink(`#${category.slug}`, category.name),
        ),
    );
}
