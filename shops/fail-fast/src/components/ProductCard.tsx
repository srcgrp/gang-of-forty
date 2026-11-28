import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Product, Offer } from '../types'
import { CART_TOAST_EVENT } from './CartToast'
import { useCartStore } from '../hooks/useCartStore'

interface ProductCardProps {
  product: Product
  offer?: Offer
  onAdd: (productId: number) => void
}

export default function ProductCard({ product, offer, onAdd }: ProductCardProps): ReactNode {
  const [justAdded, setJustAdded] = useState(false)
  const cartQuantity = useCartStore((state) =>
    state.lines.find((line) => line.productId === product.id)?.quantity ?? 0
  )
  const decrement = useCartStore((state) => state.decrement)
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current)
  }, [])
  const discountedPrice = offer
    ? Math.round(product.price * (1 - offer.percent / 100))
    : null

  const handleAdd = () => {
    onAdd(product.id)
    window.dispatchEvent(new CustomEvent(CART_TOAST_EVENT, {
      detail: `${product.name} به سبد خرید اضافه شد`,
    }))
  }

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
        {cartQuantity > 0 ? (
          <div className="product-quantity" aria-label={`تعداد ${product.name} در سبد خرید`}>
            <button type="button" onClick={handleAdd} aria-label={`افزودن یک ${product.name}`}>
              +
            </button>
            <span aria-live="polite">{cartQuantity.toLocaleString('fa-IR')}</span>
            <button type="button" onClick={() => decrement(product.id)} aria-label={`کم‌کردن یک ${product.name}`}>
              −
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={justAdded ? 'added' : undefined}
            aria-label={`افزودن ${product.name} به سبد خرید`}
            onClick={() => {
              handleAdd()
              setJustAdded(true)
              if (addedTimer.current) clearTimeout(addedTimer.current)
              addedTimer.current = setTimeout(() => setJustAdded(false), 1100)
            }}
          >
            <span aria-hidden="true">{justAdded ? '✓' : '+'}</span>
          </button>
        )}
      </div>
    </article>
  )
}
