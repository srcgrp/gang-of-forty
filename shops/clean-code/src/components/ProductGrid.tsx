import type { Offer, Product } from "../types/product.ts";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = {
  products: Product[];
  stock: Record<number, number>;
  offers: Offer[];
  onAdd: (id: number) => void;
};
export default function ProductGrid({
  products,
  stock,
  offers,
  onAdd,
}: ProductGridProps) {
  return (
    <section className="product-grid">
      <ul className="row">
        {products.map(function (product) {
          const offer = offers.find(function (item) {
            return item.productId === product.id;
          });
          return (
            <li key={product.id}>
              <ProductCard
                product={product}
                qty={stock[product.id] ?? 0}
                percent={offer ? offer.percent : 0}
                onAdd={onAdd}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
