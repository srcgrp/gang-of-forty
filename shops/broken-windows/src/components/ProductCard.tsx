import type { Product } from "../types";
import { formatNumber, formatPrice } from "../ui/format";
type ProductCardProps = {
  product: Product;
  percent?: number;
  unavailable?: boolean;
  finalPrice: number;
  onAdd: (id: number) => void;
};
export default function ProductCard({
  product,
  percent,
  unavailable = false,
  finalPrice,
  onAdd,
}: ProductCardProps) {
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
          onClick={() => onAdd(product.id)}
        >
          +
        </button>
      </div>
    </div>
  );
}
