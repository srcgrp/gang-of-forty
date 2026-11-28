import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { productPrice } from "../catalog/product-price";
import type { ProductView } from "../types";
import { formatPrice } from "../utils/format";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
  item: ProductView;
};

export default memo(function ProductCard({ item }: ProductCardProps) {
  const { product, offer, stock } = item;
  const isOutOfStock = stock === 0;
  const finalPrice = productPrice(item);

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
        <p className="product-description">
          <Link to="/product/$productId" params={{ productId: String(product.id) }}>{product.name}</Link>
        </p>
        <span className="product-unit">{product.unit || ""}</span>
      </div>
      <div className="card-btn">
        <div className="prices">
          {offer && <span className="price-old">{formatPrice(product.price)}</span>}
          <p className="price-label">{formatPrice(finalPrice)}</p>
        </div>
        <AddToCartButton item={item} compact />
      </div>
    </article>
  );
});
