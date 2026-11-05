import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (p: Product) => void;
}) {
  if (products.length === 0)
    return <div className="state-empty">محصولی یافت نشد</div>;

  return (
    <ul className="products-grid">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} onAdd={() => onAdd(p)} />
        </li>
      ))}
    </ul>
  );
}
