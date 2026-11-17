import type { Offer, Product } from "../types";
import { calculateDiscountedPrice } from "../shared/pricing";

type ProductCardProps = {
  product: Product;
  offer?: Offer | undefined;
  stockCount: number;
  onAdd: (id: number) => void;
};

export default function ProductCard({
  product,
  offer,
  stockCount,
  onAdd,
}: ProductCardProps) {
  const price = offer
    ? calculateDiscountedPrice(product.price, offer.percent)
    : product.price;

  return (
    <article className="tent-article">
      <span className="product-emoji" aria-hidden="true">
        {product.emoji}
      </span>
      <h3>{product.name}</h3>
      <p>{product.unit}</p>
      {offer && <span className="discount-badge">{offer.percent.toLocaleString("fa-IR")}٪</span>}
      {stockCount === 0 && <p className="stock-label">ناموجود</p>}
      <div>
        <div className="product-prices">
          {offer && <p className="discount-price">{product.price.toLocaleString("fa-IR")} تومان</p>}
          <p className={offer ? "discounted-price" : ""}>{price.toLocaleString("fa-IR")} تومان</p>
        </div>
        <button
          type="button"
          className="add-to-cart"
          aria-label={stockCount === 0 ? `${product.name} ناموجود است` : `افزودن ${product.name} به سبد خرید`}
          disabled={stockCount === 0}
          onClick={() => onAdd(product.id)}
        >
          +
        </button>
      </div>
    </article>
  );
}
