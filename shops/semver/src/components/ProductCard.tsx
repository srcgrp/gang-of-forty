import type { ProductView } from "../types";
import { formatPrice } from "../ui/format";

type ProductCardProps = {
  item: ProductView;
  onAdd: (id: number) => void;
};

const discountedPrice = (price: number, percent: number): number =>
  Math.round((price * (100 - percent)) / 100);

export default function ProductCard({ item, onAdd }: ProductCardProps) {
  const { product, offer, stock } = item;
  const isOutOfStock = stock === 0;
  const finalPrice = offer
    ? discountedPrice(product.price, offer.percent)
    : product.price;

  return (
    <article className={`product-cart${isOutOfStock ? " out-of-stock" : ""}`}>
      {offer && !isOutOfStock && (
        <span className="offer-badge">{offer.percent}٪ تخفیف</span>
      )}
      {isOutOfStock && <span className="stock-badge">ناموجود</span>}
      <div className="img">
        <span
          className="img-product"
          style={{ fontSize: "4rem", display: "grid", placeItems: "center" }}
        >
          {product.emoji || "📦"}
        </span>
      </div>
      <div className="product-details">
        <p className="product-description">{product.name}</p>
        <span className="product-unit">{product.unit || ""}</span>
      </div>
      <div className="card-btn">
        <div className="prices">
          {offer && <span className="price-old">{formatPrice(product.price)}</span>}
          <p className="price-label">{formatPrice(finalPrice)}</p>
        </div>
        <button
          className="buynow-btn"
          type="button"
          data-product-id={product.id}
          aria-label={
            isOutOfStock
              ? `${product.name} ناموجود است`
              : `افزودن ${product.name} به سبد خرید`
          }
          disabled={isOutOfStock}
          onClick={() => onAdd(product.id)}
        >
          +
        </button>
      </div>
    </article>
  );
}
