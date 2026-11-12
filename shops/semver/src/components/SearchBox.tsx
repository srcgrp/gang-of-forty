type SearchBoxProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export default function SearchBox({ query, onQueryChange }: SearchBoxProps) {
  return (
    <input
      id="search-input"
      type="search"
      aria-label="جستجوی محصولات"
      placeholder="جستجـو کنیـد ..."
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
    />
  );
}
