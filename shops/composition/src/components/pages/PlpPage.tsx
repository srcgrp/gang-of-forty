import { Link, useParams, useSearch } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import { carouselProducts } from "../../features/products/catalog/carousel-products";
import { sortProducts } from "../../features/products/catalog/sort-products";
import { offersById, toCards } from "../../features/products/catalog/cards";
import { formatNumber } from "../../shared/format";
import LoadStatus from "../LoadStatus";
import ProductGrid from "../ProductGrid";

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { sort } = useSearch({ from: "/plp/$carouselId" });
  const state = useCatalog();
  if (state.status !== "success") {
    return <main id="main" className="wrap plp-page" tabIndex={-1}>
      <Link to="/">بازگشت به خانه</Link><LoadStatus state={state} onRetry={state.retry} />
    </main>;
  }
  const data = state.data;
  const products = carouselProducts(data, carouselId);
  const title = data.home.carousels.find(item => item.id === carouselId)?.title ??
    data.categories.find(item => item.slug === carouselId)?.name;
  return (
    <main id="main" className="wrap plp-page" tabIndex={-1}>
      <Link className="back-home" to="/">بازگشت به خانه</Link>
      {products === null ? <h1>این فهرست پیدا نشد</h1> : <>
        <h1>{title}</h1>
        <p role="status">{formatNumber(products.length)} محصول</p>
        <nav className="plp-sort" aria-label="مرتب‌سازی محصولات">
          <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "default" }}
            activeProps={{ "aria-current": "page" }}>پیش‌فرض</Link>
          <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "price" }}
            activeProps={{ "aria-current": "page" }}>ارزان‌ترین</Link>
        </nav>
        <ProductGrid section={{ id: carouselId, title: "محصولات این فهرست", carousel: false,
          cards: toCards(sortProducts(products, data.offers, sort), data.stock, offersById(data.offers)) }} />
      </>}
    </main>
  );
}
