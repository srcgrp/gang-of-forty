import type { Category } from '../types';

export const renderCategories = (
  container: HTMLElement,
  categories: Category[],
): void => {
  categories.forEach((category) => {
    const item: HTMLElement = document.createElement('section');
    item.className = 'item';

    const emoji: HTMLElement = document.createElement('span');
    emoji.className = 'category-emoji';
    emoji.style.setProperty('--tint', category.color);
    emoji.textContent = category.emoji;

    const name: HTMLElement = document.createElement('p');
    name.textContent = category.name;

    item.appendChild(emoji);
    item.appendChild(name);
    container.appendChild(item);
  });
};
