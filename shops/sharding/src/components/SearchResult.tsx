import type { Card } from '../shared/types'
import { formatPrice } from '../shared/logic/pricing'
import { useCartStore } from '../hooks/useCartStore'
import { Icon } from './Icon'

type SearchResultProps = {
  card: Card
  onJump: (id: number) => void
}

export default function SearchResult({ card, onJump }: SearchResultProps) {
  const qty = useCartStore((state) => state.lines[card.id] ?? 0)
  const add = useCartStore((state) => state.add)
  const remove = useCartStore((state) => state.remove)

  return (
    <li className="search-results__item">
      <button type="button" className="search-results__link" onClick={() => onJump(card.id)}>
        <span className="search-results__img">
          {card.image ? <img src={card.image} alt="" /> : <span className="product__emoji">{card.emoji}</span>}
        </span>
        <span className="search-results__info">
          <span className="search-results__name">{card.name}</span>
          <span className="search-results__price">
            {formatPrice(card.price)} تومان
            {card.oldPrice !== undefined && <del> {formatPrice(card.oldPrice)}</del>}
          </span>
        </span>
      </button>
      <div className="search-results__actions">
        {!card.inStock ? (
          <span className="search-results__out">{card.stockKnown ? 'ناموجود' : 'موجودی نامشخص'}</span>
        ) : qty === 0 ? (
          <button type="button" className="product__add" onClick={() => add(card.id, card.stockQty)} aria-label={`افزودن ${card.name}`}>
            <Icon name="plus" />
          </button>
        ) : (
          <div className="product__qty">
            <button type="button" className="product__qty-btn" onClick={() => remove(card.id, card.name)} aria-label={`کم کردن ${card.name}`}>−</button>
            <span className="product__qty-val">{formatPrice(qty)}</span>
            <button type="button" className="product__qty-btn" onClick={() => add(card.id, card.stockQty)} disabled={qty >= card.stockQty} aria-label={`افزودن ${card.name}`}>+</button>
          </div>
        )}
      </div>
    </li>
  )
}
