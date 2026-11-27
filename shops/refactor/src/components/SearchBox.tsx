type SearchBoxProps = {
  query: string
  onQuery: (value: string) => void
}

export default function SearchBox({ query, onQuery }: SearchBoxProps) {
  return (
    <div className="search" role="search">
      <div className="search-box">
        <label className="sr-only" htmlFor="q">جستجو در محصولات</label>
        <input
          id="q"
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          autoComplete="off"
          placeholder="جستجوی کالا…"
        />
      </div>
    </div>
  )
}
