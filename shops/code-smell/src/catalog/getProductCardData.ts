import type { Product, Category, Offer, Stock, ProductCardData } from "../types"

export function getProductCardData(
    product: Product,
    categories: Category[],
    offers: Offer[],
    stock: Stock["items"]
): ProductCardData {
    const offer = getProductOffer(product.id, offers)
    const category = categories.find(function (item) {
        return item.id === product.categoryId
    })

    return {
        ...product,
        offer: offer,
        isUnavailable: stock[product.id] === 0,
        categoryName: category ? category.name : "",
        finalPrice: getFinalPrice(product, offer)
    }
}

export function getCategoryCards(
    category: Category,
    products: Product[],
    offers: Offer[],
    stock: Stock["items"]
): ProductCardData[] {
    const selectedProducts = products.filter(function (product) {
        return product.categoryId === category.id
    })

    return selectedProducts.map(function (product) {
        return getProductCardData(product, [category], offers, stock)
    })
}

export function getProductOffer(
    productId: number,
    offers: Offer[]
): Offer | undefined {
    return offers.find(function (offer) {
        return offer.productId === productId
    })
}

export function getFinalPrice(
    product: Product,
    offer: Offer | undefined
): number {
    let price = product.price

    if (offer) {
        price = Math.round(product.price * (100 - offer.percent) / 100)
    }

    return price
}