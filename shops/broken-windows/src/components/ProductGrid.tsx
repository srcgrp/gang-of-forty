import ProductCard from "./ProductCard";
import type { Product, Offer, StockData } from "../types";
import ArrowLeft from "./ArrowLeft";
import { formatNumber } from "../format";
import { Link } from "@tanstack/react-router";
type ProductGridProps = {
  title: string;
  id: string;
  viewAll?: { carouselId: string; total: number };
  products: Product[];
  offers: Offer[];
  stock: StockData;
  wrap?: boolean;
};
export default function ProductGrid({
  title,
  id,
  viewAll,
  products,
  offers,
  stock,
   wrap=false,
}: ProductGridProps) {
  return (
    <article className="special-offer" id={id}>
      <div className="special-offer-title">
        <h2 className="items-header">{title}</h2>
        {viewAll && (
       <Link
       search={{ sort: "default" }}
        className="items-header-link"
        to="/plp/$carouselId"
        params={{ carouselId: viewAll.carouselId }}
        >
    <span>مشاهده همه ({formatNumber(viewAll.total)})</span>
    <span><ArrowLeft /></span>
  </Link>
        )}
     </div>
            <div className={wrap ? "special-offer-items wrap" : "special-offer-items"}>
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