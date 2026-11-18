import type { CartItem } from "../types"

type CartItemRowProps = {
  item: CartItem
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function CartItemRow({ item, onAdd, onRemove }: CartItemRowProps) {
  return (
    <li className="cart-item">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-total">{(item.qty * item.price).toLocaleString("fa-IR")} تومان</p>
        <p className="cart-item-price">{item.price.toLocaleString("fa-IR")} تومان / عدد</p>
        <div className="cart-stepper">
            <button type="button" onClick={() => onAdd(item.id)}>
            <span aria-hidden="true">+</span>
            <span className="visually-hidden">افزودن به تعداد محصول</span>
            </button>
            <span className="cart-stepper-qty">
            <span className="visually-hidden">تعداد: </span>
            {item.qty.toLocaleString("fa-IR")}
            </span>
            <button type="button" onClick={() => onRemove(item.id)}>
            <span aria-hidden="true">-</span>
            <span className="visually-hidden">کم کردن تعداد محصول</span>
            </button>
        </div>
    </li>
  )
}