import { useId, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useCartStore } from '../hooks/useCartStore'
import type { Card } from '../shared/types'
import Price from './Price'
import ProductImage from './ProductImage'
import ProductQuantity from './ProductQuantity'

export default function ProductCard({ card, anchorId }: { card: Card; anchorId?: string }) {
  const titleId = useId()
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
    <li id={anchorId} className="product-item" data-product-id={card.id}>
      <article className={`product ${pulse ? 'product--cart-pulse' : ''}`} data-stock={card.inStock ? 'in' : 'out'} onAnimationEnd={() => setPulse(false)}>
        <Link
          to="/product/$productId"
          params={{ productId: String(card.id) }}
          search={true}
          className="product__link"
          aria-labelledby={titleId}
        >
          <ProductImage card={card} />
          <h3 className="product__name" id={titleId}>{card.name} — {card.unit}</h3>
        </Link>

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
              <ProductQuantity
                name={card.name}
                quantity={qty}
                max={card.stockQty}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            )}
          </div>
        </div>
      </article>
    </li>
  )
}
