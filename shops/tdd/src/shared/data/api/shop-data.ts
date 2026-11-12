import type { Stock, Offer, Category, ShopDetails, Home } from '../../types'
import { loadProducts, loadJSON, STOCK_URL, OFFERS_URL, CATEGORIES_URL, SHOP_URL, HOME_URL } from './client'
import { isStock, isOffer, isCategory, isArrayOf } from './guards'
import { isShop, isHome } from './shop-guards'

export async function loadShopData() {
    const [products, stock, offers, categories, shop, home] = await Promise.all([
        loadProducts(),
        loadJSON<Stock>(STOCK_URL, isStock),
        loadJSON<Offer[]>(OFFERS_URL, (value): value is Offer[] => isArrayOf(value, isOffer)),
        loadJSON<Category[]>(CATEGORIES_URL, (value): value is Category[] => isArrayOf(value, isCategory)),
        loadJSON<ShopDetails>(SHOP_URL, isShop),
        loadJSON<Home>(HOME_URL, isHome)
    ])

    return { products, stock, offers, categories, shop, home }
}
