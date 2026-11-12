export type SearchBoxProps = {
  query: string
  onQuery: (q: string) => void
}

export default function SearchBox({ query, onQuery }: SearchBoxProps) {
  return (
    <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="جستجو..." />
  )
}
