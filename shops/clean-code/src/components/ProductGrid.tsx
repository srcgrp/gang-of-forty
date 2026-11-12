import type { Product } from "../types/product.ts";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = { products: Product[] };

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="product-grid">
      <ul>
        {products.map(function (product) {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
