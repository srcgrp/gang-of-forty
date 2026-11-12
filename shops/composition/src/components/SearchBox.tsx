type Props = { query: string; onQuery: (query: string) => void };
export default function SearchBox({ query, onQuery }: Props) {
  return (
    <div className="search-box">
      <label htmlFor="product-search">جست‌وجوی محصولات</label>
      <input id="product-search" type="search" value={query}
        onChange={event => onQuery(event.target.value)} placeholder="دنبال چی می‌گردی؟" />
    </div>
  );
}
