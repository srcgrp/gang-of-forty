import { useCatalog } from "../../hooks/useCatalog";
import type { Catalog } from "../../types";
import { CAROUSELS, carouselProducts } from "../../catalog/carousels";
import CategoryNav from "../CategoryNav";
import ProductGrid from "../ProductGrid";
import CartPanel from "../CartPanel";

const EMPTY: Catalog = { products: [], offers: [], stock: { updatedAt: "", items: {} } };

export default function HomePage() {
  const { state, retry } = useCatalog();
  const catalog = state.status === "success" ? state : EMPTY;
  const message = state.status === "error" ? "بارگذاری محصولات انجام نشد." : "در حال حاضر محصولی نیست.";

  return (
    <>
      <CategoryNav />
      {CAROUSELS.map((carousel) => (
        <ProductGrid
          key={carousel.id}
          id={carousel.id}
          carouselId={carousel.id}
          title={carousel.title}
          products={(carouselProducts(catalog, carousel.id) ?? []).slice(0, 5)}
          status={state.status}
          message={message}
          stock={state.status === "success" ? state.stock : undefined}
          offers={catalog.offers}
          onRetry={retry}
        />
      ))}
      {state.status === "success" && <CartPanel products={catalog.products} />}
    </>
  );
}
