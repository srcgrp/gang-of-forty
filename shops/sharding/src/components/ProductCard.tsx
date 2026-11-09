import type { Product } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
  product: Product
  quantity: number
  stockQty: number
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ProductCard({ product, quantity, stockQty, onAdd, onRemove }: ProductCardProps) {
  const inStock = stockQty > 0
  const discountPercent = 10

  return (
    <li className="product-item">
      <article className="product" data-stock={inStock ? 'in' : 'out'}>
        <div className="product__link">
          <span className="product__img">
            <span className="product__emoji">{product.emoji}</span>
            {inStock && <OfferBadge percent={discountPercent} />}
            {!inStock && <span className="product__badge-stock">ناموجود</span>}
          </span>
          <h3 className="product__name">{product.name} — {product.unit}</h3>
        </div>

        <div className="product__footer">
          <Price value={product.price} />
          <div className="product__actions">
            {!inStock ? (
              <button
                type="button"
                className="product__add"
                disabled
                aria-label={`${product.name} ناموجود است`}
              >
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : quantity === 0 ? (
              <button
                type="button"
                className="product__add"
                onClick={() => onAdd(product.id)}
                aria-label={`افزودن ${product.name} به سبد`}
              >
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : (
              <div className="product__qty">
                <button
                  type="button"
                  className="product__qty-btn"
                  onClick={() => onRemove(product.id)}
                  aria-label={`کم کردن ${product.name}`}
                >
                  −
                </button>
                <span className="product__qty-val" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  className="product__qty-btn"
                  onClick={() => onAdd(product.id)}
                  aria-label={`افزودن ${product.name}`}
                  disabled={quantity >= stockQty}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  )
}