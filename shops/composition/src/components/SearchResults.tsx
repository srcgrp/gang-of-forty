import type { ShopData } from "../shared/types";
import { createResults } from "../features/products/catalog/results";
import ProductGrid from "./ProductGrid";

type Props = { data: ShopData; query: string; category: string; onAdd: (id: number) => void };
export default function SearchResults({ data, query, category, onAdd }: Props) {
  const results = createResults(data)({ query, category, sort: "default" });
  return (
    <div id="search-results">
      <p role="status">{results.message}</p>
      {results.cards.length > 0 && <ProductGrid onAdd={onAdd} section={{
        id: "search", title: "نتایج جست‌وجو", carousel: true, cards: results.cards,
      }} />}
    </div>
  );
}
