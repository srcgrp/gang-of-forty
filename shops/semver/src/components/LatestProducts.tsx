import { latestProducts } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { ProductLoadState } from "../types";
import ProductGrid from "./ProductGrid";

type LatestProductsProps = {
  state: ProductLoadState;
  categoryId: number | null;
};

export default function LatestProducts({ state, categoryId }: LatestProductsProps) {
  const latest = state.status === "success" ? latestProducts(state.data, categoryId) : [];

  return (
    <>
      <h2 id="latest-products" className="section-title">
        جدیدترین‌ها
      </h2>
      <ProductGrid
        state={stateForProducts(state, latest)}
        id="latest-carousel"
      />
    </>
  );
}
