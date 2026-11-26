import { memo, useId } from 'react'
import { Link } from '@tanstack/react-router'
import type { Card } from '../shared/types'
import Price from './Price'
import ProductImage from './ProductImage'
import ProductCartActions from './ProductCartActions'

export default memo(function ProductCard({ card, anchorId }: { card: Card; anchorId?: string }) {
  const titleId = useId()

  return (
    <li id={anchorId} className="product-item" data-product-id={card.id}>
      <article className="product" data-stock={card.inStock ? 'in' : 'out'}>
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
          <Price value={card.oldPrice ?? card.price} {...(card.oldPrice !== undefined ? { oldValue: card.oldPrice } : {})} />
          <ProductCartActions card={card} variant="card" />
        </div>
      </article>
    </li>
  )
})
