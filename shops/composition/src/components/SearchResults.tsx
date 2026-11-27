import type { ShopData } from "../shared/types";
import { createResults } from "../features/products/catalog/results";
import ProductGrid from "./ProductGrid";

type Props = { data: ShopData; query: string; category: string };
export default function SearchResults({ data, query, category }: Props) {
  const results = createResults(data)({ query, category, sort: "default" });
  return (
    <div id="search-results">
      <p role="status">{results.message}</p>
      {results.cards.length > 0 && <ProductGrid section={{
        id: "search", title: "نتایج جست‌وجو", carousel: true, cards: results.cards,
      }} />}
    </div>
  );
}
