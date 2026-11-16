import type { Offer, Product } from "../../scripts/types";
import OfferBadge from "../shared/OfferBadge.tsx";
import Price from "../shared/Price.tsx";
import { assetUrl } from "../../lib/assetUrl.ts";
import { addedFeedback } from "../../lib/animations/feedback.ts";
import { useCartStore } from "../../hooks/useCartStore.ts";

type ProductCardProps = {
  product: Product;
  offer?: Offer;
  finalPrice?: number;
  stock?: number;
  categoryName?: string;
};

export default function ProductCard({
  product,
  offer,
  finalPrice = product.price,
  stock = 1,
  categoryName = "محصول",
}: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  const inCart = useCartStore((s) => s.cart[String(product.id)] ?? 0);
  const soldOut = stock - inCart <= 0;

  return (
    <li
      className={
        soldOut ? "product-item product-item--unavailable" : "product-item"
      }
    >
      <div className="product-icon product-emoji">
        {product.image ? (
          <img src={assetUrl(product.image)} alt={product.name} />
        ) : (
          <span className="product-emoji-char">{product.emoji || "🛍️"}</span>
        )}
      </div>
      <p className="item-tag">{categoryName}</p>
      {offer && <OfferBadge percent={offer.percent} />}
      <h3 className="item-title">{product.name}</h3>
      <p className="item-description">{product.unit}</p>
      {offer && (
        <p className="item-old-price">
          <Price value={product.price} />
        </p>
      )}
      <div className="item-buy">
        <Price value={finalPrice} className="item-price" />
        <button
          className="buy-button"
          type="button"
          disabled={soldOut}
          title={
            soldOut
              ? "موجودی این محصول تمام شده است"
              : `افزودن ${product.name} به سبد خرید`
          }
          onClick={(e) => {
            add(product.id);
            addedFeedback(e.currentTarget);
          }}
        >
          +
        </button>
      </div>
    </li>
  );
}
