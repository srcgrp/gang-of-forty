import { useState } from "react"
import type { Cart } from "./types"
import ShopPage from "./components/ShopPage"
import {
    addToCart,
    cartCount,
    cartRows,
    cartTotal,
    removeFromCart
} from "./cart/cartRules"
import { getProductCardData } from "./catalog/getProductCardData"
import {
    sampleCategories,
    sampleMenu,
    sampleOffers,
    sampleStock,
    sampleProducts
} from "./data/sampleCatalog"

export default function App() {
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [cart, setCart] = useState<Cart>({})
    const [cartOpen, setCartOpen] = useState(false)

    const count = cartCount(cart)
    const rows = cartRows(cart, sampleProducts, sampleOffers)
    const total = cartTotal(rows)

    function handleAdd(id: number): void {
        setCart(addToCart(cart, { id, quantity: 1 }))
    }

    function handleRemove(id: number): void {
        setCart(removeFromCart(cart, id))
    }

    function handleToggleCart(): void {
        setCartOpen(!cartOpen)
    }

    const cartControls = { count, cartOpen, onToggle: handleToggleCart }

    const visibleProducts = sampleProducts.filter(function (product) {
        return categoryId === null || product.categoryId === categoryId
    })

    const cards = visibleProducts.map(function (product) {
        return getProductCardData(
            product,
            sampleCategories,
            sampleOffers,
            sampleStock
        )
    })

    return (
        <ShopPage
            categories={sampleCategories}
            menu={sampleMenu}
            products={cards}
            categoryId={categoryId}
            cartControls={cartControls}
            rows={rows}
            total={total}
            onAdd={handleAdd}
            onPick={setCategoryId}
            onRemove={handleRemove}
        />
    )
}