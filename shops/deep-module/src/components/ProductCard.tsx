import type { ProductCardProps } from "../types";
import { formatPrice } from "../shared/ui/format";

export function ProductCard({
  product,
  stock,
  discountPercent,
  onAdd,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <span className="product-card__emoji">{product.emoji || "📦"}</span>
        {discountPercent && <span className="badge">{discountPercent}%</span>}
      </div>
      <h3 className="product-card__title">{product.name}</h3>
      <div className="product-card__footer">
        <div className="product-card__price">
          <ins>{formatPrice(product.price)}</ins>
        </div>
        <button
          className="btn-add"
          onClick={() => onAdd(product.id)}
          disabled={stock === 0}
        >
          +
        </button>
      </div>
    </article>
  );
}
