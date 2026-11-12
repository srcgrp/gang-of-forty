import type { Cart, ShopData, CarouselWithProducts } from "../types"
import { cartCount, cartRows, cartTotal } from "../cart/cartRules"
import { getVisibleCarousels } from "./catalogSelection"
import { getHomeCarousels } from "./getCarouselProducts"

export function getPageData(
    data: ShopData,
    cart: Cart,
    catalogControls: {
        categoryId: number | null
        query: string
        onPick: (id: number | null) => void
        onQuery: (value: string) => void
    },
    cartOpen: boolean,
    onToggle: () => void
) {
    const query = catalogControls.query.trim().toLowerCase()
    const filteredData = {
        ...data,
        products: data.products.filter(function (product) {
            return product.name.toLowerCase().includes(query)
        })
    }
    let carousels: CarouselWithProducts[]
    if (query !== "" && catalogControls.categoryId === null) {
        carousels = getHomeCarousels(
            [{ id: "search-results", title: "نتایج جستجو", emoji: "", source: "all" }],
            filteredData.products,
            data.categories,
            data.offers,
            data.stock.items
        )
    } else {
        carousels = getVisibleCarousels(filteredData, catalogControls.categoryId)
    }
    const rows = cartRows(cart, data.products, data.offers)
    return {
        data: data,
        carousels: carousels,
        catalogControls: catalogControls,
        cartControls: {
            count: cartCount(cart),
            cartOpen: cartOpen,
            onToggle: onToggle
        },
        rows: rows,
        total: cartTotal(rows)
    }
}