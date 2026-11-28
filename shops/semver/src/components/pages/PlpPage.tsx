import { Link, useParams, useSearch } from "@tanstack/react-router";
import { carouselProducts, findCarousel } from "../../catalog/carousel-products";
import { sortProducts, type ProductSort } from "../../catalog/product-price";
import { stateForProducts } from "../../catalog/product-state";
import { useCatalog, type CatalogState } from "../../hooks/useCatalog";
import { formatCount } from "../../utils/format";
import ProductGrid from "../ProductGrid";

function Listing({ state, carouselId, sort }: { state: CatalogState; carouselId: string; sort: ProductSort }) {
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
      <div className="catalog-sort" role="group" aria-label="مرتب‌سازی محصولات">
        <Link className="catalog-link" to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "default" }}
          aria-current={sort === "default" ? "page" : undefined}
          activeOptions={{ exact: true, includeSearch: true }}>پیش‌فرض</Link>
        <Link className="catalog-link" to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "price" }}
          aria-current={sort === "price" ? "page" : undefined}
          activeOptions={{ exact: true, includeSearch: true }}>ارزان‌ترین</Link>
      </div>
      <ProductGrid state={stateForProducts(state, sortProducts(products, sort))} />
    </>
  );
}

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { sort } = useSearch({ from: "/plp/$carouselId" });
  const state = useCatalog();

  return (
    <section className="catalog-page">
      <Link className="catalog-link" to="/">بازگشت به خانه</Link>
      <Listing state={state} carouselId={carouselId} sort={sort} />
    </section>
  );
}
