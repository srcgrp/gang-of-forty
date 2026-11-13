import type { CartLine } from '../cart/cart.ts'
import { formatCount, formatPrice } from '../lib/format.ts'

type CartPanelProps = {
  lines: CartLine[]
  totalCount: number
  subtotal: number
  onRemove: (id: number) => void
}

export default function CartPanel({ lines, totalCount, subtotal, onRemove }: CartPanelProps) {
  return (
    <section className="section" id="cart" aria-labelledby="cart-title">
      <div className="section-head">
        <h2 className="section-title" id="cart-title">سبد خرید</h2>
      </div>
      {lines.length === 0 ? (
        <p className="carousel-status">سبد خرید شما خالی است. از محصولات چیزی اضافه کنید.</p>
      ) : (
        <>
          <ul className="cart-list">
            {lines.map(({ product, quantity }) => (
              <li className="cart-row" key={product.id}>
                <span aria-hidden="true">{product.emoji}</span>
                <span className="cart-name">{product.name}</span>
                <span>{formatCount(quantity)} × {formatPrice(product.price)}</span>
                <button
                  className="btn"
                  type="button"
                  aria-label={`حذف ${product.name} از سبد`}
                  onClick={() => onRemove(product.id)}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-total">
            تعداد: {formatCount(totalCount)} · جمع: <strong>{formatPrice(subtotal)}</strong>
          </p>
        </>
      )}
    </section>
  )
}
