import type { Product, Category, ShopDetails, Home, Offer } from '../../../shared/types'
import { renderHero } from '../../../shared/ui/hero'
import { renderPromos } from '../../../shared/ui/promos'
import { renderSideBanner } from '../../../shared/ui/side-banner'
import { renderHomeCarousels } from './home-carousels'
import { renderCategories } from './categories'
import { renderShop } from '../../../shared/ui/shop'
import { enableSearch } from './search'
import { priceFormatter } from '../../../shared/ui/elements'

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

export function renderPage(
    data: PageData, onAdd: () => void, onSearch: (query: string) => Product[],
    onQuery: (query: string) => void, initialQuery: string
): (query: string) => void {
    renderHero(data.home.hero)
    renderPromos(data.home.promos)
    renderSideBanner(data.home.side)
    renderHomeCarousels(data.home.carousels, data.productsByCarousel, data.unavailableByProduct, data.offersByProduct, data.finalPrices, onAdd)
    renderCategories(data.categories, data.namesByCategory)
    renderShop(data.shop)
    const updateSearch = enableSearch(data.unavailableByProduct, data.offersByProduct, data.finalPrices,
        onAdd, onSearch, onQuery, initialQuery)

    const input = document.querySelector<HTMLInputElement>("#site-search")
    if (!input) throw new Error("Missing search input")
    input.placeholder = "جست‌وجو در میان " + priceFormatter.format(data.products.length) + " کالا..."
    return updateSearch
}
