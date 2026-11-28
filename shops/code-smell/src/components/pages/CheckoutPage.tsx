import { Link, useNavigate } from "@tanstack/react-router"
import { cartRows, hasStockIssue } from "../../cart/cartRules"
import { useCartStore } from "../../hooks/useCartStore"
import { useCatalog } from "../../hooks/useCatalog"
import Status from "../Status"
import CheckoutForm from "./CheckoutForm"
import "./CheckoutPage.css"

export default function CheckoutPage() {
    const navigate = useNavigate()
    const { state, retry, catalogControls } = useCatalog()
    const cart = useCartStore((store) => store.cart)
    const data = state.status === "success" ? state.data : null
    const rows = data ? cartRows(cart, data.products, data.offers) : []
    const blocked = data && hasStockIssue(rows, data.stock.items)

    function finishOrder(): void {
        if (data) {
            const store = useCartStore.getState()
            const currentRows = cartRows(store.cart, data.products, data.offers)
            if (currentRows.length > 0 && !hasStockIssue(currentRows, data.stock.items)) {
                store.clear()
                void navigate({ to: "/", replace: true, state: { orderSubmitted: true } })
            }
        }
    }

    return (
        <main className="section section--muted" id="main-content" tabIndex={-1}>
            <div className="container">
                <h1 className="section__title">ثبت سفارش</h1>
                {state.status !== "success" && <Status state={state} onRetry={retry} />}
                {data && rows.length === 0 && (
                    <div className="checkout-form info-card">
                        <p>سبد خرید شما خالی است.</p>
                        <Link className="button button--secondary button--route" to="/"
                            onClick={() => catalogControls.onQuery("")}
                        >
                            بازگشت به فروشگاه
                        </Link>
                    </div>
                )}
                {blocked && (
                    <div className="checkout-form info-card">
                        <p role="status">موجودی کافی نیست. تعداد کالاها را در سبد خرید اصلاح کنید.</p>
                        <button className="button button--secondary button--route" type="button"
                            onClick={() => useCartStore.setState({ cartOpen: true })}
                        >
                            باز کردن سبد خرید
                        </button>
                    </div>
                )}
                {data && rows.length > 0 && !blocked && <CheckoutForm onComplete={finishOrder} />}
            </div>
        </main>
    )
}