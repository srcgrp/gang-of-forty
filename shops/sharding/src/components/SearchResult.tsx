import type { Card } from '../shared/types'

type SearchResultProps = {
  card: Card
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onJump: (id: number) => void
}

const priceFmt = new Intl.NumberFormat('fa-IR')

export default function SearchResult({ card, onAdd, onRemove, onJump }: SearchResultProps) {
  return (
    <li className="search-results__item">
      <button type="button" className="search-results__link" onClick={() => onJump(card.id)}>
        <span className="search-results__img">
          {card.image ? <img src={card.image} alt="" /> : <span className="product__emoji">{card.emoji}</span>}
        </span>
        <span className="search-results__info">
          <span className="search-results__name">{card.name}</span>
          <span className="search-results__price">
            {priceFmt.format(card.price)} تومان
            {card.oldPrice !== undefined && <del> {priceFmt.format(card.oldPrice)}</del>}
          </span>
        </span>
      </button>
      <div className="search-results__actions">
        {!card.inStock ? (
          <span className="search-results__out">{card.stockKnown ? 'ناموجود' : 'موجودی نامشخص'}</span>
        ) : card.qty === 0 ? (
          <button type="button" className="product__add" onClick={() => onAdd(card.id)} aria-label={`افزودن ${card.name}`}>
            <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
          </button>
        ) : (
          <div className="product__qty">
            <button type="button" className="product__qty-btn" onClick={() => onRemove(card.id)} aria-label={`کم کردن ${card.name}`}>−</button>
            <span className="product__qty-val">{priceFmt.format(card.qty)}</span>
            <button type="button" className="product__qty-btn" onClick={() => onAdd(card.id)} disabled={card.qty >= card.stockQty} aria-label={`افزودن ${card.name}`}>+</button>
          </div>
        )}
      </div>
    </li>
  )
}
