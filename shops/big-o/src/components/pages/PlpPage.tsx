import { Link, useParams } from "@tanstack/react-router"
import { getCardInfo } from "../../catalog/cardInfo"
import { carouselProducts, carouselTitle } from "../../catalog/carouselProducts"
import { useCatalog } from "../../hooks/useCatalog"
import CatalogMessage from "../CatalogMessage"
import ProductCard from "../ProductCard"

export default function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" })
  const { state, retry } = useCatalog()
  if (state.status !== "success") {
    return <CatalogMessage state={state} onRetry={retry} />
  }
  const catalog = state.data
  const products = carouselProducts(catalog, carouselId)
  const title = carouselTitle(catalog, carouselId)

  if (products === null || title === null) {
    return (
      <div className="msg load-msg">
        <p>این فهرست پیدا نشد.</p>
        <Link className="text-link" to="/">بازگشت به صفحه اصلی</Link>
      </div>
    )
  }

  return (
    <section>
      <div className="carousel-header">
        <h2>{title} ({products.length.toLocaleString("fa-IR")})</h2>
        <Link className="text-link" to="/">بازگشت</Link>
      </div>
      {products.length === 0 ? (
        <p className="msg load-msg">محصولی در این فهرست نیست.</p>
      ) : (
        <ul className="plp-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              info={getCardInfo(product, catalog.offeredProducts, catalog.stock)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}