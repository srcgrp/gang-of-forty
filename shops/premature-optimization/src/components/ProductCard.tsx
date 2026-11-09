import type { Offer, Product } from "../scripts/types";
import OfferBadge from "./OfferBadge.tsx";
import Price from "./Price.tsx";
import { assetUrl } from './Art.tsx'

type ProductCardProps = {
  product: Product;
  onAdd: (id: number) => void;
  offer?: Offer;
  finalPrice?: number;
  quantity?: number;
  categoryName?: string;
};

export default function ProductCard({
  product,
  onAdd,
  offer,
  finalPrice = product.price,
  quantity = 1,
  categoryName = "محصول",
}: ProductCardProps) {
  const soldOut = quantity <= 0;

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
          onClick={() => onAdd(product.id)}
        >
          +
        </button>
      </div>
    </li>
  );
}
