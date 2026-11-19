import { useState } from "react"
import { getPageData } from "../../catalog/shopPageData"
import { useCatalog } from "../../hooks/useCatalog"
import ShopPage from "../ShopPage"
import Status from "../Status"

export default function HomePage() {
    const { state, retry, catalogControls } = useCatalog()
    const [countdownOpen, setCountdownOpen] = useState(false)

    if (state.status !== "success") {
        return <Status state={state} onRetry={retry} />
    }

    const pageData = getPageData(state.data, catalogControls)

    return (
        <ShopPage
            {...pageData}
            countdownControls={{
                open: countdownOpen,
                onToggle: () => setCountdownOpen(!countdownOpen)
            }}
        />
    )
}