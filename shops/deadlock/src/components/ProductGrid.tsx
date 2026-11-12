import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  onAdd: (id: number) => void;
};

export default function ProductGrid({
  products,
  onAdd,
}: ProductGridProps) {
  return (
    <section className="tents" id="tents">
      <h2 className="titles">محصولات نمونه</h2>
      <div className="carousel">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}
