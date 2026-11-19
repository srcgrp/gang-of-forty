import type { CartRowData } from "../types"
import { useCartStore } from "../hooks/useCartStore"
import Price from "./Price"

type CartRowProps = {
    row: CartRowData
    stockQuantity: number
}

export default function CartRow({ row, stockQuantity }: CartRowProps) {
    const add = useCartStore((store) => store.add)
    const decrease = useCartStore((store) => store.decrease)
    const remove = useCartStore((store) => store.remove)

    return (
        <li className="cart-row">
            <span className="cart-row__emoji" aria-hidden="true">
                {row.emoji}
            </span>
            <h3 className="cart-row__title" title={row.name}>
                {row.name}
            </h3>
            <span className="cart-row__quantity">
                <span>تعداد:</span>
                <span className="cart-row__controls" dir="ltr">
                    <button
                        className="button button--secondary"
                        type="button"
                        aria-label={"کم کردن تعداد " + row.name}
                        disabled={row.quantity <= 1}
                        onClick={() => decrease(row.id)}
                    >
                        −
                    </button>
                    <span>{row.quantity.toLocaleString("fa-IR")}</span>
                    <button
                        className="button button--secondary"
                        type="button"
                        aria-label={"زیاد کردن تعداد " + row.name}
                        disabled={row.quantity >= stockQuantity}
                        onClick={() => add(row.id, stockQuantity)}
                    >
                        +
                    </button>
                </span>
            </span>
            <div className="cart-row__subtotal">
                <Price amount={row.lineTotal} />
            </div>
            <button
                className="button button--secondary cart-row__remove"
                type="button"
                aria-label={"حذف از سبد خرید: " + row.name}
                onClick={() => remove(row.id)}
            >
                حذف
            </button>
        </li>
    )
}