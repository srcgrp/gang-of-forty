import { Link, useParams, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { carouselProducts } from "../catalog/catalog-logic";
import CatalogError from "../components/catalog/CatalogError";
import CatalogLoading from "../components/catalog/CatalogLoading";
import ProductGrid from "../components/ProductGrid";
import { useCatalog } from "../hooks/useCatalog";
import NotFound from "./NotFound";

export default function PLP() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { sort } = useSearch({ from: "/plp/$carouselId" });
  const [attempt, setAttempt] = useState(0);
  const state = useCatalog(attempt);

  const products =
    state.status === "success" || state.status === "empty"
      ? carouselProducts(state.data, carouselId)
      : null;

  const sortedProducts = useMemo(() => {
    if (!products) return null;
    if (sort === "price") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    return products;
  }, [products, sort]);

  if (state.status === "loading") {
    return (
      <main className="route-page">
        <PageNavigation />
        <CatalogLoading />
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="route-page">
        <PageNavigation />
        <CatalogError message={state.message} onRetry={() => setAttempt((value) => value + 1)} />
      </main>
    );
  }

  if (sortedProducts === null) return <NotFound />;

  const carousel = state.data.carousels.find((item) => item.id === carouselId);
  const category = state.data.categories.find((item) => item.slug === carouselId);
  const title = carousel?.title ?? category?.name ?? (carouselId === "offers" ? "پیشنهادهای ویژه" : "محصولات");

  return (
    <main className="route-page">
      <PageNavigation />
      <div className="plp-sort" role="group" aria-label="مرتب‌سازی محصولات">
        <span className="plp-sort__label">مرتب‌سازی:</span>
        <Link
          className={`plp-sort__link${sort === "default" ? " is-active" : ""}`}
          to="/plp/$carouselId"
          params={{ carouselId }}
          search={{ sort: "default" }}
        >
          پیش‌فرض
        </Link>
        <Link
          className={`plp-sort__link${sort === "price" ? " is-active" : ""}`}
          to="/plp/$carouselId"
          params={{ carouselId }}
          search={{ sort: "price" }}
        >
          ارزان‌ترین
        </Link>
      </div>
      <ProductGrid id={carouselId} title={title} products={sortedProducts} />
    </main>
  );
}

function PageNavigation() {
  return (
    <nav className="route-page__navigation" aria-label="مسیر صفحه">
      <Link to="/">صفحه اصلی</Link>
      <Link to="/cart">سبد خرید</Link>
    </nav>
  );
}
