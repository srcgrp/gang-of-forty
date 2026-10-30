import type { Category, LoadState, Offer, Product, ProductView } from './types';
import {
  fetchCategories,
  fetchHome,
  fetchOffers,
  fetchProducts,
  fetchShop,
  fetchStock,
} from './api/shop-api';
import { renderCarousel } from './ui/carousel';
import { renderCategories } from './ui/categories';
import { createShelf, renderShelf } from './ui/shelves';
import { renderShop } from './ui/layout';
import { buildCarouselSections, renderHomeBanners } from './ui/home';

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
): void => {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) {
    return;
  }

  container.replaceChildren();

  categories.forEach((category) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${category.slug}`;
    link.textContent = `${category.emoji} ${category.name}`;
    li.appendChild(link);
    container.appendChild(li);
  });
};

const start = async (): Promise<void> => {
  showCarousel('#latest-carousel', { status: 'loading' });

  try {
    const [products, offers, stock, categories, shop, home] = await Promise.all([
      fetchProducts(),
      fetchOffers(),
      fetchStock(),
      fetchCategories(),
      fetchShop(),
      fetchHome(),
    ]);

    const offerByProduct = new Map<number, Offer>();
    offers.forEach((offer) => offerByProduct.set(offer.productId, offer));

    const views = products.map((product) =>
      toView(product, offerByProduct, stock.items),
    );

    const newest = [...products]
      .sort((a, b) => b.id - a.id)
      .slice(0, LATEST_COUNT)
      .map((product) => toView(product, offerByProduct, stock.items));

    showCarousel('#latest-carousel', successOrEmpty(newest));

    const categoryList =
      document.querySelector<HTMLElement>('.flex-item-categories');
    if (categoryList) {
      renderCategories(categoryList, categories);
    }
    renderCategoryLinks('#dropdown-menu', categories);

    const shelves = document.querySelector<HTMLElement>('#category-shelves');
    if (shelves) {
      fillShelves(shelves, categories, views);
    }

    renderShop(shop, categories);
    renderHomeBanners(home);

    const carouselsBox = document.querySelector<HTMLElement>('#carousels');
    if (carouselsBox) {
      const slugs = new Set(categories.map((category) => category.slug));
      const sections = buildCarouselSections(
        carouselsBox,
        home.carousels,
        slugs,
      );

      sections.forEach(({ config, element }) => {
        const items =
          config.source === 'offers'
            ? views.filter((view) => view.offer !== undefined)
            : views.filter(
                (view) => view.product.categoryId === config.categoryId,
              );

        renderCarousel(element, successOrEmpty(items));
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'خطای نامشخص';
    showCarousel('#latest-carousel', { status: 'error', message });
  }
};

void start();
