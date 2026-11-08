import type { ProductCardData } from "../types";

interface ProductCardProps {
  data: ProductCardData;
  onAdd: (data: ProductCardData) => void;
}

export default function ProductCard({ data, onAdd }: ProductCardProps) {
  const { product, price, originalPrice, discountPercent, outOfStock } = data;

  return (
    <article className={`product-card${outOfStock ? " product-card--out-of-stock" : ""}`}>
      <div className="product-badges">
        {discountPercent !== undefined && (
          <span className="badge-discount">{discountPercent.toLocaleString("fa-IR")}٪</span>
        )}
        {product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.map((tag) => <span className="badge-offer-label" key={tag}>{tag}</span>)}
          </div>
        )}
      </div>
      <div className="product-thumb">
        <span className="product-emoji" role="img" aria-label={product.name}>{product.emoji}</span>
      </div>
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-unit">{product.unit}</span>
        {outOfStock && <span className="stock-message">ناموجود</span>}
      </div>
      <div className="product-footer">
        <div className="product-pricing">
          {originalPrice !== undefined && (
            <span className="old-price">{originalPrice.toLocaleString("fa-IR")} تومان</span>
          )}
          <span className="current-price">{price.toLocaleString("fa-IR")} تومان</span>
        </div>
        <button
          className="add-btn"
          type="button"
          aria-label={`افزودن ${product.name} به سبد`}
          disabled={Boolean(outOfStock)}
          onClick={() => onAdd(data)}
        >+</button>
      </div>
    </article>
  );
}
