import type { Product } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
  product: Product
  onAdd: (id: number) => void
  quantity: number 
}

export default function ProductCard({ product, onAdd, quantity }: ProductCardProps) {
  const inStock = true
  const discountPercent = 10 

  return (
    <li className="product-item">
      <article className="product" data-stock={inStock ? 'in' : 'out'}>
        <div className="product__link">
          <span className="product__img">
            <span className="product__emoji">{product.emoji}</span>
            {inStock && <OfferBadge percent={discountPercent} />}
          </span>
          <h3 className="product__name">{product.name} — {product.unit}</h3>
        </div>

        <div className="product__footer">
          <Price value={product.price} />
          <div className="product__actions">
            {quantity === 0 ? (
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
                <button type="button" className="product__qty-btn" aria-label={`کم کردن ${product.name}`}>−</button>
                <span className="product__qty-val">{quantity}</span>
                <button type="button" className="product__qty-btn" aria-label={`افزودن ${product.name}`}>+</button>
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  )
}