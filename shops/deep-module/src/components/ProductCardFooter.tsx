import type { Product } from "../types";
import { formatPrice } from "../shared/ui/format";
import { useCartStore } from "../hooks/useCartStore";

interface Props {
  product: Product;
  available: number;
  originalPrice: number | null;
}

export function ProductCardFooter({ product, available, originalPrice }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const unavailable = available === 0;

  return (
    <div className="product-card__footer">
      {originalPrice && !unavailable && originalPrice > product.price && (
        <del className="product-card__price-old">{formatPrice(originalPrice)}</del>
      )}
      <div className="product-card__price-row">
        <span className="product-card__price">{formatPrice(product.price)}</span>
        {unavailable ? (
          <button type="button" className="product-card__add product-card__add--disabled" disabled>
            ناموجود
          </button>
        ) : (
          <button
            type="button"
            className="product-card__add"
            onClick={() => addToCart(product, available)}
            aria-label={`افزودن ${product.name} به سبد`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="product-card__add-label">افزودن</span>
          </button>
        )}
      </div>
    </div>
  );
}
