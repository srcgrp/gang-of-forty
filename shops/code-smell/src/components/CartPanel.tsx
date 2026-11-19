import type { Offer, Product, Stock } from "../types"
import { cartRows, cartTotal } from "../cart/cartRules"
import { useCartStore } from "../hooks/useCartStore"
import CartRow from "./CartRow"
import Price from "./Price"

type CartPanelProps = {
    products: Product[]
    offers: Offer[]
    stock: Stock["items"]
}

export default function CartPanel({ products, offers, stock }: CartPanelProps) {
    const cart = useCartStore((store) => store.cartOpen ? store.cart : null)
    const toggle = useCartStore((store) => store.toggle)

    if (cart === null) {
        return <section className="cart-panel" id="cart" hidden />
    }

    const rows = cartRows(cart, products, offers)
    const total = cartTotal(rows)

    return (
        <section
            className="cart-panel"
            id="cart"
            aria-labelledby="cart-title"
        >
            <div className="cart-panel__body">
                <header className="section__header cart-panel__header">
                    <h2 className="section__title" id="cart-title">
                        سبد خرید
                    </h2>
                    <button
                        className="button button--secondary"
                        type="button"
                        aria-label="بستن سبد خرید"
                        onClick={toggle}
                    >
                        بستن
                    </button>
                </header>
                {rows.length === 0 ? (
                    <p>سبد خرید شما خالی است.</p>
                ) : (
                    <ul className="cart-list">
                        {rows.map(function (row) {
                            return (
                                <CartRow
                                    key={row.id}
                                    row={row}
                                    stockQuantity={stock[String(row.id)] ?? 0}
                                />
                            )
                        })}
                    </ul>
                )}
                <div className="cart-summary">
                    <strong>جمع سبد خرید:</strong>
                    <Price amount={total} />
                </div>
            </div>
        </section>
    )
}
