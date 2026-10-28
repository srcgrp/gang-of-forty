import type { Product, Category, ShopDetails, Home, Offer } from '../types'
import { renderHero } from './hero'
import { renderPromos } from './promos'
import { renderSideBanner } from './side-banner'
import { renderHomeCarousels } from './home-carousels'
import { renderCategories } from './categories'
import { renderShop } from './shop'
import { enableSearch } from './search'
import { priceFormatter } from './elements'

type PageData = {
    products: Product[]
    categories: Category[]
    shop: ShopDetails
    home: Home
    offersByProduct: Map<number, Offer>
    finalPrices: Map<number, number>
    unavailableByProduct: Map<number, boolean>
    namesByCategory: Map<number, string[]>
    productsByCarousel: Map<string, Product[]>
}

export function renderPage(data: PageData, onAdd: () => void, onSearch: (query: string) => Product[]): void {
    renderHero(data.home.hero)
    renderPromos(data.home.promos)
    renderSideBanner(data.home.side)
    renderHomeCarousels(data.home.carousels, data.productsByCarousel, data.unavailableByProduct, data.offersByProduct, data.finalPrices, onAdd)
    renderCategories(data.categories, data.namesByCategory)
    renderShop(data.shop)
    enableSearch(data.unavailableByProduct, data.offersByProduct, data.finalPrices, onAdd, onSearch)

    const input = document.querySelector<HTMLInputElement>("#site-search")
    if (!input) throw new Error("Missing search input")
    input.placeholder = "جست‌وجو در میان " + priceFormatter.format(data.products.length) + " کالا..."
}
