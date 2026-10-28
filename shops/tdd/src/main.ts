import { loadShopData } from './api/shop-data'
import { nextCartCount } from './cart/count'
import { prepareProducts } from './catalog/products'
import { createProductSearch } from './catalog/search'
import { readCartCount, saveCartCount, clearSavedCart, isCartStorageEvent } from './storage/cart'
import { renderCartCount, cartStatus, notifyAdded, confirmClearCart, enableClearCart, watchCartChanges } from './ui/cart'
import { enableNavigation } from './ui/navigation'
import { renderLoadState, clearShopSections } from './ui/load-state'
import { renderPage } from './ui/page'
import { scrollToFragment } from './ui/fragment'
let cartCount = readCartCount()
function addToCart(): void {
    const nextCount = nextCartCount(cartCount)
    if (nextCount === cartCount) return
    cartCount = nextCount
    renderCartCount(cartCount)
    cartStatus(saveCartCount(cartCount) ? "" : "کالا اضافه شد؛ ذخیره سبد برای مراجعه بعدی در این مرورگر ممکن نیست.")
    notifyAdded()
}
async function clearCart(): Promise<void> {
    if (cartCount > 0 && await confirmClearCart()) {
        cartCount = 0
        renderCartCount(cartCount)
        cartStatus(clearSavedCart() ? "" : "سبد خالی شد؛ ذخیره تغییر در این مرورگر ممکن نیست.")
    }
}

function startCart(): void {
    renderCartCount(cartCount)
    enableClearCart(clearCart)
    watchCartChanges(event => {
        if (isCartStorageEvent(event)) {
            cartCount = readCartCount()
            renderCartCount(cartCount)
        }
    })
}

async function initPage(): Promise<void> {
    const main = document.querySelector<HTMLElement>("main")
    const status = document.querySelector<HTMLParagraphElement>("#page-status")
    if (!main || !status) throw new Error("Missing page elements")
    renderLoadState({ status: "loading" }, main, status)
    try {
        const data = await loadShopData()
        const catalog = prepareProducts(data.products, data.categories, data.offers, data.home.carousels, data.stock)
        const searchProducts = createProductSearch(data.products)
        renderPage({ ...data, ...catalog }, addToCart, searchProducts)
        renderLoadState(data.products.length > 0
            ? { status: "success", products: data.products }
            : { status: "empty" }, main, status)
        await document.fonts.ready
        if (document.readyState !== "complete") {
            await new Promise(resolve => window.addEventListener("load", resolve, { once: true }))
        }
        requestAnimationFrame(() => scrollToFragment(false))
    } catch (error: unknown) {
        console.error("Storefront loading failed:", error instanceof Error ? error.message : String(error))
        clearShopSections()
        renderLoadState({
            status: "error",
            message: "بارگذاری فروشگاه انجام نشد. اتصال را بررسی کنید و صفحه را دوباره بارگذاری کنید."
        }, main, status)
    }
}

enableNavigation()
startCart()
initPage()
