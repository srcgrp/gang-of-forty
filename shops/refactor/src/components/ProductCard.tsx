import type { ProductView } from '../types'
import Icon from './Icon'
import OfferBadge from './OfferBadge'
import Price from './Price'

type ProductCardProps = {
  product: ProductView
  inStock: boolean
  discount?: number | undefined
  onAdd: (id: number) => void
}

export default function ProductCard({ product, inStock, discount, onAdd }: ProductCardProps) {
  const discounted = discount !== undefined

  return (
    <li className={!inStock ? 'card card--out' : 'card'}>
      <div className="card-media">
        <span className="card-emoji" aria-hidden="true">{product.emoji}</span>
        {discounted && <OfferBadge percent={discount} />}
        {!inStock && <span className="chip-out">ناموجود</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-weight">{product.unit}</p>
      </div>
      <div className="card-foot">
        <Price price={product.price} originalPrice={product.originalPrice} discounted={discounted} />
        <button
          type="button"
          className="act-btn act-cart"
          disabled={!inStock}
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={() => onAdd(product.id)}
        >
          <Icon name="cart" />
        </button>
      </div>
    </li>
  )
}
