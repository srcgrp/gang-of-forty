import type { LoadState } from './types';
import { fetchCategories, fetchProducts } from './api/shop-api';
import { renderCarousel } from './ui/carousel';
import { renderCategories } from './ui/categories';

const DAIRY_ID = 7;

const showCarousel = (selector: string, state: LoadState): void => {
  const carousel = document.querySelector<HTMLElement>(selector);
  if (carousel) {
    renderCarousel(carousel, state);
  }
};

const loadDiscounted = async (): Promise<void> => {
  showCarousel('#discounted-carousel', { status: 'loading' });
  try {
    const products = await fetchProducts();
    const dairy = products.filter((product) => product.categoryId === DAIRY_ID);
    if (dairy.length === 0) {
      showCarousel('#discounted-carousel', { status: 'empty' });
    } else {
      showCarousel('#discounted-carousel', { status: 'success', products: dairy });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'خطای ناشناخته';
    showCarousel('#discounted-carousel', { status: 'error', message });
  }
};

const loadCategories = async (): Promise<void> => {
  const container = document.querySelector<HTMLElement>('.flex-item-categories');
  if (!container) return;
  try {
    const categories = await fetchCategories();
    renderCategories(container, categories);
  } catch (error) {
    console.error(error);
  }
};

const start = async (): Promise<void> => {
  await Promise.all([loadDiscounted(), loadCategories()]);
};

start();
