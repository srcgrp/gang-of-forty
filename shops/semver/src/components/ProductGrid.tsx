import type { LoadState } from "../types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  state: LoadState;
  onAdd: (id: number) => void;
  id?: string;
};

const renderStatus = (state: LoadState, onAdd: (id: number) => void) => {
  switch (state.status) {
    case "loading":
      return (
        <p className="loading-state" role="status">
          در حال بارگذاری محصولات...
        </p>
      );
    case "empty":
      return <p>فعلاً محصولی نیست.</p>;
    case "error":
      return (
        <p className="error-state" role="alert">
          خطا در بارگذاری اطلاعات: {state.message}
        </p>
      );
    case "success":
      return state.products.map((item) => (
        <ProductCard key={item.product.id} item={item} onAdd={onAdd} />
      ));
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
};

export default function ProductGrid({ state, onAdd, id }: ProductGridProps) {
  return (
    <article className="flex-item-product" id={id}>
      {renderStatus(state, onAdd)}
    </article>
  );
}
