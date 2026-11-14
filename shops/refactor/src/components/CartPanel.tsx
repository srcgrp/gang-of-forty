import type { CartLine } from '../types'
import Icon from './Icon'
import { formatNumber } from './format'

type CartPanelProps = {
  lines: CartLine[]
  total: number
  onRemove: (id: number) => void
  onQuantity: (id: number, delta: number) => void
  onClose: () => void
}

export default function CartPanel({ lines, total, onRemove, onQuantity, onClose }: CartPanelProps) {
  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-header">
        <h2 id="cart-title" className="cart-title">سبد خرید</h2>
        <button type="button" className="cart-close-btn" onClick={onClose} aria-label="بستن سبد خرید">
          <Icon name="close" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="cart-empty-state">
          <span className="cart-empty-emoji" aria-hidden="true">🛒</span>
          <p>سبد خرید شما خالی است؛ از فهرست کالاها چیزی اضافه کنید.</p>
        </div>
      ) : (
        <ul className="cart-items">
          {lines.map((line) => (
            <li key={line.id} className="cart-item">
              <span className="cart-item-emoji" aria-hidden="true">{line.emoji}</span>
              <div className="cart-item-info">
                <span className="cart-item-name">{line.name}</span>
                <span className="cart-item-unit">{formatNumber(line.price)} تومان</span>
              </div>
              <div className="cart-qty">
                <button type="button" className="qty-btn" aria-label={`کاهش تعداد ${line.name}`}
                  disabled={line.quantity <= 1} onClick={() => onQuantity(line.id, -1)}>−</button>
                <span className="cart-item-q">{formatNumber(line.quantity)}</span>
                <button type="button" className="qty-btn" aria-label={`افزایش تعداد ${line.name}`}
                  disabled={line.quantity >= line.stock} onClick={() => onQuantity(line.id, 1)}>+</button>
              </div>
              <span className="cart-item-price">{formatNumber(line.subtotal)} تومان</span>
              <button
                type="button"
                className="cart-item-remove"
                aria-label={`حذف ${line.name}`}
                onClick={() => onRemove(line.id)}
              >
                <Icon name="close" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-footer">
        <div className="cart-summary">
          <span>جمع سبد خرید:</span>
          <strong>{formatNumber(total)} تومان</strong>
        </div>
      </div>
    </aside>
  )
}
