import type { LoadState } from "../types"

type StatusProps = {
    state: LoadState
    onRetry: () => void
}

export default function Status({ state, onRetry }: StatusProps) {
    let message = ""

    switch (state.status) {
        case "loading":
            message = state.message ?? "در حال بارگذاری فروشگاه..."
            break
        case "success":
            return null
        case "empty":
            message = "کالایی پیدا نشد!"
            break
        case "error":
            message = state.message
            break
        default: {
            const unexpectedState: never = state
            return unexpectedState
        }
    }

    return (
        <div
            className="container page-status"
            id="page-status"
            role="status"
            aria-live="polite"
            aria-busy={state.status === "loading"}
        >
            <p>{message}</p>
            {state.status === "error" && (
                <button className="button button--primary retry-button" type="button" onClick={onRetry}>
                    تلاش مجدد
                </button>
            )}
        </div>
    )
}