import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Product, Offer } from '../types'
import { CART_TOAST_EVENT } from './CartToast'

interface ProductCardProps {
  product: Product
  offer?: Offer
  onAdd: (productId: number) => void
}

export default function ProductCard({ product, offer, onAdd }: ProductCardProps): ReactNode {
  const [justAdded, setJustAdded] = useState(false)
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current)
  }, [])
  const discountedPrice = offer
    ? Math.round(product.price * (1 - offer.percent / 100))
    : null

  return (
    <article className="product">
      <span className="product-emoji">{product.emoji}</span>
      {offer && (
        <span className="discount-badge">{offer.percent}%</span>
      )}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.unit}</p>
        {discountedPrice !== null ? (
          <div className="price-container">
            <span className="old-price">
              {product.price.toLocaleString('fa-IR')}
            </span>
            <strong className="product-price new-price">
              {discountedPrice.toLocaleString('fa-IR')} تومان
            </strong>
          </div>
        ) : (
          <strong className="product-price">
            {product.price.toLocaleString('fa-IR')} تومان
          </strong>
        )}
        <button
          type="button"
          className={justAdded ? 'added' : undefined}
          aria-label={justAdded ? `${product.name} به سبد خرید اضافه شد` : `افزودن ${product.name} به سبد خرید`}
          onClick={() => {
            onAdd(product.id)
            window.dispatchEvent(new CustomEvent(CART_TOAST_EVENT, {
              detail: `${product.name} به سبد خرید اضافه شد`,
            }))
            setJustAdded(true)
            if (addedTimer.current) clearTimeout(addedTimer.current)
            addedTimer.current = setTimeout(() => setJustAdded(false), 1100)
          }}
        >
          <span aria-hidden="true">{justAdded ? '✓' : '+'}</span>
        </button>
      </div>
    </article>
  )
}
