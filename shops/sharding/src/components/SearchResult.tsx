import type { Product } from '../shared/types'

type SearchResultProps = {
  product: Product
  quantity: number
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onJump: (id: number) => void
}

const priceFmt = new Intl.NumberFormat('fa-IR')

export default function SearchResult({ product, quantity, onAdd, onRemove, onJump }: SearchResultProps) {
  return (
    <li className="search-results__item" onClick={() => onJump(product.id)} style={{ cursor: 'pointer' }}>
      <span className="search-results__img">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span className="product__emoji">{product.emoji}</span>
        )}
      </span>
      
      <span className="search-results__info">
        <span className="search-results__name">{product.name}</span>
        <span className="search-results__price">{priceFmt.format(product.price)} تومان</span>
      </span>
      
      <div className="search-results__actions">
        {quantity === 0 ? (
          <button type="button" className="product__add" onClick={(e) => { e.stopPropagation(); onAdd(product.id) }} aria-label={`افزودن ${product.name}`}>
            <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg>
          </button>
        ) : (
          <div className="product__qty">
            <button type="button" className="product__qty-btn" onClick={(e) => { e.stopPropagation(); onRemove(product.id) }}>−</button>
            <span className="product__qty-val">{priceFmt.format(quantity)}</span>
            <button type="button" className="product__qty-btn" onClick={(e) => { e.stopPropagation(); onAdd(product.id) }}>+</button>
          </div>
        )}
      </div>
    </li>
  )
}