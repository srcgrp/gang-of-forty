import { useState } from 'react'
import type { Card } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
  card: Card
  id?: string
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ProductCard({ card, id, onAdd, onRemove }: ProductCardProps) {
  const [pulse, setPulse] = useState(false)


  return (
    <li className="product-item" id={id} data-product-id={card.id}>
      <article className={`product ${pulse ? 'product--cart-pulse' : ''}`} data-stock={card.inStock ? 'in' : 'out'} onAnimationEnd={() => setPulse(false)}>
        <div className="product__link">
          <span className={`product__img ${!card.image ? 'product__img--emoji' : ''}`}>
            {card.image ? (
              <img src={card.image} alt={card.name} loading="lazy" />
            ) : (
              <span className="product__emoji">{card.emoji}</span>
            )}
            
            {!card.inStock && (
              <span className="product__badge-stock">
                {card.stockKnown ? 'ناموجود' : 'موجودی نامشخص'}
              </span>
            )}
            {card.inStock && card.discountPercent !== undefined && (
              <OfferBadge percent={card.discountPercent} />
            )}
          </span>
          <h3 className="product__name">{card.name} — {card.unit}</h3>
        </div>

        <div className="product__footer">
          <Price value={card.price} {...(card.oldPrice !== undefined ? { oldValue: card.oldPrice } : {})} />
          <div className="product__actions">
            {!card.inStock ? (
              <button type="button" className="product__add" disabled aria-label={card.stockKnown ? `${card.name} ناموجود است` : `موجودی ${card.name} نامشخص است`}>
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : card.qty === 0 ? (
              <button type="button" className="product__add" onClick={() => { setPulse(true); onAdd(card.id) }} aria-label={`افزودن ${card.name} به سبد`}>
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : (
              <div className="product__qty">
                <button type="button" className="product__qty-btn" onClick={() => { setPulse(true); onRemove(card.id) }} aria-label={`کم کردن ${card.name}`}>−</button>
                <span className="product__qty-val" aria-live="polite">{card.qty}</span>
                <button type="button" className="product__qty-btn" onClick={() => { setPulse(true); onAdd(card.id) }} aria-label={`افزودن ${card.name}`} disabled={card.qty >= card.stockQty}>+</button>
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  )
}