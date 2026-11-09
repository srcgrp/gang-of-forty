import type { Product } from "../scripts/types";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = {
  title: string;
  products: Product[];
  offers: Record<number, number>;
};

export default function ProductGrid({
  title,
  products,
  offers,
}: ProductGridProps) {
  return (
    <section className="recommendation">
      <h2 className="recommendation-title">{title}</h2>
      <div className="dairy-carousel">
        <div className="dairy-carousel-viewport">
          <ul className="products">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} percent={offers[p.id]} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
