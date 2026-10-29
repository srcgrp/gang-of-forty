import type { Category, ProductView } from '../types';
import { createProductCard } from './product-card';

export const createShelf = (category: Category): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'category-shelf';
  section.id = category.slug;

  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = `${category.emoji} ${category.name}`;

  const carousel = document.createElement('article');
  carousel.className = 'flex-item-product';
  carousel.dataset.slug = category.slug;

  const loading = document.createElement('p');
  loading.className = 'loading-state';
  loading.textContent = 'در حال بارگذاری محصولات...';

  const error = document.createElement('p');
  error.className = 'error-state';
  error.hidden = true;
  error.textContent = 'خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.';

  carousel.append(loading, error);
  section.append(title, carousel);
  return section;
};

export const renderShelf = (
  container: HTMLElement,
  category: Category,
  items: ProductView[],
): void => {
  const shelf = container.querySelector<HTMLElement>(`#${category.slug}`);

  if (!shelf) return;
  const carousel = shelf.querySelector<HTMLElement>('.flex-item-product');
  if (!carousel) return;

  carousel.replaceChildren();
  items.forEach((item) => {
    carousel.appendChild(createProductCard(item));
  });
};
