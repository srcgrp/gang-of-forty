import { LATEST_CAROUSEL, latestProducts } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { ProductLoadState } from "../types";
import CarouselLink from "./CarouselLink";
import ProductGrid from "./ProductGrid";

type LatestProductsProps = {
  state: ProductLoadState;
  categoryId: number | null;
};

export default function LatestProducts({ state, categoryId }: LatestProductsProps) {
  const latest = state.status === "success" ? latestProducts(state.data, categoryId) : [];

  return (
    <>
      <h2 id="latest-products" className="section-title carousel-title">
        <span>{LATEST_CAROUSEL.title}</span>
        <CarouselLink carouselId={LATEST_CAROUSEL.id} title={LATEST_CAROUSEL.title} />
      </h2>
      <ProductGrid
        state={stateForProducts(state, latest)}
        id="latest-carousel"
      />
    </>
  );
}
