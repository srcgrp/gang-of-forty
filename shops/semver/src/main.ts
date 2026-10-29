import type { Category, LoadState, Offer, Product, ProductView } from './types';
import {
  fetchCategories,
  fetchOffers,
  fetchProducts,
  fetchShop,
  fetchStock,
} from './api/shop-api';
import { renderCarousel } from './ui/carousel';
import { renderCategories } from './ui/categories';
import { createShelf, renderShelf } from './ui/shelves';
import { renderShop } from './ui/layout';

const DAIRY_ID = 2;
const LATEST_COUNT = 8;

const showCarousel = (selector: string, state: LoadState): void => {
  const carousel = document.querySelector<HTMLElement>(selector);
  if (carousel) {
    renderCarousel(carousel, state);
  }
};

const toView = (
  product: Product,
  offerByProduct: Map<number, Offer>,
  stockItems: Record<string, number>,
): ProductView => {
  const view: ProductView = { product };

  const offer = offerByProduct.get(product.id);
  if (offer) {
    view.offer = offer;
  }

  const stock = stockItems[String(product.id)];
  if (stock !== undefined) {
    view.stock = stock;
  }

  return view;
};

const successOrEmpty = (items: ProductView[]): LoadState =>
  items.length > 0
    ? { status: 'success', products: items }
    : { status: 'empty' };

const fillShelves = (
  container: HTMLElement,
  categories: Category[],
  views: ProductView[],
): void => {
  container.replaceChildren();
  categories.forEach((category) => {
    container.appendChild(createShelf(category));
    const items = views.filter(
      (view) => view.product.categoryId === category.id,
    );
    renderShelf(container, category, items);
  });
};

const renderCategoryLinks = (
  containerSelector: string,
  categories: Category[],
  withPrefix: boolean,
): void => {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;
  container.replaceChildren();
  categories.forEach((category) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${category.slug}`;
    link.textContent = withPrefix
      ? `${category.emoji} ${category.name}`
      : category.name;
    item.appendChild(link);
    container.appendChild(item);
  });
};

const start = async (): Promise<void> => {
  showCarousel('#offers-carousel', { status: 'loading' });
  showCarousel('#discounted-carousel', { status: 'loading' });
  showCarousel('#latest-carousel', { status: 'loading' });

  try {
    const [products, offers, stock, categories, shop] = await Promise.all([
      fetchProducts(),
      fetchOffers(),
      fetchStock(),
      fetchCategories(),
      fetchShop(),
    ]);

    const offerByProduct = new Map<number, Offer>();
    offers.forEach((offer) => {
      offerByProduct.set(offer.productId, offer);
    });

    const views = products.map((product) =>
      toView(product, offerByProduct, stock.items),
    );

    const offerViews = views.filter((view) => view.offer);
    const dairyViews = views.filter(
      (view) => view.product.categoryId === DAIRY_ID,
    );
    const latestViews = [...views]
      .sort((first, second) => second.product.id - first.product.id)
      .slice(0, LATEST_COUNT);

    showCarousel('#offers-carousel', successOrEmpty(offerViews));
    showCarousel('#discounted-carousel', successOrEmpty(dairyViews));
    showCarousel('#latest-carousel', successOrEmpty(latestViews));

    const shelfContainer = document.querySelector<HTMLElement>(
      '#category-shelves',
    );
    if (shelfContainer) {
      fillShelves(shelfContainer, categories, views);
    }

    const categoryList = document.querySelector<HTMLElement>(
      '.flex-item-categories',
    );
    if (categoryList) {
      renderCategories(categoryList, categories);
    }

    renderCategoryLinks('#dropdown-menu', categories, true);
    renderShop(shop, categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'خطای ناشناخته';
    showCarousel('#offers-carousel', { status: 'error', message });
    showCarousel('#discounted-carousel', { status: 'error', message });
    showCarousel('#latest-carousel', { status: 'error', message });
  }
};

start();
