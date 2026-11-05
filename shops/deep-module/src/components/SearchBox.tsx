export function SearchBox({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (q: string) => void;
}) {
  return (
    <input
      type="search"
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      placeholder="جستجو..."
      className="search-input"
    />
  );
}
