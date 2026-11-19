import type { Catalog, LoadState, Offer, Product, Stock } from "../types";
import { Link } from "@tanstack/react-router";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  id: string;
  title: string;
  products: Product[];
  status: LoadState<Catalog>["status"];
  message: string;
  stock: Stock | undefined;
  offers: Offer[];
  carouselId?: string;
  isPlp?: boolean;
  onRetry?: () => void;
};

export default function ProductGrid({
  id,
  title,
  products,
  status,
  message,
  stock,
  offers,
  carouselId,
  isPlp = false,
  onRetry,
}: ProductGridProps) {
  return (
    <section className={`tents${isPlp ? " plp-section" : ""}`} id={id}>
      <div className="section-header">
        <h2 className="titles">{title}</h2>
        {carouselId && !isPlp && (
          <Link to="/plp/$carouselId" params={{ carouselId }}>مشاهده همه ←</Link>
        )}
      </div>
      {status !== "success" ? (
        <div className={status === "error" ? "load-error" : undefined} role={status === "error" ? "alert" : undefined}>
          <p className="carousel-message">{status === "loading" ? "در حال بارگذاری..." : message}</p>
          {status === "error" && onRetry && <button className="retry-button" type="button" onClick={onRetry}>تلاش دوباره</button>}
        </div>
      ) : products.length === 0 ? (
        <p className="carousel-message">محصولی برای نمایش نیست.</p>
      ) : (
        <div className={isPlp ? "plp-grid" : "carousel"}>
          {products.map((product) => {
            const stockCount = stock?.items[product.id] ?? 0;
            const offer = offers.find((item) => item.productId === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                stockCount={stockCount}
                offer={offer}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
