import type { ProductCardProps } from "../types";
import { formatPrice, faNum } from "../shared/ui/format";

export function ProductCard({
  product,
  stock,
  discountPercent,
  cartQuantity = 0,
  onAdd,
}: ProductCardProps) {
  const available = stock ?? Infinity;
  const remaining = available - cartQuantity;
  const isOutOfStock = available === 0;
  const isFull = remaining <= 0 && available !== Infinity;

  const unavailable = isOutOfStock || isFull;

  return (
    <article
      className={`product-card ${unavailable ? "product-card--unavailable" : ""}`}
      data-id={product.id}
    >
      <div className="product-card__media">
        <span className="product-card__emoji">{product.emoji || "📦"}</span>
        {unavailable ? (
          <span className="badge badge--danger">ناموجود</span>
        ) : (
          discountPercent && <span className="badge">{discountPercent}%</span>
        )}
      </div>
      <h3 className="product-card__title">{product.name}</h3>
      {product.unit && <p className="product-card__meta">{product.unit}</p>}

      {unavailable ? (
        <p className="product-card__stock product-card__stock--out">
          ✗ {isOutOfStock ? "ناموجود" : "تموم شد"}
        </p>
      ) : (
        available !== Infinity && (
          <p
            className={`product-card__stock ${
              remaining <= 3
                ? "product-card__stock--low"
                : "product-card__stock--ok"
            }`}
          >
            {remaining <= 3 && "⚠ "}
            {faNum(remaining)} عدد موجود
          </p>
        )
      )}

      <div className="product-card__footer">
        <div className="product-card__price">
          <ins>{formatPrice(product.price)}</ins>
        </div>
        <button
          className="btn-add"
          onClick={() => onAdd(product.id)}
          disabled={unavailable}
          aria-label={unavailable ? "ناموجود" : "افزودن به سبد"}
        >
          +
        </button>
      </div>
    </article>
  );
}
