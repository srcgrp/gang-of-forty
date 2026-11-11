import { useEffect, useRef, useState } from 'react'
import type { Product, Cart } from '../shared/types'
import { useSearch } from '../hooks/useSearch'
import SearchResults from './SearchResults'

type SearchBoxProps = {
  products: Product[]
  cart: Cart
  query: string
  onQuery: (next: string) => void
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function SearchBox({ products, cart, query, onQuery, onAdd, onRemove }: SearchBoxProps) {
  const [open, setOpen] = useState(false)
  const search = useSearch({ products, query })
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
    const el = document.querySelector(`[data-product-id="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const showDropdown = open && query.trim() !== ''
  const placeholder = products.length > 0
    ? `جستجو در میان ${new Intl.NumberFormat('fa-IR').format(products.length)} کالا…`
    : 'جستجو در محصولات…'

  return (
    <form ref={boxRef} className="search" role="search" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-input" className="visually-hidden">جستجو در محصولات</label>
      <span className="search__icon" aria-hidden="true"><svg><use href="./icons.svg#search" /></svg></span>
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
        <ul className="search-results" role="listbox">
          {search.status === 'loading' && <li className="search-results__empty">در حال بارگذاری…</li>}
          {search.status === 'error' && <li className="search-results__empty">{search.message}</li>}
          {search.status === 'ready' && search.results.length === 0 && <li className="search-results__empty">نتیجه‌ای یافت نشد</li>}
          {search.status === 'ready' && (
            <SearchResults products={search.results} cart={cart} onAdd={onAdd} onRemove={onRemove} onJump={jumpTo} />
          )}
        </ul>
      )}
    </form>
  )
}