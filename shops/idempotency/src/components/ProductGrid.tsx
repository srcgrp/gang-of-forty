
import type { Product } from "../shared/types/products";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section
      className="product-section"
      id="products"
      aria-labelledby="products-title"
    >
      <h2 id="products-title">محصولات فروشگاه</h2>

      <div className="product-track">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
