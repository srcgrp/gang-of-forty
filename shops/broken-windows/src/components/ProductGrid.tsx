import ProductCard from "./ProductCard";
import type { Product, Offer, StockData } from "../types";
import ArrowLeft from "./ArrowLeft";
type ProductGridProps = {
  title: string;
  id: string;
  nuts?: boolean;
  products: Product[];
  offers: Offer[];
  stock: StockData;
};
export default function ProductGrid({
  title,
  id,
  nuts = false,
  products,
  offers,
  stock,
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
     <ArrowLeft/>
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
            
            />
          );
        })}
      </div>
    </article>
  );
}