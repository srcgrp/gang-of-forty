import { Link, useParams } from "@tanstack/react-router";
import { productPrice } from "../../catalog/product-price";
import { useCatalog } from "../../hooks/useCatalog";
import { formatPrice } from "../../utils/format";
import AddToCartButton from "../AddToCartButton";

function ProductDetails({ id }: { id: number }) {
  const state = useCatalog();
  if (state.status === "loading") {
    return <p className="loading-state" role="status">در حال بارگذاری محصول...</p>;
  }
  if (state.status === "error") {
    return (
      <div className="error-state" role="alert">
        <p>خطا در بارگذاری اطلاعات: {state.message}</p>
        <button className="buynow-btn" type="button" onClick={state.retry}>تلاش دوباره</button>
      </div>
    );
  }

  const item = state.data.products.find(({ product }) => product.id === id);
  if (!item) return <h1 className="section-title">محصول پیدا نشد</h1>;

  return (
    <article className="product-detail">
      <h1 className="section-title"><span aria-hidden="true">{item.product.emoji ?? "📦"} </span>{item.product.name}</h1>
      <p>واحد: {item.product.unit ?? "نامشخص"}</p>
      <p className="price-label">{formatPrice(productPrice(item))}</p>
      <AddToCartButton item={item} />
    </article>
  );
}

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });

  return (
    <section className="catalog-page">
      <Link className="catalog-link" to="/">بازگشت به خانه</Link>
      <ProductDetails id={Number(productId)} />
    </section>
  );
}
