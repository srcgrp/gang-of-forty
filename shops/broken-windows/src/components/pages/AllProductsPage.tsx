
import { Link, useSearch, useNavigate } from "@tanstack/react-router";
import ProductGrid from "../ProductGrid";
import Status from "../Status";
import { useCatalog } from "../../hooks/useCatalog";
import { useSearchStore } from "../../hooks/useSearchStore";
import { searchProducts } from "../../catalog/lookup";
import { sortProducts } from "../../catalog/sortProducts";
import { formatNumber } from "../../format";

export default function AllProductsPage() {
  const { sort } = useSearch({ from: "/products" });
  const navigate = useNavigate({ from: "/products" });

  const { state, retry } = useCatalog();
  const query = useSearchStore((s) => s.query);

  function handleSortChange(value: string) {
    const nextSort =
      value === "price" || value === "expensive" ? value : "default";

    navigate({
      search: (prev) => ({ ...prev, sort: nextSort }),
    });
  }

  if (state.status !== "success") {
    return <Status state={state} onRetry={retry} />;
  }

  const matches = sortProducts(
    searchProducts(state.products, query),
    sort
  );

  return (
    <section className="plp">
      <Link to="/" className="plp-back">
        بازگشت به خانه
      </Link>

      <div className="plp-toolbar">
        <p className="plp-count">
          {formatNumber(matches.length)} محصول
        </p>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          aria-label="مرتب‌سازی محصولات"
        >
          <option value="default">پیش‌فرض</option>
          <option value="price">ارزان‌ترین</option>
          <option value="expensive">گران‌ترین</option>
        </select>
      </div>

      <ProductGrid
        title="همه محصولات"
        id="all-products"
        products={matches}
        offers={state.offers}
        stock={state.stock}
        wrap
      />
    </section>
  );
}
