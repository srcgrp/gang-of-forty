type SearchBoxProps = {
  productCount: number;
  query: string;
  onSearch: (text: string) => void;
};

export default function SearchBox({ productCount, query, onSearch }: SearchBoxProps) {
  return (
    <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="sr-only" htmlFor="q">جستجوی کالا</label>
      <span className="search-ico" aria-hidden="true">
        <svg className="icon" aria-hidden="true" focusable="false">
          <use href="#i-search" />
        </svg>
      </span>
      <input
        id="q"
        name="q"
        type="search"
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        placeholder={productCount ? `جستجو در میان ${productCount.toLocaleString('fa-IR')} کالا…` : 'جستجو…'}
        autoComplete="off"
        aria-controls="main"
      />
    </form>
  );
}
