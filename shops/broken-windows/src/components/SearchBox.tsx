type Props = {
  query: string;
  onQuery: (value: string) => void;
};

export default function SearchBox({ query, onQuery }: Props) {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        aria-label="جستجو"
        className="search-input"
        type="search"
        id="search"
        name="q"
        placeholder="دنبال چی می‌گردی؟"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />
      <button type="submit" className="visually-hidden">
        جستجو
      </button>
    </form>
  );
}