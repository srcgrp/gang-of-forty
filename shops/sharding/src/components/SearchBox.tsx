import { useEffect, useRef, useState } from 'react'
import type { Product } from '../shared/types'
import { useSearch } from '../hooks/useSearch'
import SearchResult from './SearchResult'

type SearchBoxProps = {
  products: Product[]
  query: string
  onQuery: (next: string) => void
  onAdd: (id: number) => void
}

export default function SearchBox({ products, query, onQuery, onAdd }: SearchBoxProps) {
  const [open, setOpen] = useState(false)
  const search = useSearch({ products, query })
  const boxRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent): void {
      if (!boxRef.current) return
      if (!(e.target instanceof Node)) return
      if (!boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function jumpTo(id: number): void {
    setOpen(false)
    const el = document.querySelector(`[data-product-id="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const showDropdown = open && query.trim() !== ''

  return (
    <form
      ref={boxRef}
      className="search"
      role="search"
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search-input" className="visually-hidden">جستجو در محصولات</label>
      <span className="search__icon" aria-hidden="true">
        <svg><use href="./icons.svg#search" /></svg>
      </span>
      <input
        id="search-input"
        className="search__input"
        type="search"
        placeholder="جستجو در محصولات…"
        value={query}
        onChange={(e) => {
          onQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => {
          if (query.trim()) setOpen(true)
        }}
      />
      {showDropdown && (
        <ul className="search-results" role="listbox">
          {search.status === 'loading' && (
            <li className="search-results__empty" role="status">در حال بارگذاری…</li>
          )}
          {search.status === 'error' && (
            <li className="search-results__empty" role="alert">{search.message}</li>
          )}
          {search.status === 'ready' && search.results.length === 0 && (
            <li className="search-results__empty" role="status">نتیجه‌ای یافت نشد</li>
          )}
          {search.status === 'ready' &&
            search.results.map((p) => (
              <SearchResult
                key={p.id}
                product={p}
                onAdd={onAdd}
                onJump={jumpTo}
              />
            ))}
        </ul>
      )}
    </form>
  )
}