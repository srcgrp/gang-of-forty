import ProductCard from "./ProductCard";
import type { Product, Offer, StockData } from "../types";

type ProductGridProps = {
  title: string;
  id: string;
  nuts?: boolean;
  products: Product[];
  offers: Offer[];
  stock: StockData;
  onAdd: (id: number) => void;
};

export default function ProductGrid({
  title,
  id,
  nuts = false,
  products,
  offers,
  stock,
  onAdd,
}: ProductGridProps) {
  return (
    <article className="special-offer" id={id}>
      <div className="special-offer-title">
        <h2 className="items-header">{title}</h2>

        <a
          className="items-header-link"
          href={nuts ? "#candy" : "#frozen"}
        >
          <span>مشاهده همه</span>

          <span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4537E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l4 4" />
              <path d="M5 12l4 -4" />
            </svg>
          </span>
        </a>
      </div>

      <div className="special-offer-items">
        {products.map((p) => {
          const percent = offers.find(
            (offer) => offer.productId === p.id
          )?.percent;

          const unavailable = (stock.items[p.id] ?? 0) <= 0;

          const finalPrice =
            percent !== undefined
              ? Math.round(p.price * (100 - percent) / 100)
              : p.price;

          return (
            <ProductCard
              key={p.id}
              product={p}
              percent={percent}
              unavailable={unavailable}
              finalPrice={finalPrice}
              onAdd={onAdd}
            />
          );
        })}
      </div>
    </article>
  );
}