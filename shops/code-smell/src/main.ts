import type { ShopData, CartItem } from "./types"
import { loadShopData } from "./api/loadShopData"
import { loadCart, saveCart } from "./storage/cartStorage"
import { cartCount, addToCart } from "./cart/cartRules"
import { getSelectedCategory, getCatalogCarousels } from "./catalog/catalogSelection"
import { renderCartCount } from "./ui/renderCartCount"
import { renderStatus, renderSlowStatus } from "./ui/renderStatus"
import { initializeHeader } from "./ui/headerBase"
import { renderPageSections } from "./ui/pageSections"
import { renderCatalogView } from "./ui/catalogView"
import { handleNavigationLink, scrollToSection, clearSearch, setSearchDisabled } from "./ui/navigation"
import { readCategorySlug, readSectionId, writeNavigation } from "./data/navigationUrl"
const api = "../../api/"
const shopName = "سوپرمارکت بوی کد"
let shopData: ShopData | null = null
let cart = loadCart()

function handleAddToCart(cartItem: CartItem): void {
    cart = addToCart(cart, cartItem)
    renderCartCount(cartCount(cart))
    saveCart(cart)
}

function followRoute(shouldScroll: boolean = false): void {
    if (shopData) {
        const category = getSelectedCategory(shopData.categories, readCategorySlug())
        const carousels = getCatalogCarousels(shopData, category)
        renderCatalogView(shopData, category, carousels, navigate, handleAddToCart)
        if (shouldScroll) {
            scrollToSection(category ? "filtered-products" : readSectionId())
        }
    }
}

function navigate(event: MouseEvent): void {
    const href = handleNavigationLink(event)
    if (href !== null && shopData) {
        const category = getSelectedCategory(shopData.categories, href.slice(1))
        writeNavigation(category ? category.slug : null, href)
        if (category === null) {
            clearSearch()
        }
        followRoute(true)
    }
}

async function loadPage(): Promise<void> {
    setSearchDisabled(true)
    renderStatus({ status: "loading" })
    try {
        shopData = await loadShopData(api, renderSlowStatus)
        renderPageSections(shopData, shopName, navigate)
        followRoute(true)
        renderStatus(shopData.products.length > 0
            ? { status: "success", products: shopData.products }
            : { status: "empty" }
        )
    } catch {
        renderStatus({ status: "error", message: "دریافت اطلاعات فروشگاه انجام نشد. لطفاً صفحه را دوباره بارگذاری کنید." })
    }
}

function handleRouteChange(): void {
    followRoute(true)
}
window.addEventListener("hashchange", handleRouteChange)
window.addEventListener("popstate", handleRouteChange)
initializeHeader(shopName, navigate)
renderCartCount(cartCount(cart))
loadPage()