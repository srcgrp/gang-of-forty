import type { Offer, Product, SortOption } from "../types"
import { finalPrice } from "./cardInfo"

// The price the customer really pays: the price after discount if the product has an offer
function payPrice(product: Product, offers: Offer[]): number {
  const offer = offers.find((item) => item.productId === product.id)
  if (offer === undefined) return product.price
  return finalPrice(product.price, offer.percent)
}

// Returns a NEW array, the input array is never changed.
// "default" keeps the original order, "price" puts the cheapest product first.
export function sortProducts(products: Product[], sort: SortOption, offers: Offer[]): Product[] {
  if (sort === "default") return [...products]
  return [...products].sort((a, b) => payPrice(a, offers) - payPrice(b, offers))
}
