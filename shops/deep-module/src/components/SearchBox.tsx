export function SearchBox({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (q: string) => void;
}) {
  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="site-search" className="visually-hidden">
        جستجو در محصولات
      </label>
      <span className="search__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </span>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="جستجو در میان ۳۰۰۰ کالا..."
        autoComplete="off"
      />
      {query && (
        <button
          type="button"
          className="search__clear"
          aria-label="پاک کردن"
          onClick={() => onQuery("")}
        >
          ✕
        </button>
      )}
      <button type="submit" className="search__submit">
        جستجو
      </button>
    </form>
  );
}
