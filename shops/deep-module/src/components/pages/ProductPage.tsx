import { Link, useParams } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import { useCartStore } from "../../hooks/useCartStore";
import { getEffectiveStock, getOfferPercent } from "../../catalog/stock";
import { faNum, formatPrice } from "../../shared/ui/format";

export function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { state } = useCatalog();
  const consumed = useCartStore((s) => s.consumed);
  const addToCart = useCartStore((s) => s.addToCart);

  if (state.status !== "success") return null;

  const id = Number(productId);
  const product = Number.isInteger(id)
    ? state.data.products.find((p) => p.id === id)
    : undefined;

  if (!product) {
    return (
      <section className="page-card">
        <h1>محصول پیدا نشد</h1>
        <Link to="/" className="btn btn--primary">بازگشت به خانه</Link>
      </section>
    );
  }

  const stock = getEffectiveStock(state.data.stock, consumed).items[product.id];
  const available = stock ?? Infinity;
  const discount = getOfferPercent(state.data.offers, product.id);

  return (
    <section className="page-card product-detail">
      <div className="product-detail__emoji" aria-hidden="true">
        {product.emoji || "📦"}
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        {product.unit && <p className="product-card__unit">{product.unit}</p>}
        {product.desc && <p>{product.desc}</p>}
        {discount && <span className="badge">{faNum(discount)}٪ تخفیف</span>}
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <div className="product-detail__actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={available === 0}
            onClick={() => addToCart(product, available)}
          >
            {available === 0 ? "ناموجود" : "افزودن به سبد"}
          </button>
          <Link to="/" className="btn btn--ghost">بازگشت</Link>
        </div>
      </div>
    </section>
  );
}
