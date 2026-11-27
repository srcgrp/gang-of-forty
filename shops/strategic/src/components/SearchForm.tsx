type SearchFormProps = { productCount: number; query: string; onSearch: (text: string) => void };

export default function SearchForm({ productCount, query, onSearch }: SearchFormProps) {
  return (
      <form className="search" role="search" action="./" onSubmit={event => { event.preventDefault(); onSearch(String(new FormData(event.currentTarget).get("q") ?? "")); }}>
        <label className="sr-only" htmlFor="q">جستجوی کالا</label>
        <span className="search-ico" aria-hidden="true"><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-search" /></svg></span>
        <input key={query} name="q" defaultValue={query} id="q" type="search" placeholder={productCount ? `جستجو در میان ${productCount.toLocaleString('fa-IR')} کالا…` : 'جستجو…'} autoComplete="off" />
      </form>
  );
}