import { Link } from "@tanstack/react-router";
import type { Product } from "../types";
import { faNum } from "../shared/ui/format";
import { useWishlistStore } from "../hooks/useWishlistStore";

interface Props {
  product: Product;
  bgGradient: string;
  unavailable: boolean;
  discountPercent?: number | undefined;
}

export function ProductCardMedia({
  product,
  bgGradient,
  unavailable,
  discountPercent,
}: Props) {
  const isLiked = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  return (
    <>
      {discountPercent && !unavailable && (
        <span className="product-card__discount">
          <span className="product-card__discount-fire">🔥</span>
          {faNum(discountPercent)}٪
        </span>
      )}
      <button
        type="button"
        className={`product-card__wishlist ${isLiked ? "is-liked" : ""}`}
        aria-label={
          isLiked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
        }
        aria-pressed={isLiked}
        onClick={() => toggleWishlist(product.id, product.name)}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <Link
        to="/product/$productId"
        params={{ productId: String(product.id) }}
        className="product-card__media"
        style={{ background: bgGradient }}
      >
        <span className="product-card__emoji">{product.emoji || "📦"}</span>
      </Link>
    </>
  );
}
