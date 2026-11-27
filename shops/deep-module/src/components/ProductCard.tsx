import { memo } from "react";
import type { Product } from "../types";
import { ProductCardMedia } from "./ProductCardMedia";
import { ProductCardBody } from "./ProductCardBody";
import { ProductCardFooter } from "./ProductCardFooter";

const GRADIENTS = [
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
  "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
];

interface Props {
  product: Product;
  stock?: number | undefined;
  discountPercent?: number | undefined;
}

export const ProductCard = memo(function ProductCard({ product, stock, discountPercent }: Props) {
  const available = stock ?? Infinity;
  const unavailable = available === 0;
  const originalPrice =
    product.oldPrice ||
    (discountPercent ? Math.round(product.price / (1 - discountPercent / 100)) : null);
  const bgGradient = GRADIENTS[product.id % GRADIENTS.length] ?? GRADIENTS[0] ?? "";
  const hasOffer = Boolean(discountPercent && !unavailable);

  return (
    <article
      className={`product-card product-card--modern ${unavailable ? "product-card--unavailable" : ""} ${hasOffer ? "product-card--offer" : ""}`}
    >
      <div className="product-card__glow" style={{ background: bgGradient }} aria-hidden="true" />
      <ProductCardMedia
        product={product}
        bgGradient={bgGradient}
        unavailable={unavailable}
        discountPercent={discountPercent}
      />
      <ProductCardBody product={product} available={available} />
      <ProductCardFooter product={product} available={available} originalPrice={originalPrice} />
    </article>
  );
});
