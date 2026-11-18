import type { Offer, Product } from "../types"
import { cartRows, cartTotal } from "../cart/cartRules"
import { useCartStore } from "../hooks/useCartStore"
import CartRow from "./CartRow"
import Price from "./Price"

type CartPanelProps = {
    products: Product[]
    offers: Offer[]
}

export default function CartPanel({ products, offers }: CartPanelProps) {
    const cart = useCartStore((store) => store.cart)
    const cartOpen = useCartStore((store) => store.cartOpen)
    const remove = useCartStore((store) => store.remove)
    const toggle = useCartStore((store) => store.toggle)
    const rows = cartRows(cart, products, offers)
    const total = cartTotal(rows)

    return (
        <section
            className="cart-panel"
            id="cart"
            aria-labelledby="cart-title"
            hidden={!cartOpen}
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
                            return <CartRow key={row.id} row={row} onRemove={remove} />
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