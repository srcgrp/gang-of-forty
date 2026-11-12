import { stateForProducts } from "../catalog/product-state";
import type { LoadState } from "../types";
import ProductGrid from "./ProductGrid";

type LatestProductsProps = {
  state: LoadState;
  categoryId: number | null;
  onAdd: (id: number) => void;
};

export default function LatestProducts({ state, categoryId, onAdd }: LatestProductsProps) {
  const productViews = state.status === "success" ? state.products : [];
  const latest = [...productViews]
    .sort((a, b) => b.product.id - a.product.id)
    .slice(0, 8)
    .filter(({ product }) => categoryId === null || product.categoryId === categoryId);

  return (
    <>
      <h2 id="latest-products" className="section-title">
        جدیدترین‌ها
      </h2>
      <ProductGrid
        state={stateForProducts(state, latest)}
        onAdd={onAdd}
        id="latest-carousel"
      />
    </>
  );
}
