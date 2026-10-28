import type { Product, Stock, Offer, Category, CarouselConfig } from '../types'

export function discountedPrice(product: Product, offer?: Offer): number {
    return offer ? Math.round(product.price * (1 - offer.percent / 100)) : product.price
}

export function productsInCategory(products: Product[], categoryId: number): Product[] {
    return products.filter(product => product.categoryId === categoryId)
}

export function productsForCarousel(config: CarouselConfig, products: Product[], offers: Map<number, Offer>): Product[] {
    return config.source === "offers"
        ? products.filter(product => offers.has(product.id))
        : products.filter(product => product.categoryId === config.categoryId)
}

export function prepareProducts(products: Product[], categories: Category[], offers: Offer[], carousels: CarouselConfig[], stock: Stock) {
    const offersByProduct = new Map(offers.map(offer => [offer.productId, offer]))
    const unavailableByProduct = new Map(products.map(product =>
        [product.id, stock.items[product.id] === 0]))
    const finalPrices = new Map(products.map(product =>
        [product.id, discountedPrice(product, offersByProduct.get(product.id))]))
    const namesByCategory = new Map(categories.map(category =>
        [category.id, productsInCategory(products, category.id).map(product => product.name)]))
    const productsByCarousel = new Map(carousels.map(config =>
        [config.id, productsForCarousel(config, products, offersByProduct)]))

    return { offersByProduct, finalPrices, unavailableByProduct, namesByCategory, productsByCarousel }
}
