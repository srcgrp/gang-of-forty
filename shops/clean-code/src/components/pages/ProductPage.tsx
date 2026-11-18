import { Link, useParams } from "@tanstack/react-router";
import { useCartDispatch } from "../../hooks/useCart";
import { useCatalog } from "../../hooks/useCatalog";
import Status from "../Status";

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { load, retry } = useCatalog();
  const dispatch = useCartDispatch();
  const id = Number(productId);

  if (load.status !== "success") {
    return <Status state={load} onRetry={retry} />;
  }

  const product = load.products.find(function (p) {
    return p.id === id;
  });

  if (!product) {
    return (
      <main className="box">
        <h1>محصول پیدا نشد</h1>
        <p>
          <Link to="/">بازگشت به خانه</Link>
        </p>
      </main>
    );
  }

  const stock = load.stock.items[product.id] ?? 0;

  return (
    <main className="box">
      <p>
        <Link to="/">بازگشت به خانه</Link>
      </p>
      <article
        className={
          stock < 1
            ? "product product-page out-of-stock"
            : "product product-page"
        }
      >
        <div className="pic">
          <span>{product.emoji}</span>
        </div>
        <h1>{product.name}</h1>
        <p className="amount">{product.unit}</p>
        <p className="price">{product.price.toLocaleString("fa-IR")}</p>
        <button
          type="button"
          disabled={stock < 1}
          onClick={function () {
            dispatch({ type: "add", id: product.id, stock });
          }}
        >
          {stock < 1 ? "ناموجود" : "افزودن به سبد"}
        </button>
      </article>
    </main>
  );
}
