import type { Product, Offer } from '../types'
import { cartTotal, formatPrice } from '../cart/cart'
import { useCartStore } from '../hooks/useCartStore'

type CartPanelProps = {
  products: Product[]
  offers: Offer[]
}

export default function CartPanel({ products, offers }: CartPanelProps) {
  const cart = useCartStore((s) => s.lines)
  const remove = useCartStore((s) => s.remove)
  const total = cartTotal(cart, products, offers)
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
                  onClick={() => remove(line.productId)}
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
