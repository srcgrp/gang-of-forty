import type { LoadState } from "../types"

export function renderStatus(
    state: LoadState,
    loadingMessage: string = "در حال بارگذاری فروشگاه..."
): void {
    const pageStatus = document.querySelector<HTMLElement>("#page-status")
    let message = ""

    switch (state.status) {
        case "loading":
            message = loadingMessage
            break
        case "success":
            break
        case "empty":
            message = "کالایی پیدا نشد!"
            break
        case "error":
            message = state.message
            break
        default: {
            const unexpectedState: never = state
            throw new Error("وضعیت صفحه نامعتبر است:" + " " + unexpectedState)
        }
    }

    if (pageStatus) {
        pageStatus.classList.add("page-status")
        pageStatus.hidden = state.status === "success"
        pageStatus.setAttribute("aria-busy", String(state.status === "loading"))

        const messageText = document.createElement("p")
        messageText.textContent = message
        pageStatus.replaceChildren(messageText)
    }
}
export function renderSlowStatus(): void {
    renderStatus(
        { status: "loading" },
        "اتصال کند است؛ هنوز در حال دریافت اطلاعات فروشگاه هستیم..."
    )
}