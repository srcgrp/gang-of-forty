import type { Product } from '../../scripts/types'
import ProductList from '../catalog/ProductList.tsx'
import type { SharedCardProps } from '../catalog/ProductList.tsx'

type SearchResultsProps = SharedCardProps & { query: string; products: Product[] }

export function SearchResults({ query, products, ...rest }: SearchResultsProps) {
  return (
    <section className="recommendation search-results" id="search-results">
      <h2 className="recommendation-title">🔍 نتایج جستجو برای «{query.trim()}»</h2>
      {products.length === 0 ? (
        <p className="empty-message">چیزی پیدا نشد.</p>
      ) : (
        <ul className="products">
          <ProductList products={products} {...rest} />
        </ul>
      )}
    </section>
  )
}

const format = new Intl.NumberFormat('fa-IR')

type SearchProps = { total: number; query: string; onQuery: (query: string) => void }

export function Search({ total, query, onQuery }: SearchProps) {
  return (
    <label className="search">
      <span className="search-icon">🔍︎</span>
      <input
        className="search-entry"
        type="search"
        value={query}
        placeholder={`جستجو در میان ${format.format(total)} کالا...`}
        onChange={(e) => onQuery(e.target.value)}
      />
    </label>
  )
}