import type { Product, Offer, Filters, Sort } from '../types';
import { SORTS } from '../types';
import { finalPrice } from './pricing';

export const parseSort = (value: string): Sort =>
    SORTS.find(sort => sort === value) ?? 'default';

export const visibleProducts = (
    products: Product[], filters: Filters, offers: Offer[]
): Product[] => {
    const query = filters.query.trim().toLocaleLowerCase('fa-IR');
    const result = products.filter(product =>
        (filters.categoryId === null || product.categoryId === filters.categoryId) &&
        product.name.toLocaleLowerCase('fa-IR').includes(query)
    );
    if (filters.sort === 'default') return result;
    const price = (product: Product): number =>
        finalPrice(product, offers.find(offer => offer.productId === product.id));
    return result.sort((a, b) => filters.sort === 'price-asc' ? price(a) - price(b) : price(b) - price(a));
};
