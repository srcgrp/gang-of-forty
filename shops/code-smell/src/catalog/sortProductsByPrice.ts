import type { ProductCardData } from "../types"

export function sortProductsByPrice(products: ProductCardData[]): ProductCardData[] {
    return products.slice().sort(function (first, second) {
        return first.finalPrice - second.finalPrice
    })
}
