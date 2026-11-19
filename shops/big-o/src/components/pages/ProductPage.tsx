import { Link, useParams } from "@tanstack/react-router"
import { getCardInfo } from "../../catalog/cardInfo"
import { findProduct } from "../../catalog/findProduct"
import { useCartStore } from "../../hooks/useCartStore"
import { useCatalog } from "../../hooks/useCatalog"
import Badge from "../Badge"
import CatalogMessage from "../CatalogMessage"
import Price from "../Price"

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" })
  const { state, retry } = useCatalog()
  const add = useCartStore((s) => s.add)
  if (state.status !== "success") {
    return <CatalogMessage state={state} onRetry={retry} />
  }
  const catalog = state.data
  const product = findProduct(catalog.products, productId)

  if (product === null) {
    return (
      <div className="msg load-msg">
        <p>محصول پیدا نشد</p>
        <Link className="text-link" to="/">بازگشت به صفحه اصلی</Link>
      </div>
    )
  }

  const { percent, label, finalPrice, inStock = true } = getCardInfo(product, catalog.offeredProducts, catalog.stock)

  return (
    <article className="product-page">
      <div className="product-page-img">
        <span aria-hidden="true">{product.emoji}</span>
        {!inStock && <Badge text="ناموجود" readerText="ناموجود" className="stock-badge" />}
        {inStock && label !== undefined && percent !== undefined && (
          <Badge text={`${percent.toLocaleString("fa-IR")} ٪`} readerText={label} className="discount-badge" />
        )}
      </div>
      <div className="product-page-info">
        <h2>{product.name}</h2>
        <p>{product.unit}</p>
        <Price price={product.price} finalPrice={finalPrice} />
        <button type="button" className="add-button" disabled={!inStock} onClick={() => add(product)}>
          {inStock ? "افزودن به سبد خرید" : "ناموجود"}
        </button>
        <Link className="text-link" to="/">بازگشت به صفحه اصلی</Link>
      </div>
    </article>
  )
}
