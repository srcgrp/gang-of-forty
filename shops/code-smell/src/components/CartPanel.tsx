import type { CartRowData } from "../types"
import CartRow from "./CartRow"
import Price from "./Price"

type CartPanelProps = {
    rows: CartRowData[]
    total: number
    cartOpen: boolean
    onRemove: (id: number) => void
    onToggle: () => void
}

export default function CartPanel({
    rows,
    total,
    cartOpen,
    onRemove,
    onToggle
}: CartPanelProps) {
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
                        onClick={onToggle}
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
                                    onRemove={onRemove}
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