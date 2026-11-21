import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import type { CartLine, Product } from '../types'
import { getCartTotal } from '../cart'

interface CartPanelProps {
  cart: CartLine[]
  products: Product[]
  onRemove: (productId: number) => void
}

export default function CartPanel({ cart, products, onRemove }: CartPanelProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#cart')
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (!isOpen) {
    return null
  }

  if (cart.length === 0) {
    return (
      <div id="cart" className="cart-panel open">
        <div className="cart-content">
          <a href="#" className="close-cart" aria-label="بستن سبد خرید">×</a>
          <h2>سبد خرید</h2>
          <p>سبد خرید شما خالی است</p>
        </div>
      </div>
    )
  }

  const total = getCartTotal(cart, products)

  return (
    <div id="cart" className="cart-panel open">
      <div className="cart-content">
        <a href="#" className="close-cart" aria-label="بستن سبد خرید">×</a>
        <h2>سبد خرید</h2>
        <ul>
          {cart.map((line) => {
            const product = products.find((p) => p.id === line.productId)
            if (!product) return null

            const subtotal = product.price * line.quantity

            return (
              <li key={line.productId}>
                <span>{product.emoji} {product.name}</span>
                <span> × {line.quantity}</span>
                <span> = {subtotal.toLocaleString('fa-IR')} تومان</span>
                <button
                  type="button"
                  onClick={() => onRemove(line.productId)}
                  aria-label={`حذف ${product.name} از سبد`}
                >
                  حذف
                </button>
              </li>
            )
          })}
        </ul>
        <p>
          <strong>مجموع: {total.toLocaleString('fa-IR')} تومان</strong>
        </p>
      </div>
    </div>
  )
}
