import type { Product } from "../types"

// Finds a product by the id from the URL. The URL gives text, so it is turned into a number first.
// null means "no product": the id is not a number, or no product has this id.
export function findProduct(products: Product[], productId: string): Product | null {
  const id = Number(productId)
  if (!Number.isInteger(id)) return null
  const product = products.find((item) => item.id === id)
  return product === undefined ? null : product
}
