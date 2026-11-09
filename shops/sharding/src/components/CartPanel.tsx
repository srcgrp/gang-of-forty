import type { Product, Cart } from '../shared/types'
import Price from './Price'

type CartPanelProps = {
  open: boolean
  cart: Cart
  products: Product[]
  onClose: () => void
  onRemoveLine: (id: number) => void
}

export default function CartPanel({ open, cart, products, onClose, onRemoveLine }: CartPanelProps) {
  const rows = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === Number(id))
      return product ? { product, qty } : null
    })
    .filter((r): r is { product: Product; qty: number } => r !== null)

  const total = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0)

  return (
    <aside id="cart-panel" className="cart-panel" hidden={!open} aria-label="سبد خرید">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="cart-panel__title">سبد خرید</h2>
        <button type="button" onClick={onClose} aria-label="بستن سبد">×</button>
      </div>

      <ul className="cart-panel__list">
        {rows.length === 0 ? (
          <li className="cart-row cart-row--empty">سبد خرید خالی است</li>
        ) : (
          rows.map((r) => (
            <li key={r.product.id} className="cart-row">
              <span className="cart-row__name">{r.product.name}</span>
              <span className="cart-row__qty">{r.qty} ×</span>
              <span className="cart-row__total">
                <Price value={r.product.price * r.qty} />
              </span>
              <button
                type="button"
                className="cart-row__remove"
                onClick={() => onRemoveLine(r.product.id)}
                aria-label={`حذف ${r.product.name}`}
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="cart-panel__total">
        <span>جمع تقریبی:</span>
        <strong>
          <Price value={total} />
        </strong>
      </div>
    </aside>
  )
}