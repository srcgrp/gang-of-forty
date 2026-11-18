import { cartLines, cartSubtotal, totalQuantity } from '../cart/cart.ts'
import { useCartStore } from '../hooks/useCartStore.ts'
import { formatCount, formatPrice } from '../lib/format.ts'
import type { Product } from '../types.ts'

type CartPanelProps = { products: Product[] }

export default function CartPanel({ products }: CartPanelProps) {
  const cart = useCartStore((s) => s.cart)
  const remove = useCartStore((s) => s.remove)

  const lines = cartLines(cart, products)
  const totalCount = totalQuantity(cart)
  const subtotal = cartSubtotal(lines)

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
                  onClick={() => remove(product.id)}
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