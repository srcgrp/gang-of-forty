import type { Card } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
  card: Card
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ProductCard({ card, onAdd, onRemove }: ProductCardProps) {
  return (
    <li className="product-item">
      <article className="product" data-stock={card.inStock ? 'in' : 'out'}>
        <div className="product__link">
          <span className="product__img">
            <span className="product__emoji">{card.emoji}</span>

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
          <Price 
            value={card.price} 
            {...(card.oldPrice !== undefined ? { oldValue: card.oldPrice } : {})} 
          />

          <div className="product__actions">
            {!card.inStock ? (
              <button
                type="button"
                className="product__add"
                disabled
                aria-label={`${card.name} ناموجود است`}
              >
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : card.qty === 0 ? (
              <button
                type="button"
                className="product__add"
                onClick={() => onAdd(card.id)}
                aria-label={`افزودن ${card.name} به سبد`}
              >
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : (
              <div className="product__qty">
                <button
                  type="button"
                  className="product__qty-btn"
                  onClick={() => onRemove(card.id)}
                  aria-label={`کم کردن ${card.name}`}
                >
                  −
                </button>
                <span className="product__qty-val" aria-live="polite">{card.qty}</span>
                <button
                  type="button"
                  className="product__qty-btn"
                  onClick={() => onAdd(card.id)}
                  aria-label={`افزودن ${card.name}`}
                  disabled={card.qty >= card.stockQty}
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