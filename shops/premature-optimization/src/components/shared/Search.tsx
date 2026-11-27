import type { Product } from "../../scripts/types";
import ProductList from "../catalog/products/ProductList.tsx";
import type { SharedCardProps } from "../catalog/products/ProductList.tsx";
import { useNavigate } from "@tanstack/react-router";
import { useSearchStore } from "../../hooks/useSearchStore.ts";

type SearchResultsProps = SharedCardProps & {
  query: string;
  products: Product[];
};

export function SearchResults({
  query,
  products,
  ...rest
}: SearchResultsProps) {
  return (
    <section className="recommendation search-results" id="search-results">
      <h2 className="recommendation-title">
        🔍 نتایج جستجو برای «{query.trim()}»
      </h2>
      {products.length === 0 ? (
        <p className="empty-message">چیزی پیدا نشد.</p>
      ) : (
        <ul className="products">
          <ProductList products={products} {...rest} />
        </ul>
      )}
    </section>
  );
}

const format = new Intl.NumberFormat("fa-IR");

export function Search({ total }: { total: number }) {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const navigate = useNavigate();

  function handleChange(value: string) {
    setQuery(value);
    void navigate({ to: "/", replace: true });
  }

  return (
    <label className="search">
      <span className="search-icon">🔍︎</span>
      <input
        className="search-entry"
        type="search"
        value={query}
        placeholder={`جستجو در میان ${format.format(total)} کالا...`}
        onChange={(e) => handleChange(e.target.value)}
      />
    </label>
  );
}
