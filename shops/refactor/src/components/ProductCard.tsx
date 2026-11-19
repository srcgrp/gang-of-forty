
import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import type { ProductView } from "../types";
import { useCartStore } from "../hooks/useCartStore";
import confetti from "canvas-confetti";
import Icon from "./Icon";
import OfferBadge from './OfferBadge'
import Price from './Price'

type ProductCardProps = {
  product: ProductView;
  inStock: boolean;
  discount?: number | undefined;
};
 function ProductCardBase({
  product,
  inStock,
  discount,
}: ProductCardProps) {
  const discounted = discount !== undefined;
  const add = useCartStore((s) => s.add);

  return (
    <li className={!inStock ? "card card--out" : "card"}>
      <div className="card-media">
        <span className="card-emoji" aria-hidden="true">
          {product.emoji}
        </span>
        {discounted && <OfferBadge percent={discount} />}
        {!inStock && <span className="chip-out">ناموجود</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title"><Link to="/product/$productId" params={{ productId: String(product.id) }}>{product.name}</Link></h3>
        <p className="card-weight">{product.unit}</p>
      </div>
      <div className="card-foot">
        <Price
          price={product.price}
          originalPrice={product.originalPrice}
          discounted={discounted}
        />
        <button
          type="button"
          className="act-btn act-cart"
          disabled={!inStock}
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={() => {
            add(product.id, product.stock);
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.75 },
              zIndex: 2000,
            });
          }}
        >
          <Icon name="cart" />
        </button>
      </div>
    </li>
  );
}
const ProductCard = memo(ProductCardBase)
export default ProductCard
