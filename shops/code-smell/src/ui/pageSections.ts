import type { ShopData } from "../types"
import { renderHeader } from "./headerContent"
import { renderHero } from "./renderHero"
import { renderCategories } from "./categories"
import { renderPromos } from "./renderPromos"
import { renderGuide } from "./guide"
import { renderFooter } from "./renderFooter"

export function renderPageSections(
    data: ShopData,
    shopName: string,
    onNavigate: (event: MouseEvent) => void
): void {
    const countText = new Intl.NumberFormat("fa-IR").format(
        data.products.length
    )

    renderHeader(data.shop, data.categories, countText, onNavigate)
    renderHero(data.home.hero, data.shop, shopName, onNavigate)
    renderCategories(data.categories, onNavigate)
    renderPromos(data.home, onNavigate)
    renderGuide(data.shop)
    renderFooter(data.shop, data.categories, shopName, onNavigate)
}