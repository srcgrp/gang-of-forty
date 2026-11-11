import type { Cart, ShopData } from "../types"
import { cartCount, cartRows, cartTotal } from "../cart/cartRules"
import { getVisibleCarousels } from "./catalogSelection"

export function getPageData(
    data: ShopData,
    cart: Cart,
    categoryId: number | null,
    cartOpen: boolean,
    onToggle: () => void
) {
    const rows = cartRows(cart, data.products, data.offers)
    return {
        data: data,
        carousels: getVisibleCarousels(data, categoryId),
        categoryId: categoryId,
        cartControls: {
            count: cartCount(cart),
            cartOpen: cartOpen,
            onToggle: onToggle
        },
        rows: rows,
        total: cartTotal(rows)
    }
}