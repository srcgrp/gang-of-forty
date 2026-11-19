import { useLocation } from "@tanstack/react-router"
import { useState } from "react"
import { getPageData } from "../../catalog/shopPageData"
import { useCatalog } from "../../hooks/useCatalog"
import ShopPage from "../ShopPage"
import Status from "../Status"

declare module "@tanstack/history" {
    interface HistoryState {
        orderSubmitted?: boolean
    }
}

export default function HomePage() {
    const { state, retry, catalogControls } = useCatalog()
    const orderSubmitted = useLocation({
        select: (location) => location.state.orderSubmitted === true
    })
    const [countdownOpen, setCountdownOpen] = useState(false)

    if (state.status !== "success") {
        return <Status state={state} onRetry={retry} />
    }

    const pageData = getPageData(state.data, catalogControls)

    return (
        <>
            {orderSubmitted && (
                <div className="container">
                    <p className="info-card order-success" role="status">ثبت سفارش با موفقیت انجام شد</p>
                </div>
            )}
            <ShopPage
                {...pageData}
                countdownControls={{
                    open: countdownOpen,
                    onToggle: () => setCountdownOpen(!countdownOpen)
                }}
            />
        </>
    )
}
