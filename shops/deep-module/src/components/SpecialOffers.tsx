import type { Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  offers: Offer[];
  stock: StockData;
  onAdd: (p: Product) => void;
}

export function SpecialOffers({ products, offers, stock, onAdd }: Props) {
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));
  const specials = products.filter((p) => offerMap.has(p.id)).slice(0, 6);
  if (specials.length === 0) return null;

  return (
    <section id="special" className="carousel-section">
      <div className="carousel-section__head">
        <h2 className="section-head__title">
          <span aria-hidden="true">🔥</span> پیشنهاد ویژه امروز
        </h2>
        <a href="#all-products" className="section-head__link">
          مشاهده همه ←
        </a>
      </div>
      <div
        className="carousel"
        role="region"
        aria-label="کاروسل پیشنهاد ویژه"
        tabIndex={0}
      >
        <ul className="carousel__track">
          {specials.map((p) => (
            <li key={p.id}>
              <ProductCard
                product={p}
                stock={stock.items[p.id]}
                discountPercent={offerMap.get(p.id)}
                onAdd={() => onAdd(p)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
