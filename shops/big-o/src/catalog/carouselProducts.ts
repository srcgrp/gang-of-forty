import type { Catalog, Product } from "../types"
import { filterProductsByCategoryID, filterSpecialProducts } from "./filters"

// Returns the products of one home carousel.
// null means "no carousel with this id", [] means "the carousel exists but is empty"
export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
  const carousel = catalog.carousels.find((item) => item.id === carouselId)
  if (carousel === undefined) return null
  if ("source" in carousel) {
    return filterSpecialProducts(catalog.offeredProducts, catalog.products, catalog.stock)
  }
  return filterProductsByCategoryID(carousel.categoryId, catalog.products)
}