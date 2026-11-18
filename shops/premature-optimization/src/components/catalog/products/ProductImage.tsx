import type { Product } from "../../../scripts/types.ts";
import { assetUrl } from "../../../lib/assetUrl.ts";

export default function ProductImage({ product }: { product: Product }) {
  return (
    <div className="product-icon product-emoji">
      {product.image ? (
        <img src={assetUrl(product.image)} alt={product.name} />
      ) : (
        <span className="product-emoji-char">{product.emoji || "🛍️"}</span>
      )}
    </div>
  );
}
