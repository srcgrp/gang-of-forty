import type { CartItem } from "../types"
import CartItemRow from "./CartItemRow"

type CartPanelProps = {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function CartPanel({ open, items, onClose, onAdd, onRemove }: CartPanelProps) {
  if (!open) return null

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0)

  return (
    <>
      <div className="cart-backdrop" onClick={onClose} />
      <aside
        className="cart-panel"
        role="dialog"
        aria-labelledby="cart-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose()
        }}
      >
        <div className="cart-panel-body">
          <div className="cart-panel-header">
            <h2 id="cart-title">سبد خرید</h2>
            <button type="button" autoFocus onClick={onClose}>
              <span aria-hidden="true">×</span>
              <span className="visually-hidden">بستن سبد خرید</span>
            </button>
          </div>
          {items.length === 0 ? (
            <p>سبد خرید شما خالی می باشد</p>
          ) : (
            <>
              <ul className="cart-list">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} onAdd={onAdd} onRemove={onRemove} />
                ))}
              </ul>
              <p className="cart-total">جمع کل : {total.toLocaleString("fa-IR")} تومان</p>
            </>
          )}
        </div>
      </aside>
    </>
  )
}