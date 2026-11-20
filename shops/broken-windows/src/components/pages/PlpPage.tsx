import { Link, useParams , useSearch , useNavigate} from "@tanstack/react-router";
import ProductGrid from "../ProductGrid.tsx";
import Status from "../Status.tsx";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { useSearchStore } from "../../hooks/useSearchStore.ts";
import { carouselProducts } from "../../catalog/carouselProducts.ts";
import { carouselTitle } from "../../catalog/carouselTitle.ts";
import { searchProducts } from "../../catalog/lookup.ts";
import { formatNumber } from "../../format.ts";
import { sortProducts } from "../../catalog/sortProducts.ts";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { sort } = useSearch({ from: "/plp/$carouselId" });
  const navigate = useNavigate({ from: "/plp/$carouselId" });
  const { state, retry } = useCatalog();
  const query = useSearchStore((s) => s.query);

  if (state.status !== "success") return <Status state={state} onRetry={retry} />;

  const all = carouselProducts(state, carouselId);
  const title = carouselTitle(state, carouselId);

  if (all === null || title === null) {
    return (
      <section className="plp">
        <p className="status" role="status">این فهرست پیدا نشد.</p>
        <Link to="/">بازگشت به خانه</Link>
      </section>
    );
  }

  const matches = sortProducts(searchProducts(all, query), sort);
function handleSortChange(value: string) {
  const nextSort =
    value === "price" || value === "expensive" ? value : "default";

  navigate({
    search: (prev) => ({ ...prev, sort: nextSort }),
  });
}
  return (
    <section className="plp">
      <Link to="/" className="plp-back">بازگشت به خانه</Link>
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
        title={title}
        id={`plp-${carouselId}`}
        products={matches}
        offers={state.offers}
        stock={state.stock}
        wrap
      />
    </section>
  );
}
