import { useCartStore } from '../hooks/useCartStore'

import type { CartLine } from '../types'

type CartPanelProps = {
  items: CartLine[]
  total: number
}

export default function CartPanel({
  items,
  total,
}: CartPanelProps) {
  const remove = useCartStore((state) => state.remove)
  return (
    <aside className="cart-panel" id="cart">
      <h2>سبد خرید</h2>

      {items.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id}>
              <span>{item.emoji} {item.name}</span>
              <span>تعداد: {item.quantity}</span>
              <span>
                {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
              </span>

              <button onClick={() => remove(item.id)}>
                حذف
              </button>
            </div>
          ))}

          <h3>
            مجموع: {total.toLocaleString('fa-IR')} تومان
          </h3>
        </>
      )}
    </aside>
  )
}
