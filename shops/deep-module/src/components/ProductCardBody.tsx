import { Link } from "@tanstack/react-router";
import type { Product } from "../types";
import { faNum } from "../shared/ui/format";

interface Props {
  product: Product;
  available: number;
}

export function ProductCardBody({ product, available }: Props) {
  return (
    <div className="product-card__body">
      <h3 className="product-card__title" title={product.name}>
        <Link
          to="/product/$productId"
          params={{ productId: String(product.id) }}
        >
          {product.name}
        </Link>
      </h3>
      {product.unit && <p className="product-card__unit">{product.unit}</p>}
      {product.rating !== undefined && (
        <div className="product-card__rating">
          <span className="product-card__star">★</span>
          <span className="product-card__rating-num">
            {faNum(product.rating)}
          </span>
          {product.reviews !== undefined && (
            <span className="product-card__reviews">
              ({faNum(product.reviews)})
            </span>
          )}
        </div>
      )}
      {available !== Infinity && (
        <div className="product-card__stock-row">
          {available === 0 ? (
            <span className="product-card__stock product-card__stock--out">
              ناموجود
            </span>
          ) : available <= 5 ? (
            <span className="product-card__stock product-card__stock--low">
              ⚡ فقط {faNum(available)} عدد
            </span>
          ) : (
            <span className="product-card__stock product-card__stock--ok">
              موجودی: {faNum(available)} عدد
            </span>
          )}
        </div>
      )}
    </div>
  );
}
