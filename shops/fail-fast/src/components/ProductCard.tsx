import type { ReactNode } from 'react'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAdd: (productId: number) => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps): ReactNode {
  return (
    <article className="product">
      <span className="product-emoji">{product.emoji}</span>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.unit}</p>
        <strong className="product-price">
          {product.price.toLocaleString('fa-IR')} تومان
        </strong>
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
