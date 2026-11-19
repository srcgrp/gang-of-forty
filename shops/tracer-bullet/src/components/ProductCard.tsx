import type { CardProduct } from "../types.ts";
import { formatNumber, formatPrice } from "../format/formatting.ts";
import OfferBadge from "./OfferBadge.tsx";
import { useCartStore } from "../hooks/useCartStore.ts";
import { Link } from "@tanstack/react-router";

type ProductCardProps = {
  product: CardProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const outOfStock = product.stock === 0;
  const add = useCartStore((s) => s.add);

  return (
    <li className={outOfStock ? "out-of-stock" : ""}>
      <span className="emoji" aria-hidden="true">
        {product.emoji}
      </span>
      {outOfStock ? (
        <OfferBadge text="ناموجود" />
      ) : product.percent ? (
        <OfferBadge text="تخفیف" percent={product.percent} />
      ) : null}
      <h3>
        <Link
          to="/product/$productId"
          params={{ productId: String(product.id) }}
        >
          {product.name}
        </Link>
      </h3>
      <p className="meta">{product.unit}</p>
      <p className="price">
        {product.newPrice !== undefined ? (
          <>
            <del>
              <span className="visually-hidden">قیمت قبلی: </span>
              {formatNumber(product.price)}
            </del>
            <span className="visually-hidden">قیمت با تخفیف: </span>
            {formatPrice(product.newPrice)}
          </>
        ) : (
          formatPrice(product.price)
        )}
      </p>
      <button
        type="button"
        disabled={outOfStock}
        onClick={() => add(product)}
        aria-label={
          outOfStock
            ? `${product.name}: ناموجود`
            : `افزودن ${product.name} به سبد خرید`
        }
      >
        +
      </button>
    </li>
  );
}
