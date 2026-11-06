import type { Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";

export function SpecialOffers({
  products,
  offers,
  stock,
  onAdd,
}: {
  products: Product[];
  offers: Offer[];
  stock: StockData;
  onAdd: (p: Product) => void;
}) {
  const offerIds = new Set(offers.map((o) => o.productId));
  const specials = products.filter((p) => offerIds.has(p.id)).slice(0, 6);
  if (specials.length === 0) return null;
  return (
    <section id="special" className="carousel-section">
      <div className="carousel-section__head">
        <h2 className="section-head__title">
          <span>🔥</span> پیشنهاد ویژه امروز
        </h2>
      </div>
      <div className="carousel">
        <ul className="carousel__track">
          {specials.map((p) => {
            const offer = offers.find((o) => o.productId === p.id);
            return (
              <li key={p.id}>
                <ProductCard
                  product={p}
                  stock={stock.items[p.id]}
                  discountPercent={offer?.percent}
                  onAdd={() => onAdd(p)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
