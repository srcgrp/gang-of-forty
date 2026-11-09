import type {
  Product,
  Offer,
  Stock,
} from "../shared/types/products";

import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  offers: Offer[];
  stock: Stock;
  onAdd: (id: number) => void;
};

export default function ProductGrid({
  products,
  offers,
  stock,
  onAdd,
}: ProductGridProps) {
  return (
    <section
      className="product-section"
      id="products"
      aria-labelledby="products-title"
    >
      <h2 id="products-title">محصولات فروشگاه</h2>

      <div className="product-track">
        {products.map((product) => {
          const availableStock = stock.items[product.id] ?? 0;

          const offer = offers.find(
            (item) => item.productId === product.id,
          );

          return (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAdd}
              availableStock={availableStock}
              {...(offer ? { offer } : {})}
            />
          );
        })}
      </div>
    </section>
  );
}