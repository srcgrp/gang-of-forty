import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-cart">
      <div className="img">
        <span
          className="img-product"
          style={{ fontSize: '4rem', display: 'grid', placeItems: 'center' }}
        >
          {product.emoji || '📦'}
        </span>
      </div>
      <div className="product-details">
        <p className="product-description">{product.name}</p>
        <span className="product-unit">{product.unit || ''}</span>
      </div>
      <div className="card-btn">
        <div className="prices">
          <p className="price-label">
            {product.price.toLocaleString('fa-IR')} تومان
          </p>
        </div>
        <button
          className="buynow-btn"
          type="button"
          data-product-id={product.id}
          aria-label={`افزودن ${product.name} به سبد خرید`}
        >
          +
        </button>
      </div>
    </article>
  );
}
