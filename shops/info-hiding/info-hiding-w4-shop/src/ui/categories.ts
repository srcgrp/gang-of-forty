import type { Category } from '../types';

export const renderCategories = (categories: Category[], selected: number | null): void => {
    const list = document.querySelector<HTMLElement>('#category-filters');
    if (!list) throw new Error('Category filters are missing');
    const hadFocus = list.contains(document.activeElement);
    list.replaceChildren();
    const all: Category = { id: 0, name: 'همهٔ کالاها', slug: 'all', emoji: '🛍️' };
    [all, ...categories].forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.category = category.id === 0 ? '' : String(category.id);
        button.textContent = category.emoji + ' ' + category.name;
        button.setAttribute('aria-pressed', String(selected === category.id || (selected === null && category.id === 0)));
        list.append(button);
    });
    if (hadFocus) list.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
};
