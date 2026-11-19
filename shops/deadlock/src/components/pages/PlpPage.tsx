import { Link, useParams } from "@tanstack/react-router";
import { carouselProducts, CAROUSELS } from "../../catalog/carousels";
import { useCatalog } from "../../hooks/useCatalog";
import type { Catalog } from "../../types";
import CartPanel from "../CartPanel";
import ProductGrid from "../ProductGrid";

const EMPTY: Catalog = { products: [], offers: [], stock: { updatedAt: "", items: {} } };

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { state, retry } = useCatalog();
  const catalog = state.status === "success" ? state : EMPTY;
  const carousel = CAROUSELS.find((item) => item.id === carouselId);
  const products = carouselProducts(catalog, carouselId);
  if (state.status === "success" && (!carousel || products === null)) {
    return <section className="tents"><h1>این فهرست پیدا نشد</h1><Link className="page-back-link" to="/">بازگشت به خانه</Link></section>;
  }
  const message = state.status === "error" ? "بارگذاری محصولات انجام نشد." : "در حال حاضر محصولی نیست.";

  return (
    <>
      <Link className="page-back-link plp-back-link" to="/">بازگشت به خانه</Link>
      <ProductGrid id="plp" title={carousel?.title ?? "فهرست محصولات"} products={products ?? []} status={state.status} message={message} stock={state.status === "success" ? state.stock : undefined} offers={catalog.offers} isPlp onRetry={retry} />
      {state.status === "success" && <CartPanel products={catalog.products} />}
    </>
  );
}
