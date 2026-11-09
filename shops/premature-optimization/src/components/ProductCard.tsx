import type { Product } from "../scripts/types";
import OfferBadge from "./OfferBadge.tsx";
import Price from "./Price.tsx";
import { CATEGORIES } from "./sampleData.ts";

type ProductCardProps = { product: Product; percent?: number };

export default function ProductCard({ product, percent }: ProductCardProps) {
  const finalPrice = percent
    ? Math.round((product.price * (100 - percent)) / 100)
    : product.price;

  return (
    <li className="product-item">
      <div className="product-icon product-emoji">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span className="product-emoji-char">{product.emoji || "🛍️"}</span>
        )}
      </div>
      <p className="item-tag">
        {CATEGORIES.find((c) => c.id === product.categoryId)?.name ?? "محصول"}
      </p>
      {percent ? <OfferBadge percent={percent} /> : null}
      <h3 className="item-title">{product.name}</h3>
      <p className="item-description">{product.unit}</p>
      {percent ? (
        <p className="item-old-price">
          <Price value={product.price} />
        </p>
      ) : null}
      <div className="item-buy">
        <Price value={finalPrice} className="item-price" />
        <button
          className="buy-button"
          type="button"
          title={`افزودن ${product.name} به سبد خرید`}
        >
          +
        </button>
      </div>
    </li>
  );
}
