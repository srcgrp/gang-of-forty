import { useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import type { Card } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

export default function ProductCard({ card }: { card: Card }) {
  const [pulse, setPulse] = useState(false)
  const qty = useCartStore((state) => state.lines[card.id] ?? 0)
  const add = useCartStore((state) => state.add)
  const remove = useCartStore((state) => state.remove)

  function addToCart() {
    setPulse(true)
    add(card.id, card.stockQty)
  }

  function removeFromCart() {
    setPulse(true)
    remove(card.id, card.name)
  }

  return (
    <li className="product-item" data-product-id={card.id}>
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
            ) : qty === 0 ? (
              <button type="button" className="product__add" onClick={addToCart} aria-label={`افزودن ${card.name} به سبد`}>
                <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
              </button>
            ) : (
              <div className="product__qty">
                <button type="button" className="product__qty-btn" onClick={removeFromCart} aria-label={`کم کردن ${card.name}`}>−</button>
                <span className="product__qty-val" aria-live="polite">{qty.toLocaleString('fa-IR')}</span>
                <button type="button" className="product__qty-btn" onClick={addToCart} aria-label={`افزودن ${card.name}`} disabled={qty >= card.stockQty}>+</button>
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  )
}
