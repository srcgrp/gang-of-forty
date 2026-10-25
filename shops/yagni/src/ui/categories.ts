import type { Categories } from '../types';
export function renderCategories(container: HTMLElement, categories: Categories): void {
  const fragment = document.createDocumentFragment();
  categories.forEach((category) => {
    const card = document.createElement('a'); card.className = 'category-card'; card.href = `#${category.slug}`;
    const emoji = document.createElement('span'); emoji.className = 'category-card__image'; emoji.textContent = category.emoji; emoji.style.backgroundColor = category.color;
    const title = document.createElement('span'); title.className = 'category-card__title'; title.textContent = category.name;
    card.append(emoji, title); fragment.append(card);
  });
  container.replaceChildren(fragment);
}
