import { Link, useParams } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import CartPanel from "../CartPanel";
import { useCartStore } from "../../hooks/useCartStore";
import { useCatalog } from "../../hooks/useCatalog";
import { calculateDiscountedPrice } from "../../shared/pricing";

const notyf = new Notyf();

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { state, retry } = useCatalog();
  const addToCart = useCartStore((store) => store.add);

  if (state.status === "loading") {
    return <main className="product-detail-page"><p role="status">در حال بارگذاری محصول...</p></main>;
  }

  if (state.status === "error") {
    return (
      <main className="product-detail-page">
        <div className="load-error" role="alert">
          <p>{state.message}</p>
          <button className="retry-button" type="button" onClick={retry}>تلاش دوباره</button>
        </div>
      </main>
    );
  }

  if (state.status === "empty") {
    return (
      <main className="product-detail-page not-found">
        <h1>محصول پیدا نشد</h1>
        <Link className="page-back-link" to="/">بازگشت به خانه</Link>
      </main>
    );
  }

  const product = state.products.find((item) => item.id === Number(productId));
  if (!product) {
    return (
      <main className="product-detail-page not-found">
        <h1>محصول پیدا نشد</h1>
        <p>این محصول در فروشگاه وجود ندارد.</p>
        <Link className="page-back-link" to="/">بازگشت به خانه</Link>
      </main>
    );
  }

  const offer = state.offers.find((item) => item.productId === product.id);
  const price = offer ? calculateDiscountedPrice(product.price, offer.percent) : product.price;
  const stockCount = state.stock.items[product.id] ?? 0;
  const handleAdd = () => {
    addToCart(product.id);
    notyf.success(`${product.name} به سبد خرید اضافه شد`);
    confetti({ particleCount: 60, spread: 70 });
  };

  return (
    <>
      <main className="product-detail-page">
        <Link className="page-back-link" to="/">بازگشت به خانه</Link>
        <article className="product-detail">
          <div className="product-detail-emoji" aria-hidden="true">{product.emoji}</div>
          <div className="product-detail-info">
            {offer && <span className="discount-badge">{offer.percent.toLocaleString("fa-IR")}٪</span>}
            <h1>{product.name}</h1>
            <p>واحد: {product.unit}</p>
            <p className={stockCount === 0 ? "product-detail-stock is-empty" : "product-detail-stock"}>
              {stockCount === 0 ? "ناموجود" : `موجودی: ${stockCount.toLocaleString("fa-IR")}`}
            </p>
            <div className="product-detail-prices">
              {offer && <p className="discount-price">{product.price.toLocaleString("fa-IR")} تومان</p>}
              <p className={offer ? "discounted-price" : ""}>{price.toLocaleString("fa-IR")} تومان</p>
            </div>
            <button className="product-detail-add" type="button" disabled={stockCount === 0} onClick={handleAdd}>
              افزودن به سبد خرید
            </button>
          </div>
        </article>
      </main>
      <CartPanel products={state.products} />
    </>
  );
}
