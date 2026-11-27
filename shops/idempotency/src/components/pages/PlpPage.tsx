import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import {
  carouselProducts,
  findCarousel,
} from "../../features/products/logic/carousel-products";
import { createProductSearch } from "../../features/products/logic/search";
import Header from "../Header";
import Footer from "../Footer";
import LoadStatus from "../LoadStatus";
import PlpProducts from "../PlpProducts";
import NotFound from "./NotFound";

const ignoreCategory = () => {};

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { loadState, catalog, retry } = useCatalog();
  const [query, setQuery] = useState("");

  const carousel = catalog ? findCarousel(catalog, carouselId) : undefined;
  const products = catalog ? carouselProducts(catalog, carouselId) : null;
  const matches =
    catalog && products && query.trim()
      ? (createProductSearch(products, catalog.categories, () => null)(
          query.trim(),
        ) ?? [])
      : [];

  return (
    <>
      <Header
        shop={catalog?.shop ?? null}
        onPickCategory={ignoreCategory}
        data={catalog}
        query={query}
        matches={matches}
        onQuery={setQuery}
      />
      <main id="main-content">
        {loadState.status !== "success" || !catalog ? (
          <section id="products" className="product-section">
            <LoadStatus state={loadState} onRetry={retry} />
          </section>
        ) : carousel && products ? (
          <PlpProducts
            title={carousel.title}
            products={products}
            catalog={catalog}
          />
        ) : (
          <NotFound message="این فهرست پیدا نشد" />
        )}
      </main>
      <Footer
        shop={catalog?.shop ?? null}
        categories={catalog?.categories ?? []}
        onPickCategory={ignoreCategory}
      />
    </>
  );
}
