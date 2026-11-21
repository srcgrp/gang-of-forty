import type { ReactNode } from 'react'
import type { Product, Offer } from '../types'

interface ProductCardProps {
  product: Product
  offer?: Offer
  onAdd: (productId: number) => void
}

export default function ProductCard({ product, offer, onAdd }: ProductCardProps): ReactNode {
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
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={() => onAdd(product.id)}
        >
          +
        </button>
      </div>
    </article>
  )
}
