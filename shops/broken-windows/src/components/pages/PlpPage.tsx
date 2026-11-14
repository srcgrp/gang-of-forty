import { Link, useParams } from "@tanstack/react-router";
import ProductGrid from "../ProductGrid.tsx";
import Status from "../Status.tsx";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { useSearchStore } from "../../hooks/useSearchStore.ts";
import { carouselProducts } from "../../catalog/carouselProducts.ts";
import { carouselTitle } from "../../catalog/carouselTitle.ts";
import { searchProducts } from "../../catalog/lookup.ts";
import { formatNumber } from "../../format.ts";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
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

  const matches = searchProducts(all, query);

  return (
    <section className="plp">
      <Link to="/" className="plp-back">بازگشت به خانه</Link>
      <p className="plp-count">{formatNumber(matches.length)} محصول</p>
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
