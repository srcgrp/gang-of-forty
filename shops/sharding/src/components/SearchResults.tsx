import type { AppState, Product } from '../shared/types'
import { cardOf } from '../features/products/logic/to-card'
import SearchResult from './SearchResult'

type SearchResultsProps = {
  products: Product[]
  data: AppState
  onJump: (id: number) => void
}

export default function SearchResults({ products, data, onJump }: SearchResultsProps) {
  return products.map((product) => (
    <SearchResult key={product.id} card={cardOf(product, data)} onJump={onJump} />
  ))
}
