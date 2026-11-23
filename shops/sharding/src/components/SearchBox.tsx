import { useEffect, useRef, useState } from 'react'
import type { AppState } from '../shared/types'
import { searchProducts } from '../features/products/logic/filters'
import { useJumpToProduct } from '../hooks/useJumpToProduct'
import SearchResults from './SearchResults'
import { Icon } from './Icon'

type SearchBoxProps = {
  data: AppState
  activeCategoryId: number | null
  query: string
  onQuery: (next: string) => void
}

export default function SearchBox({ data, activeCategoryId, query, onQuery }: SearchBoxProps) {
  const [open, setOpen] = useState(false)
  const jumpToProduct = useJumpToProduct(data)
  const results = query.trim() ? searchProducts(data.products, query)
    .filter((product) => activeCategoryId === null || product.categoryId === activeCategoryId)
    .slice(0, 8) : []
  const boxRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    function onDocClick(event: MouseEvent): void {
      if (event.target instanceof Node && !boxRef.current?.contains(event.target)) setOpen(false)
    }
    function onKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function jumpTo(id: number): void {
    setOpen(false)
    jumpToProduct(id)
  }

  const showDropdown = open && query.trim() !== ''
  const placeholder = data.products.length > 0
    ? `جستجو در میان ${new Intl.NumberFormat('fa-IR').format(data.products.length)} کالا…`
    : 'جستجو در محصولات…'

  return (
    <form ref={boxRef} className="search" role="search" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-input" className="visually-hidden">جستجو در محصولات</label>
      <span className="search__icon" aria-hidden="true"><Icon name="search" /></span>
      <input
        id="search-input"
        className="search__input"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => { onQuery(e.target.value); setOpen(true) }}
        onFocus={() => { if (query.trim()) setOpen(true) }}
      />
      {showDropdown && (
        <ul className="search-results">
          {results.length === 0 && <li className="search-results__empty">نتیجه‌ای یافت نشد</li>}
          <SearchResults products={results} data={data} onJump={jumpTo} />
        </ul>
      )}
    </form>
  )
}
