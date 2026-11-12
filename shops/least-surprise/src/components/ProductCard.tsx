
import type { ProductWithDetails } from '../types';

type ProductCardProps = {
  readonly product: ProductWithDetails;
  readonly onAdd: (id: string) => void;
};

export default function ProductCard({
  product,
  onAdd,
}: ProductCardProps) {
  const isEmoji = product.image.startsWith('emoji:');

  const imageContent = isEmoji
    ? product.image.replace('emoji:', '')
    : `/${product.image}`;

  return (
    <article className="product-card">
      {isEmoji ? (
        <div className="product-sticker">
          {imageContent}
        </div>
      ) : (
        <img
          className="product-image"
          src={imageContent}
          alt={product.title}
        />
      )}

      <h3>{product.title}</h3>

      {product.discountPercent > 0 && (
        <p className="product-old-price">
          {product.price.toLocaleString('fa-IR')} تومان
        </p>
      )}

      <p className="product-price">
        {product.finalPrice.toLocaleString('fa-IR')} تومان
      </p>

      <p className="product-stock">
        موجودی: {product.stock}
      </p>

      <button
        type="button"
        disabled={product.stock <= 0}
        onClick={() => onAdd(String(product.id))}
      >
        {product.stock > 0
          ? 'افزودن به سبد خرید'
          : 'ناموجود'}
      </button>
    </article>
  );
}
