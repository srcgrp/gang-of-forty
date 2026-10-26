import type { FilterState, Offer, Product, StockData } from "../../shared/types";

export function filterProducts(
  products: Product[],
  filters: FilterState,
  stock: StockData,
  offers: Offer[],
  searchIds: Set<number> | null,
): Product[] {
  let result = [...products];

  if (filters.categoryId !== "all") {
    result = result.filter(
      (product) => product.categoryId === Number(filters.categoryId),
    );
  }

  if (filters.stock === "in") {
    result = result.filter((product) => (stock.items[product.id] ?? 0) > 0);
  } else if (filters.stock === "out") {
    result = result.filter((product) => (stock.items[product.id] ?? 0) === 0);
  }

  if (filters.discount === "yes") {
    result = result.filter((product) =>
      offers.some((offer) => offer.productId === product.id),
    );
  }

  if (searchIds) {
    result = result.filter((product) => searchIds.has(product.id));
  }

  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "name":
      return result.sort((a, b) => a.name.localeCompare(b.name, "fa"));
    case "default":
      return result;
  }
}