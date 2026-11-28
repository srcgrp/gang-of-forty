import { useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
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
    const [showConfirmation] = useState(orderSubmitted)
    const [countdownOpen, setCountdownOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(function () {
        if (orderSubmitted) {
            void navigate({ to: "/", replace: true, state: { orderSubmitted: false } })
        }
    }, [orderSubmitted, navigate])

    if (state.status !== "success") {
        return <Status state={state} onRetry={retry} />
    }

    const pageData = getPageData(state.data, catalogControls)

    return (
        <>
            {showConfirmation && (
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
