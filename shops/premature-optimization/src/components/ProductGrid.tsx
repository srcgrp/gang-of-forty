import type { Category, Offer, Product, Stock } from "../scripts/types";
import { calculatePrice } from "../scripts/logic/catalog/calculate-price.ts";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = {
  id?: string;
  title: string;
  products: Product[];
  offers: Offer[];
  stock: Stock;
  categories: Category[];
  onAdd: (id: number) => void;
};

export default function ProductGrid({
  id,
  title,
  products,
  offers,
  stock,
  categories,
  onAdd,
}: ProductGridProps) {
  return (
    <section className="recommendation" id={id}>
      <h2 className="recommendation-title">{title}</h2>
      <div className="dairy-carousel">
        <div className="dairy-carousel-viewport">
          <ul className="products">
            {products.map((product) => {
              const offer = offers.find((o) => o.productId === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  offer={offer}
                  finalPrice={calculatePrice(product.price, offer)}
                  quantity={stock.items[String(product.id)] ?? 0}
                  categoryName={
                    categories.find((c) => c.id === product.categoryId)?.name
                  }
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
