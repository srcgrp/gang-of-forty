import { useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import Status from "../Status";
import { useCartStore } from "../../hooks/useCartStore";
import { formatPrice } from "../../format";

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { state, retry } = useCatalog();
  const add = useCartStore((s) => s.add);

  if (state.status !== "success") {
    return <Status state={state} onRetry={retry} />;
  }

  const product = state.products.find(
    (item) => item.id === Number(productId)
  );

 if (!product) {
  return (
    <section className="product-page">
      <p role="status">محصول پیدا نشد</p>
    </section>
  );
}
return (
  <section className="product-page">
    <h1>{product.name}</h1>
    <p>{product.unit}</p>
    <p>{formatPrice(product.price)}</p>

    <button
      type="button"
      onClick={() => add(product, product.price)}
    >
      افزودن به سبد
    </button>
  </section>
);
  }