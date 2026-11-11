import type { Cart, Product } from '../shared/types'
import SearchResult from './SearchResult'

type SearchResultsProps = {
  products: Product[]
  cart: Cart
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onJump: (id: number) => void
}

export default function SearchResults({ products, cart, onAdd, onRemove, onJump }: SearchResultsProps) {
  return products.map((product) => (
    <SearchResult key={product.id} product={product} quantity={cart[product.id] ?? 0}
      onAdd={onAdd} onRemove={onRemove} onJump={onJump} />
  ))
}
