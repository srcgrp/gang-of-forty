import type { Catalog, Product } from "../types"
import { filterProductsByCategoryID, filterSpecialProducts } from "./filters"

// Returns the products of one list (a home carousel or a category slug).
// null means "no list with this id", [] means "the list exists but is empty"
export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
  const carousel = catalog.carousels.find((item) => item.id === carouselId)
  if (carousel === undefined) {
    const category = catalog.categories.find((item) => item.slug === carouselId)
    if (category === undefined) return null
    return filterProductsByCategoryID(category.id, catalog.products)
  }
  if ("source" in carousel) {
    return filterSpecialProducts(catalog.offeredProducts, catalog.products, catalog.stock)
  }
  return filterProductsByCategoryID(carousel.categoryId, catalog.products)
}

// Returns the page title for a list id, or null when the id is unknown
export function carouselTitle(catalog: Catalog, carouselId: string): string | null {
  const carousel = catalog.carousels.find((item) => item.id === carouselId)
  if (carousel !== undefined) return carousel.title
  const category = catalog.categories.find((item) => item.slug === carouselId)
  return category === undefined ? null : category.name
}