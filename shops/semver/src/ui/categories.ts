import type { Category } from '../types';

const createCategoryCard = (category: Category): HTMLElement => {
  const card = document.createElement('a');
  card.className = 'item';
  card.href = `#${category.slug}`;
  card.setAttribute('aria-label', `رفتن به دسته ${category.name}`);

  const emoji = document.createElement('span');
  emoji.className = 'category-emoji';
  emoji.textContent = category.emoji;

  const name = document.createElement('p');
  name.textContent = category.name;

  card.append(emoji, name);
  return card;
};

export const renderCategories = (
  container: HTMLElement,
  categories: Category[],
): void => {
  container.replaceChildren();
  categories.forEach((category) => {
    container.appendChild(createCategoryCard(category));
  });
};
