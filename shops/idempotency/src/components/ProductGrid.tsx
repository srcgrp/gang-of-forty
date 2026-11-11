import type { Product, Offer, Stock } from "../shared/types/products";
import ProductCard from "./ProductCard";
import CarouselControls from "./CarouselControls";
import SaleCountdown from "./SaleCountdown";

type ProductGridProps = {
  sectionId: string;
  title: string;
  products: Product[];
  offers: Offer[];
  stock: Stock;
  onAdd: (id: number) => void;
};

export default function ProductGrid({
  sectionId,
  title,
  products,
  offers,
  stock,
  onAdd,
}: ProductGridProps) {
  return (
    <section
      id={sectionId}
      className="product-section home-carousel-section"
      aria-labelledby={`carousel-title-${sectionId}`}
    >
      <h2 id={`carousel-title-${sectionId}`}>{title}</h2>
      {sectionId === "offers" && <SaleCountdown />}
      <div
        className="product-track"
        tabIndex={0}
        aria-label={`محصولات ${title}`}
      >
        {products.map((product) => {
          const availableStock = stock.items[product.id] ?? 0;
          const offer = offers.find((item) => item.productId === product.id);

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
      <CarouselControls title="{title}" />
    </section>
  );
}
