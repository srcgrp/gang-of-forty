import { useEffect, useState } from "react"
import type { Cart, LoadState } from "./types"
import { loadShopData, getLoadErrorMessage } from "./api/loadShopData"
import { addToCart, removeFromCart, cartCount } from "./cart/cartRules"
import { getPageData } from "./catalog/shopPageData"
import ShopPage from "./components/ShopPage"
import Status from "./components/Status"
import { loadCart, saveCart } from "./storage/cartStorage"

export default function App() {
    const [state, setState] = useState<LoadState>({ status: "loading" })
    const [attempt, setAttempt] = useState(0)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState("")
    const [cart, setCart] = useState<Cart>(() => loadCart())
    const [cartOpen, setCartOpen] = useState(false)
    const [countdownOpen, setCountdownOpen] = useState(false)
    useEffect(function () {
        let ignore = false
        function showSlowConnection(message: string): void {
            if (!ignore) {
                setState({ status: "loading", message: message })
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
                    setState({ status: "error", message: getLoadErrorMessage(error) })
                }
            })
        return function () { ignore = true }
    }, [attempt])

    useEffect(function () {
        saveCart(cart)
    }, [cart])

    useEffect(function () {
        const countText = cartCount(cart).toLocaleString("fa-IR")
        document.title = "بوی کد | سبد خرید:" + " " + countText + " " + "کالا"
    }, [cart])

    function retry(): void {
        setState({ status: "loading" })
        setAttempt(attempt + 1)
    }

    if (state.status !== "success") {
        return <Status state={state} onRetry={retry} />
    }
    const onToggle = () => setCartOpen(!cartOpen)
    const catalogControls = { categoryId, query, onPick: setCategoryId, onQuery: setQuery }
    const pageData = getPageData(state.data, cart, catalogControls, cartOpen, onToggle)
    return (
        <ShopPage
            {...pageData}
            countdownControls={{ open: countdownOpen, onToggle: () => setCountdownOpen(!countdownOpen) }}
            onAdd={(id: number) => setCart(addToCart(cart, { id, quantity: 1 }))}
            onPick={setCategoryId}
            onRemove={(id: number) => setCart(removeFromCart(cart, id))}
        />
    )
}