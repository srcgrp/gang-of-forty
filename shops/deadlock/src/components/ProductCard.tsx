import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAdd: (id: number) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="tent-article">
      <span className="product-emoji" aria-hidden="true">
        {product.emoji}
      </span>
      <h3>{product.name}</h3>
      <p>{product.unit}</p>
      <div>
        <p>{product.price.toLocaleString("fa-IR")} تومان</p>
        <button
          type="button"
          className="add-to-cart"
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={() => onAdd(product.id)}
        >
          +
        </button>
      </div>
    </article>
  );
}
