import type { Product } from '../shared/types'

type SearchResultProps = {
  product: Product
  onAdd: (id: number) => void
  onJump: (id: number) => void
}

const priceFmt = new Intl.NumberFormat('fa-IR')

export default function SearchResult({ product, onAdd, onJump }: SearchResultProps) {
  return (
    <li
      className="search-results__item"
      onClick={() => onJump(product.id)}
      style={{ cursor: 'pointer' }}
    >
      <span className="search-results__img">
        <span className="product__emoji">{product.emoji}</span>
      </span>
      
      <span className="search-results__info">
        <span className="search-results__name">{product.name}</span>
        <span className="search-results__price">
          {priceFmt.format(product.price)} تومان
        </span>
      </span>
      
      <div className="search-results__actions">
        <button
          type="button"
          className="product__add"
          onClick={(e) => {
            e.stopPropagation()
            onAdd(product.id)
          }}
          aria-label={`افزودن ${product.name} به سبد`}
        >
          <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
        </button>
      </div>
    </li>
  )
}