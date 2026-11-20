import type { Catalog, LoadState, Product } from '../types.ts';

export function catalogProducts(state: LoadState<Catalog>): Product[] {
    return state.status === 'success' ? state.data.products : [];
}

export function productsByCategory(products: Product[], categoryId: number | null): Product[] {
    return categoryId === null
        ? products
        : products.filter((p) => p.categoryId === categoryId);
}