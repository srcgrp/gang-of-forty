import type { Product, Offer } from "../shared/types/products";
import { productImages } from "../features/products/data";

type ProductCardProps = {
  product: Product;
  onAdd: (id: number) => void;
  availableStock: number;
  offer?: Offer;
};

export default function ProductCard({
  product,
  onAdd,
  availableStock,
  offer,
}: ProductCardProps) {
  const imagePath = productImages[product.id];
  const isAvailable = availableStock > 0;

  const finalPrice = offer
    ? Math.round(product.price * (1 - offer.percent / 100))
    : product.price;

  const formatPrice = (price: number) =>
    `${price.toLocaleString("fa-IR")} تومان`;

  return (
    <article
      data-api-product={product.id}
      className={`product-card${offer ? " product-card-discount" : ""}${!isAvailable ? " product-card-unavailable" : ""}`}
    >
      {offer && (
        <span className="discount-badge" title={offer.label}>
          {offer.percent.toLocaleString("fa-IR")}٪
        </span>
      )}

      {!isAvailable && <span className="unavailable-badge">ناموجود</span>}

      {imagePath ? (
        <img src={imagePath} alt={product.name} loading="lazy" />
      ) : (
        <span className="product-emoji" aria-hidden="true">
          {product.emoji ?? "🛒"}
        </span>
      )}

      <h3>{product.name}</h3>
      <p className="product-meta">{product.unit}</p>

      <div className="price-box">
        {offer && <p className="old-price">{formatPrice(product.price)}</p>}
        <p className="product-price">{formatPrice(finalPrice)}</p>
      </div>

      <button
        type="button"
        disabled={!isAvailable}
        onClick={() => onAdd(product.id)}
      >
        {isAvailable ? "افزودن به سبد" : "ناموجود"}
      </button>
    </article>
  );
}
