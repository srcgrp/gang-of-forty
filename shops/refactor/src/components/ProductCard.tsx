import type { ProductView } from '../types'
import Icon from './Icon'
import OfferBadge from './OfferBadge'
import Price from './Price'

type ProductCardProps = { product: ProductView }

export default function ProductCard({ product }: ProductCardProps) {
  const out = product.stock === 0
  return (
    <li className={out ? 'card card--out' : 'card'}>
      <div className="card-media">
        <span className="card-emoji" aria-hidden="true">{product.emoji}</span>
        <OfferBadge percent={product.percent} />
        {out && <span className="chip-out">ناموجود</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-weight">{product.unit}</p>
      </div>
      <div className="card-foot">
        <Price price={product.price} originalPrice={product.originalPrice} percent={product.percent} />
        <button type="button" className="act-btn act-cart" disabled={out}
          aria-label={`افزودن ${product.name} به سبد خرید`}><Icon name="cart" /></button>
      </div>
    </li>
  )
}
