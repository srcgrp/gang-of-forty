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
    <article className={qty < 1 ? "product out-of-stock" : "product"}>
      <div className="pic">
        <span>{product.emoji}</span>
        {qty < 1 ? (
          <span className="off sold">ناموجود</span>
        ) : percent > 0 ? (
          <span className="off">{percent.toLocaleString("fa-IR")}٪</span>
        ) : null}
      </div>
      <h3>{product.name}</h3>
      <p className="amount">
        {product.unit}
        {qty > 0 ? " · مانده " + qty.toLocaleString("fa-IR") : ""}
      </p>
      <p className="price">
        {percent > 0 ? (
          <>
            <s>{product.price.toLocaleString("fa-IR")}</s>
            <span>{now.toLocaleString("fa-IR")}</span>
          </>
        ) : (
          product.price.toLocaleString("fa-IR")
        )}
      </p>
      <button
        type="button"
        disabled={qty < 1}
        onClick={function () {
          onAdd(product.id);
        }}
      >
        {qty < 1 ? "ناموجود" : "افزودن به سبد"}
      </button>
    </article>
  );
}
