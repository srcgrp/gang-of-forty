import type { Card } from '../shared/types'
import OfferBadge from './OfferBadge'

type ProductImageProps = {
  card: Card
  loading?: 'lazy' | 'eager'
}

export default function ProductImage({ card, loading = 'lazy' }: ProductImageProps) {
  return (
    <span className={`product__img ${!card.image ? 'product__img--emoji' : ''}`}>
      {card.image ? (
        <img src={card.image} alt={card.name} loading={loading} />
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
  )
}
