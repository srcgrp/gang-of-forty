import { Link, useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import { toCard, offersById } from "../../features/products/catalog/cards";
import LoadStatus from "../LoadStatus";
import ProductDetails from "../ProductDetails";

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const state = useCatalog();
  if (state.status !== "success") {
    return <main id="main" className="wrap plp-page" tabIndex={-1}>
      <Link className="back-home" to="/">بازگشت به خانه</Link>
      <LoadStatus state={state} onRetry={state.retry} />
    </main>;
  }
  const id = Number(productId);
  const product = Number.isSafeInteger(id) && id > 0
    ? state.data.products.find(item => item.id === id) : undefined;
  return <main id="main" className="wrap plp-page" tabIndex={-1}>
    <Link className="back-home" to="/">بازگشت به خانه</Link>
    {product ? <ProductDetails card={toCard(product, state.data.stock, offersById(state.data.offers))} />
      : <h1>محصول پیدا نشد</h1>}
  </main>;
}
