import { loadShopData } from './shared/data/api/shop-data'
import { readFilters, writeFilters, readHash, linkHash } from './shared/data/url'
import { prepareProducts } from './features/products/products'
import { createProductSearch } from './features/products/search'
import { startCart } from './features/cart/controller'
import { readCartCount, saveCartCount, clearSavedCart, watchCartCount } from './features/cart/data/storage'
import { renderCartCount, cartStatus, notifyAdded, confirmClearCart, enableClearCart } from './features/cart/ui/cart'
import { enableNavigation } from './shared/ui/navigation'
import { renderLoadState, renderLoadError } from './shared/ui/load-state'
import { renderPage } from './features/products/ui/page'
import { scrollToFragment, restoreFragment } from './shared/ui/fragment'

const onAdd = startCart({
    read: readCartCount,
    save: saveCartCount,
    clear: clearSavedCart,
    render: renderCartCount,
    showStatus: cartStatus,
    notify: notifyAdded,
    confirmClear: confirmClearCart,
    onClear: enableClearCart,
    onStorageChange: watchCartCount
})
async function initPage(): Promise<void> {
    const main = document.querySelector<HTMLElement>("main")
    const status = document.querySelector<HTMLParagraphElement>("#page-status")
    if (!main || !status) throw new Error("Missing page elements")
    renderLoadState({ status: "loading" }, main, status)
    try {
        const data = await loadShopData()
        const catalog = prepareProducts(data.products, data.categories, data.offers, data.home.carousels, data.stock)
        const searchProducts = createProductSearch(data.products)
        const filters = readFilters()
        let category = data.categories.find(item => item.slug === filters.category)
        const findProducts = (query: string) => searchProducts(query, category?.id)
        const updateSearch = renderPage({ ...data, ...catalog }, onAdd, findProducts,
            query => writeFilters({ ...readFilters(), q: query }), filters.q)
        enableNavigation(linkHash, hash => {
            const selected = data.categories.find(item => hash === `#${item.slug}`)
            if (selected) category = selected
            const current = readFilters()
            writeFilters({ category: selected ? selected.slug : current.category, q: current.q }, hash)
            updateSearch(current.q)
            requestAnimationFrame(() => scrollToFragment(hash))
        }, () => {
            const current = readFilters()
            category = data.categories.find(item => item.slug === current.category)
            updateSearch(current.q)
            requestAnimationFrame(() => scrollToFragment(readHash(), false))
        })
        renderLoadState(data.products.length ? { status: "success", products: data.products } : { status: "empty" }, main, status)
        await restoreFragment(readHash() || (category ? `#${category.slug}` : ""))
    } catch (error: unknown) {
        console.error("Storefront loading failed:", error instanceof Error ? error.message : String(error))
        renderLoadError(main, status)
    }
}
initPage()
