import type { ProductCardData } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: ProductCardData[];
  onAdd: (id: number) => void;
  title?: string;
  emoji?: string;
  id?: string;
}

export default function ProductGrid({
  products, onAdd, title = "محصولات", emoji, id = "products",
}: ProductGridProps) {
  return (
    <section className="carousel-container anchor-section" id={id}>
      <div className="carousel-header">
        <h2 className="section-title"><span>{title}</span>{emoji && <span aria-hidden="true">{emoji}</span>}</h2>
      </div>
      {products.length > 0 ? (
        <div className="carousel-track">
          {products.map((item) => (
            <ProductCard key={item.product.id} product={item.product} price={item.price}
              originalPrice={item.originalPrice} discountPercent={item.discountPercent}
              outOfStock={item.outOfStock} onAdd={onAdd} />
          ))}
        </div>
      ) : <p className="product-empty">محصولی برای نمایش وجود ندارد</p>}
    </section>
  );
}
