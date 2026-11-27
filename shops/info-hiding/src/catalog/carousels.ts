import type { Catalog, Carousel, Product } from '../types';
export const findCarousel = (catalog: Catalog, id: string): Carousel | null => {
    const carousel = catalog.home.carousels.find(item => item.id === id);
    if (carousel) return carousel;
    const category = catalog.categories.find(item => item.slug === id);
    return category ? { id: category.slug, title: category.name,
        emoji: category.emoji, categoryId: category.id } : null;
};
export const carouselProducts = (catalog: Catalog, id: string): Product[] | null => {
    const carousel = findCarousel(catalog, id);
    if (!carousel) return null;
    return carousel.source === 'offers'
        ? catalog.products.filter(product => catalog.offers.some(offer => offer.productId === product.id))
        : catalog.products.filter(product => product.categoryId === carousel.categoryId);
};
