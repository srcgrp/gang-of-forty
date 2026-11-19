import type { ProductCardData } from "../types";
import ProductCard from "./ProductCard";
import { Link } from "@tanstack/react-router";

interface ProductGridProps {
  products: ProductCardData[];
  title?: string;
  emoji?: string;
  id?: string;
  showAll?: boolean;
}

export default function ProductGrid({
  products, title = "محصولات", emoji, id = "products", showAll = false,
}: ProductGridProps) {
  return (
    <section className="carousel-container anchor-section" id={id}>
      <div className="carousel-header">
        <h2 className="section-title"><span>{title}</span>{emoji && <span aria-hidden="true">{emoji}</span>}</h2>
        {showAll && (
          <Link className="categories__link" to="/plp/$carouselId" params={{ carouselId: id }} search={{ sort: "default" }}>
            مشاهده همه
          </Link>
        )}
      </div>
      {products.length > 0 ? (
        <div className="carousel-track">
          {products.map((item) => (
            <ProductCard
              key={item.product.id}
              product={item.product}
              price={item.price}
              originalPrice={item.originalPrice}
              discountPercent={item.discountPercent}
              outOfStock={item.outOfStock}
            />
          ))}
        </div>
      ) : <p className="product-empty">محصولی برای نمایش وجود ندارد</p>}
    </section>
  );
}
