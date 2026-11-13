import type { Product } from "../types";
import { formatNumber, formatPrice } from "../format";
import { useCartStore } from "../hooks/useCartStore";
type ProductCardProps = {
  product: Product;
  percent?: number;
  unavailable?: boolean;
  finalPrice: number;
};
export default function ProductCard({
  product,
  percent,
  unavailable = false,
  finalPrice
}: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  return (
    <div className={`special-offer-item${unavailable ? " unavailable" : ""}`}>
      <div className="special-offer-image">
        <span className="special-offer-emoji">{product.emoji}</span>
        {unavailable ? (
          <span className="unavailable-badge">ناموجود</span>
        ) : percent !== undefined ? (
          <span className="discount-badge">
            {formatNumber(percent)}٪
          </span>
        ) : null}
      </div>
      <h3 className="special-offer-name">{product.name}</h3>
      <p className="special-offer-unit">{product.unit}</p>
      <div className="special-offer-item-details">
        <p className="special-offer-price">{formatPrice(finalPrice)}</p>
        <button
          type="button"
          disabled={unavailable}
          className="add-button"
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={() => add(product, finalPrice)}
        >
          +
        </button>
      </div>
    </div>
  );
}
