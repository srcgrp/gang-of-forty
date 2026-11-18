import { Link } from "@tanstack/react-router";
import type { Product } from "../../../scripts/types.ts";
import type { ProductDetails } from "../../../scripts/logic/catalog/product-details.ts";
import AddToCartButton from "../../cart/AddToCartButton.tsx";
import OfferBadge from "../../shared/OfferBadge.tsx";
import Price from "../../shared/Price.tsx";
import OldPrice from "./OldPrice.tsx";
import ProductImage from "./ProductImage.tsx";

type ProductDetailProps = { product: Product } & ProductDetails;

export default function ProductDetail({
  product,
  offer,
  finalPrice,
  stock,
  categoryName,
}: ProductDetailProps) {
  return (
    <>
      <Link className="view-all-link" to="/">
        بازگشت به صفحه اصلی
      </Link>
      <main id="main-content" tabIndex={-1}>
        <article className="product-page">
          <div className="product-page-parts">
            <ProductImage product={product} />
            {offer && <OfferBadge percent={offer.percent} />}
            <div className="product-page-info">
              <ul className="product-page-tags">
                <li className="item-tag">{categoryName}</li>
                {product.tags.map((tag) => (
                  <li key={tag} className="product-tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <h2 className="product-page-title">{product.name}</h2>
              <p className="item-description">{product.unit}</p>
              {offer && <OldPrice price={product.price} />}
              <Price value={finalPrice} className="item-price" />
            </div>
          </div>
          <AddToCartButton
            className="buy-button product-page-buy"
            product={product}
            stock={stock}
          >
            افزودن به سبد خرید
          </AddToCartButton>
        </article>
      </main>
    </>
  );
}
