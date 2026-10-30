import type { CatalogQuery, CatalogView, Carousel, CarouselView, Category, ProductView } from '../../types';

const normalize = (value: string): string => value.trim().toLocaleLowerCase('fa-IR')
  .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200c\s]+/g, ' ');
export const selectProducts = (products: ProductView[], query: CatalogQuery, categoryId?: number): ProductView[] => {
  const term = normalize(query.search);
  return products.filter((product) =>
    (categoryId === undefined || product.categoryId === categoryId)
    && (!term || normalize(`${product.name} ${product.tags.join(' ')}`).includes(term)));
};
export const selectCarousel = (products: ProductView[], carousel: Carousel): ProductView[] =>
  carousel.source === 'offers'
    ? products.filter((product) => product.percent > 0)
    : products.filter((product) => product.categoryId === carousel.categoryId);
export const selectCatalog = (products: ProductView[], categories: Category[], query: CatalogQuery): CatalogView => {
  const category = categories.find((entry) => entry.slug === query.category);
  return { query, category, active: Boolean(query.category || query.search),
    products: query.category && !category ? [] : selectProducts(products, query, category?.id) };
};
export const selectCategoryShelf = (products: ProductView[], categories: Category[], slug: string): CarouselView | undefined => {
  const category = categories.find((entry) => entry.slug === slug);
  return category ? { id: category.slug, title: category.name, emoji: category.emoji, categoryId: category.id,
    products: products.filter((product) => product.categoryId === category.id) } : undefined;
};
export const selectShelves = (products: ProductView[], carousels: Carousel[]): CarouselView[] =>
  carousels.map((carousel) => ({ ...carousel, products: selectCarousel(products, carousel) }));
