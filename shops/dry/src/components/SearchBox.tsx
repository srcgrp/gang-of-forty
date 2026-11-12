type SearchBoxProps = {
  query: string
  onQuery: (value: string) => void
}

export default function SearchBox({ query, onQuery }: SearchBoxProps) {
  return (
    <input
      type="search"
      id="search"
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      placeholder="جستجوی محصولات..."
      aria-label="جستجوی محصولات"
    />
  )
}