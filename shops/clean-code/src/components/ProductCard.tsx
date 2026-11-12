import type { Product } from "../types/product.ts";

type ProductCardProps = { product: Product };

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <p>{product.emoji}</p>
      <h3>{product.name}</h3>
      <p>{product.unit}</p>
      <p>{product.price.toLocaleString("fa-IR")}</p>
      <button type="button">افزودن</button>
    </article>
  );
}
