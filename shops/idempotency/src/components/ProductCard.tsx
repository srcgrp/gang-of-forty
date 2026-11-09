
import type { Product } from "../shared/types/products";
import { productImages } from "../features/products/data";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = productImages[product.id];

  return (
    <article className="product-card">
      {imagePath ? (
        <img
          className="product-image"
          src={imagePath}
          alt=""
          loading="lazy"
        />
      ) : (
        <span className="product-emoji" aria-hidden="true">
          {product.emoji ?? "🛒"}
        </span>
      )}

      <h3>{product.name}</h3>
      <p className="product-meta">{product.unit}</p>

      <p className="product-price">
        {product.price.toLocaleString("fa-IR")} تومان
      </p>

      <button type="button" disabled>
        افزودن به سبد
      </button>
    </article>
  );
}
