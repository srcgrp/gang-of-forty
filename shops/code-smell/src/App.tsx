import { useEffect, useState } from "react"
import type { LoadState } from "./types"
import { loadShopData, getLoadErrorMessage } from "./api/loadShopData"
import { cartCount } from "./cart/cartRules"
import { getPageData } from "./catalog/shopPageData"
import ShopPage from "./components/ShopPage"
import Status from "./components/Status"
import { useCartStore } from "./hooks/useCartStore"

export default function App() {
    const [state, setState] = useState<LoadState>({ status: "loading" })
    const [attempt, setAttempt] = useState(0)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState("")
    const [countdownOpen, setCountdownOpen] = useState(false)
    const count = useCartStore((store) => cartCount(store.cart))

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
        const countText = count.toLocaleString("fa-IR")
        document.title = "بوی کد | سبد خرید: " + countText + " کالا"
    }, [count])

    function retry(): void {
        setState({ status: "loading" })
        setAttempt(attempt + 1)
    }

    if (state.status !== "success") {
        return <Status state={state} onRetry={retry} />
    }

    const catalogControls = { categoryId, query, onPick: setCategoryId, onQuery: setQuery }
    const pageData = getPageData(state.data, catalogControls)
    return (
        <ShopPage
            {...pageData}
            countdownControls={{
                open: countdownOpen,
                onToggle: () => setCountdownOpen(!countdownOpen)
            }}
    
            onPick={setCategoryId}
        />
    )
}