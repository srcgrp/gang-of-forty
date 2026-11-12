import type { Product } from "../types/product.ts";

type ProductCardProps = {
  product: Product;
  qty: number;
  percent: number;
  onAdd: (id: number) => void;
};

export default function ProductCard({
  product,
  qty,
  percent,
  onAdd,
}: ProductCardProps) {
  const now =
    percent > 0
      ? Math.round((product.price * (100 - percent)) / 100)
      : product.price;
  return (
    <article className="product-card">
      <p>{product.emoji}</p>
      <h3>{product.name}</h3>
      <p>{product.unit}</p>
      {percent > 0 ? (
        <p>
          {percent.toLocaleString("fa-IR")}٪ {product.price.toLocaleString("fa-IR")}
          {" → "}
          {now.toLocaleString("fa-IR")}
        </p>
      ) : (
        <p>{product.price.toLocaleString("fa-IR")}</p>
      )}
      <p>مانده: {qty.toLocaleString("fa-IR")}</p>
      <button
        type="button"
        disabled={qty < 1}
        onClick={function () {
          onAdd(product.id);
        }}
      >
        افزودن
      </button>
    </article>
  );
}
