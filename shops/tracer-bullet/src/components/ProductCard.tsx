import type { CardProduct } from "../types.ts";
import { formatNumber, formatPrice } from "../ui/formatting.ts";
import OfferBadge from "./OfferBadge.tsx";

type ProductCardProps = {
  product: CardProduct;
  onAdd: (id: number) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const outOfStock = product.stock === 0;

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
      <h3>{product.name}</h3>
      <p className="meta">{product.unit}</p>
      <p className="price">
        {product.newPrice ? (
          <>
            <del>
              {formatNumber(product.price)}
              <span className="visually-hidden">"قیمت قبلی"</span>
              {""}
              {formatNumber(product.price)}
            </del>
            <span className="visually-hidden">قیمت با تخفیف</span>
            {""}
            {formatPrice(product.newPrice)}
          </>
        ) : (
          formatPrice(product.price)
        )}
      </p>
      <button
        type="button"
        disabled={outOfStock}
        onClick={() => onAdd(product.id)}
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
