import type { Product } from "../types";
import { formatPrice } from "../shared/ui/format";

interface Props {
  product: Product;
  inCart: boolean;
  onAdd: (p: Product) => void;
  onRemove: (id: number) => void;
}

export function WishlistItemRow({ product, inCart, onAdd, onRemove }: Props) {
  return (
    <li className="wishlist-item">
      <span className="wishlist-item__emoji" aria-hidden="true">
        {product.emoji || "📦"}
      </span>
      <div className="wishlist-item__info">
        <strong className="wishlist-item__name">{product.name}</strong>
        <small className="wishlist-item__price">
          {formatPrice(product.price)}
        </small>
      </div>
      <button
        type="button"
        className={`wishlist-item__add ${inCart ? "is-added" : ""}`}
        onClick={() => {
          if (!inCart) onAdd(product);
        }}
        disabled={inCart}
        aria-label={inCart ? "به سبد اضافه شد" : "افزودن به سبد"}
      >
        {inCart ? "✓" : "+"}
      </button>
      <button
        type="button"
        className="wishlist-item__remove"
        onClick={() => onRemove(product.id)}
        aria-label="حذف از علاقه‌مندی"
      >
        ✕
      </button>
    </li>
  );
}
