type ProductCardProps = {
  discount?: string;
  unavailable?: boolean;
};
import {formatNumber, formatPrice} from "../ui/format"
export default function ProductCard({
  discount,
  unavailable,
}: ProductCardProps) {
  return (
    <div className={`special-offer-item${unavailable ? " unavailable" : ""}`}>
      <div className="special-offer-image">
        <span className="discount-badge">{formatNumber(3)}٪</span><img src="./images/bedikas-chametz.png"
                            alt="نان تست سبوسدار"/>

        {discount && (
          <span className={unavailable ? "unavailable-badge" : "discount-badge"}>
            {unavailable ? "ناموجود" : discount}
          </span>
        )}
      </div>


      <h3 className="special-offer-name">نان تست</h3>

      <p className="special-offer-unit">{formatNumber(380)} گرمی</p>

      <div className="special-offer-item-details">
        <p className="special-offer-price">{formatPrice(3000)}</p>

        <button
          type="button"
          disabled={unavailable}
          className="add-button"
          aria-label=""
        >
          +
        </button>
      </div>
    </div>
  );
}