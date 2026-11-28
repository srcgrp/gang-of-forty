import type {Product} from '../types';

export type ProductSort = 'default' | 'price';

export function sortProducts(
    products: Product[],
    sort: ProductSort,
): Product[] {
    if (sort === 'default') {
        return products;
    }

    return [...products].sort((first, second) => {
        return first.price - second.price;
    });
}
