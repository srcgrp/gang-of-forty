import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { carouselProducts } from "../catalog/catalog-logic";
import CatalogError from "../components/catalog/CatalogError";
import CatalogLoading from "../components/catalog/CatalogLoading";
import ProductGrid from "../components/ProductGrid";
import { useCatalog } from "../hooks/useCatalog";
import NotFound from "./NotFound";

export default function PLP() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const [attempt, setAttempt] = useState(0);
  const state = useCatalog(attempt);

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

  const products = carouselProducts(state.data, carouselId);
  if (products === null) return <NotFound />;

  const carousel = state.data.carousels.find((item) => item.id === carouselId);
  const category = state.data.categories.find((item) => item.slug === carouselId);
  const title = carousel?.title ?? category?.name ?? (carouselId === "offers" ? "پیشنهادهای ویژه" : "محصولات");

  return (
    <main className="route-page">
      <PageNavigation />
      <ProductGrid id={carouselId} title={title} products={products} />
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
