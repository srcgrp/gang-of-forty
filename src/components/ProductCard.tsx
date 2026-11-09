import type { ProductCardProps } from "../types";
import { formatPrice, faNum } from "../shared/ui/format";

export function ProductCard({
  product,
  stock,
  discountPercent,
  onAdd,
  isLiked = false,
  onToggleWishlist,
}: ProductCardProps) {
  const available = stock ?? Infinity;
  const isOutOfStock = available === 0;
  const unavailable = isOutOfStock;

  const originalPrice =
    product.oldPrice ||
    (discountPercent
      ? Math.round(product.price / (1 - discountPercent / 100))
      : null);

  const gradients = [
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
    "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  ];
  const bgGradient = gradients[product.id % gradients.length];

  return (
    <article
      className={`product-card ${unavailable ? "product-card--unavailable" : ""}`}
    >
      <div
        className="product-card__glow"
        style={{ background: bgGradient }}
        aria-hidden="true"
      />

      {discountPercent && !unavailable && (
        <span className="product-card__discount">
          <span className="product-card__discount-fire">🔥</span>
          {faNum(discountPercent)}٪
        </span>
      )}

      <button
        type="button"
        className={`product-card__wishlist ${isLiked ? "is-liked" : ""}`}
        aria-label={isLiked ? "اضافه شد" : "افزودن به علاقه‌مندی"}
        disabled={isLiked}
        onClick={() => {
          if (!isLiked) onToggleWishlist?.(product);
        }}
      >
        {isLiked ? (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
      </button>

      <div className="product-card__media" style={{ background: bgGradient }}>
        <span className="product-card__emoji">{product.emoji || "📦"}</span>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title" title={product.name}>
          {product.name}
        </h3>
        {product.unit && <p className="product-card__unit">{product.unit}</p>}

        {product.rating !== undefined && (
          <div className="product-card__rating">
            <span className="product-card__star">★</span>
            <span className="product-card__rating-num">
              {faNum(product.rating)}
            </span>
            {product.reviews !== undefined && (
              <span className="product-card__reviews">
                ({faNum(product.reviews)})
              </span>
            )}
          </div>
        )}

        {available !== Infinity && (
          <div className="product-card__stock-row">
            {available === 0 ? (
              <span className="product-card__stock product-card__stock--out">
                ناموجود
              </span>
            ) : available <= 5 ? (
              <span className="product-card__stock product-card__stock--low">
                ⚡ فقط {faNum(available)} عدد
              </span>
            ) : (
              <span className="product-card__stock product-card__stock--ok">
                موجودی: {faNum(available)} عدد
              </span>
            )}
          </div>
        )}
      </div>

      <div className="product-card__footer">
        {originalPrice && !unavailable && originalPrice > product.price && (
          <del className="product-card__price-old">
            {formatPrice(originalPrice)}
          </del>
        )}

        <div className="product-card__price-row">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>

          {unavailable ? (
            <button
              className="product-card__add product-card__add--disabled"
              disabled
            >
              ناموجود
            </button>
          ) : (
            <button
              type="button"
              className="product-card__add"
              onClick={() => onAdd(product.id)}
              aria-label="افزودن به سبد"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
