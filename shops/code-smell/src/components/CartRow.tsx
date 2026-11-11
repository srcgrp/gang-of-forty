import type { CartRowData } from "../types"
import Price from "./Price"

type CartRowProps = {
    row: CartRowData
    onRemove: (id: number) => void
}

export default function CartRow({
    row,
    onRemove
}: CartRowProps) {
    return (
        <li className="cart-row">
            <span className="cart-row__emoji" aria-hidden="true">
                {row.emoji}
            </span>
            <h3 className="cart-row__title" title={row.name}>
                {row.name}
            </h3>
            <span className="cart-row__quantity" title="تعداد" dir="ltr">
                {"×" + " " + row.quantity.toLocaleString("fa-IR")}
            </span>
            <Price amount={row.lineTotal} />
            <button
                className="button button--secondary"
                type="button"
                aria-label={"حذف از سبد خرید:" + " " + row.name}
                onClick={function () {
                    onRemove(row.id)
                }}
            >
                حذف
            </button>
        </li>
    )
}