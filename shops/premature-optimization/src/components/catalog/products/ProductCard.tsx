import { memo } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "../../../scripts/types";
import type { ProductDetails } from "../../../scripts/logic/catalog/product-details.ts";
import { useIsSoldOut } from "../../../hooks/useIsSoldOut.ts";
import AddToCartButton from "../../cart/AddToCartButton.tsx";
import OfferBadge from "../../shared/OfferBadge.tsx";
import Price from "../../shared/Price.tsx";
import ProductImage from "./ProductImage.tsx";

type ProductCardProps = { product: Product } & Partial<ProductDetails>;

export default memo(function ProductCard({
  product,
  offer,
  finalPrice = product.price,
  stock = 1,
  categoryName = "محصول",
}: ProductCardProps) {
  const soldOut = useIsSoldOut(product.id, stock);

  return (
    <li
      className={
        soldOut ? "product-item product-item--unavailable" : "product-item"
      }
    >
      <Link to="/product/$productId" params={{ productId: String(product.id) }}>
        <ProductImage product={product} />
      </Link>
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
        <AddToCartButton className="buy-button" product={product} stock={stock}>
          +
        </AddToCartButton>
      </div>
    </li>
  );
});
