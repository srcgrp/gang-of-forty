import type {Product} from '../types';

export function filterProducts(
    products: Product[],
    categoryId: number | null,
    query: string,
): Product[] {
    const normalizedQuery = query.trim().toLocaleLowerCase('fa-IR');

    return products.filter((product) => {
        const matchesCategory =
            categoryId === null || product.categoryId === categoryId;

        const matchesQuery = product.name
            .toLocaleLowerCase('fa-IR')
            .includes(normalizedQuery);

        return matchesCategory && matchesQuery;
    });
}
