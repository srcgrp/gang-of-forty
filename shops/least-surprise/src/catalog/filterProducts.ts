
import type { ProductWithDetails } from '../types';

export function filterProducts(
  products: readonly ProductWithDetails[],
  category: string,
  query: string
): ProductWithDetails[] {
  const searchText = query.trim().toLocaleLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      category === 'all' ||
      product.category.trim() === category.trim();

    const matchesQuery =
      product.title.toLocaleLowerCase().includes(searchText);

    return matchesCategory && matchesQuery;
  });
}
