import { useCartStore } from '../hooks/useCartStore'

import type { CartLine } from '../types'

import { useCatalog } from '../hooks/useCatalog'

export default function CartPanel() {
  const lines = useCartStore((state) => state.lines)
  const remove = useCartStore((state) => state.remove)
  const catalog = useCatalog()
  const items: CartLine[] = catalog.status === 'success' ? lines.flatMap((line) => {
    const product = catalog.data.products.find((item) => item.id === line.productId)
    return product ? [{ ...product, quantity: line.quantity }] : []
  }) : []
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <aside className="cart-panel" id="cart">
      <h2>سبد خرید</h2>

      {catalog.status !== 'success' && lines.length > 0 ? <p>جزئیات سبد پس از دریافت محصولات نمایش داده می‌شود.</p> : items.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id}>
              <span>{item.emoji} {item.name}</span>
              <span>تعداد: {item.quantity.toLocaleString('fa-IR')}</span>
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
