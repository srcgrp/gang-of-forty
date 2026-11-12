import type { LoadState, Offer, Product, Stock } from "../types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  id: string;
  title: string;
  products: Product[];
  status: LoadState["status"];
  message: string;
  stock: Stock | undefined;
  offers: Offer[];
  onAdd: (id: number) => void;
};

export default function ProductGrid({
  id,
  title,
  products,
  status,
  message,
  stock,
  offers,
  onAdd,
}: ProductGridProps) {
  return (
    <section className="tents" id={id}>
      <h2 className="titles">{title}</h2>
      {status !== "success" ? (
        <p className="carousel-message">
          {status === "loading" ? "در حال بارگذاری..." : message}
        </p>
      ) : products.length === 0 ? (
        <p className="carousel-message">محصولی برای نمایش نیست.</p>
      ) : (
        <div className="carousel">
          {products.map((product) => {
            const stockCount = stock?.items[product.id] ?? 0;
            const offer = offers.find((item) => item.productId === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                stockCount={stockCount}
                offer={offer}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
