import { useEffect, useState } from "react"
import { cartCount } from "../../cart/cartRules"
import { getPageData } from "../../catalog/shopPageData"
import { useCartStore } from "../../hooks/useCartStore"
import { useCatalog } from "../../hooks/useCatalog"
import ShopPage from "../ShopPage"
import Status from "../Status"

export default function HomePage() {
    const { state, retry } = useCatalog()
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState("")
    const [countdownOpen, setCountdownOpen] = useState(false)
    const count = useCartStore((store) => cartCount(store.cart))

    useEffect(function () {
        const countText = count.toLocaleString("fa-IR")
        document.title = "بوی کد | سبد خرید: " + countText + " کالا"
    }, [count])

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