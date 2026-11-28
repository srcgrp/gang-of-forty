import { Link } from "@tanstack/react-router";
import type { StoreData } from "../features/products/api/store-data";
import type { Product } from "../shared/types/products";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  products: Product[];
  catalog: StoreData;
};

export default function PlpProducts({ title, products, catalog }: Props) {
  return (
    <section className="product-section" aria-labelledby="plp-title">
      <h2 id="plp-title">{title}</h2>
      <p className="plp-count">
        {products.length.toLocaleString("fa-IR")} محصول
      </p>

      {products.length === 0 ? (
        <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>
      ) : (
        <div className="plp-grid">
          {products.map((product) => {
            const offer = catalog.offers.find(
              (item) => item.productId === product.id,
            );

            return (
              <ProductCard
                key={product.id}
                product={product}
                availableStock={catalog.stock.items[product.id] ?? 0}
                {...(offer ? { offer } : {})}
              />
            );
          })}
        </div>
      )}

      <div className="plp-actions">
        <Link to="/" className="retry-button">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
