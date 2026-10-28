import type {
    Product,
    Category,
    Offer,
    Stock,
    Carousel,
    CarouselWithProducts
} from "../types"
import { getProductOffer, getProductCardData } from "./getProductCardData"

export function getCarouselProducts(
    carouselData: Carousel,
    products: Product[],
    offers: Offer[]
): Product[] {
    let selectedProducts = products

    if (carouselData.source === "offers") {
        selectedProducts = products.filter(function (product) {
            return getProductOffer(product.id, offers) !== undefined
        })
    } else if (carouselData.categoryId !== undefined) {
        selectedProducts = products.filter(function (product) {
            return product.categoryId === carouselData.categoryId
        })
    }

    return selectedProducts
}

export function getHomeCarousels(
    carousels: Carousel[],
    products: Product[],
    categories: Category[],
    offers: Offer[],
    stock: Stock["items"]
): CarouselWithProducts[] {
    return carousels.map(function (carousel) {
        const selectedProducts = getCarouselProducts(
            carousel,
            products,
            offers
        )

        return {
            ...carousel,
            products: selectedProducts.map(function (product) {
                return getProductCardData(
                    product,
                    categories,
                    offers,
                    stock
                )
            })
        }
    })
}