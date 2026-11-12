
import type { Product } from '../types'

type ProductCardProps = {
  product: Product
  onAdd: (id: number) => void
}

export default function ProductCard({
  product,
  onAdd,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image">
        <span className="product-emoji">{product.emoji}</span>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString('fa-IR')} تومان</p>

        <button
          className="add-to-cart-btn"
          onClick={() => onAdd(product.id)}
        >
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  )
}
