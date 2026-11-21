
import type { CartLine, Product } from '../types'
import { formatPrice } from '../cart/cart'

type CartPanelProps = {
  cart: CartLine[]
  products: Product[]
  total: number
  onRemove: (id: number) => void
}

export default function CartPanel({
  cart,
  products,
  total,
  onRemove
}: CartPanelProps) {
  const productMap = new Map(products.map(product => [product.id, product]))

  return (
    <section className="cart-panel" aria-label="سبد خرید">
      <h2>سبد خرید</h2>

      {cart.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <ul>
          {cart.map(line => {
            const product = productMap.get(line.productId)

            if (!product) return null

            return (
              <li key={line.productId}>
                <span>{product.emoji} {product.name}</span>
                <span>تعداد: {line.quantity}</span>
                <button
                  type="button"
                  onClick={() => onRemove(line.productId)}
                >
                  حذف
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <p>جمع کل: <strong>{formatPrice(total)}</strong></p>
    </section>
  )
}
