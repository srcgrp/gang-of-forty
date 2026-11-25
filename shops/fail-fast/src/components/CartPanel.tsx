import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import type { Product } from '../types'
import { useCartStore } from '../hooks/useCartStore'

interface CartPanelProps {
  products: Product[]
}

export default function CartPanel({ products }: CartPanelProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const lines = useCartStore((state) => state.lines)
  const removeFromCart = useCartStore((state) => state.remove)
  const getTotal = useCartStore((state) => state.getTotal)

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#cart')
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (!isOpen) return null

  const total = getTotal(products)

  return (
    <div id="cart" className="cart-panel open">
      <div className="cart-content">
        <a href="#" className="close-cart" aria-label="بستن سبد خرید">×</a>
        <h2>سبد خرید</h2>
        {lines.length === 0 ? (
          <p>سبد خرید شما خالی است</p>
        ) : (
          <>
            <ul>
              {lines.map((line) => {
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
                      onClick={() => removeFromCart(line.productId)}
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
          </>
        )}
      </div>
    </div>
  )
}
