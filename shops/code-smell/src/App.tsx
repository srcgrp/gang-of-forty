import { useEffect, useState } from "react"
import type { Cart, LoadState } from "./types"
import { loadShopData } from "./api/loadShopData"
import { addToCart, removeFromCart, cartCount, cartRows, cartTotal } from "./cart/cartRules"
import { getVisibleCarousels } from "./catalog/catalogSelection"
import ShopPage from "./components/ShopPage"
import Status from "./components/Status"

export default function App() {
    const [state, setState] = useState<LoadState>({ status: "loading" })
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [cart, setCart] = useState<Cart>({})
    const [cartOpen, setCartOpen] = useState(false)
    useEffect(function () {
        let ignore = false
        function showSlowConnection(): void {
            if (!ignore) {
                setState({
                    status: "loading",
                    message: "اتصال کند است؛ هنوز در حال دریافت اطلاعات فروشگاه هستیم..."
                })
            }
        }
        loadShopData(showSlowConnection)
            .then(function (data) {
                if (!ignore) {
                    setState(data.products.length > 0
                        ? { status: "success", data: data }
                        : { status: "empty" })
                }
            })
            .catch(function (error: unknown) {
                if (!ignore) {
                    const message = error instanceof Error
                        ? error.message
                        : "دریافت اطلاعات فروشگاه انجام نشد."
                    setState({ status: "error", message: message })
                }
            })
        return function () {
            ignore = true
        }
    }, [])

    if (state.status === "success") {
        const data = state.data
        const rows = cartRows(cart, data.products, data.offers)
        const cartControls = {
            count: cartCount(cart),
            cartOpen: cartOpen,
            onToggle: () => setCartOpen(!cartOpen)
        }
        return (
            <ShopPage
                data={data}
                carousels={getVisibleCarousels(data, categoryId)}
                categoryId={categoryId}
                cartControls={cartControls}
                rows={rows}
                total={cartTotal(rows)}
                onAdd={(id: number) => setCart(addToCart(cart, { id, quantity: 1 }))}
                onPick={setCategoryId}
                onRemove={(id: number) => setCart(removeFromCart(cart, id))}
            />
        )
    } else {
        return <Status state={state} />
    }
}