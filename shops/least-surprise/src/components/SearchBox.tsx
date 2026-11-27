
interface SearchBoxProps {
  readonly query: string;
  readonly onQuery: (value: string) => void;
}

export default function SearchBox({
  query,
  onQuery
}: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="search"
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder="جست‌وجوی محصولات..."
        aria-label="جست‌وجوی محصولات"
      />
    </div>
  );
}
