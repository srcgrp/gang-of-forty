interface SearchBoxProps {
  query: string;
  onQuery: (query: string) => void;
}

export default function SearchBox({ query, onQuery }: SearchBoxProps) {
  return (
    <form className="header__search" onSubmit={(event) => event.preventDefault()}>
      <label className="header__search-label" htmlFor="product-search">جستجو</label>
      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder="می‌تونی بین محصولات جستجو کنی"
        aria-label="جستجوی محصولات"
      />
      <button type="submit" className="header__search-button" aria-label="جستجو">
        <svg className="header__search-icon" aria-hidden="true">
          <use href="/sprite.svg#search" />
        </svg>
      </button>
    </form>
  );
}
