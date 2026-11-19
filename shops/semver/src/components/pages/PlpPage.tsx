import { Link, useParams } from "@tanstack/react-router";
import { carouselProducts, findCarousel } from "../../catalog/carousel-products";
import { stateForProducts } from "../../catalog/product-state";
import { useCatalog, type CatalogState } from "../../hooks/useCatalog";
import { formatCount } from "../../utils/format";
import ProductGrid from "../ProductGrid";

function Listing({ state, carouselId }: { state: CatalogState; carouselId: string }) {
  if (state.status === "loading") return <ProductGrid state={state} />;
  if (state.status === "error") {
    return (
      <div className="error-state" role="alert">
        <p>خطا در بارگذاری اطلاعات: {state.message}</p>
        <button className="buynow-btn" type="button" onClick={state.retry}>
          تلاش دوباره
        </button>
      </div>
    );
  }

  const carousel = findCarousel(state.data, carouselId);
  const products = carouselProducts(state.data, carouselId);
  if (!carousel || products === null) {
    return <h1 className="section-title">این فهرست پیدا نشد</h1>;
  }

  return (
    <>
      <h1 className="section-title">{carousel.emoji} {carousel.title}</h1>
      <p className="catalog-page-count">{formatCount(products.length)} محصول</p>
      <ProductGrid state={stateForProducts(state, products)} />
    </>
  );
}

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const state = useCatalog();

  return (
    <section className="catalog-page">
      <Link className="catalog-link" to="/">بازگشت به خانه</Link>
      <Listing state={state} carouselId={carouselId} />
    </section>
  );
}
