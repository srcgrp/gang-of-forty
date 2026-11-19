import { Link } from "@tanstack/react-router"
import { carouselProducts } from "../../catalog/carouselProducts"
import { getCardInfo } from "../../catalog/cardInfo"
import { useCatalog } from "../../hooks/useCatalog"
import Ads from "../Ads"
import CatalogMessage from "../CatalogMessage"
import CategoryList from "../CategoryList"
import Hero from "../Hero"
import ProductGrid from "../ProductGrid"
import SaleBox from "../SaleBox"

// How many products each carousel shows on the home page
const HOME_LIMIT = 6

export default function HomePage() {
  const { state, retry } = useCatalog()
  if (state.status !== "success") {
    return <CatalogMessage state={state} onRetry={retry} />
  }
  const catalog = state.data

  return (
    <>
      <Hero />
      <CategoryList categories={catalog.categories} />
      {catalog.carousels.map((carousel) => {
        const all = carouselProducts(catalog, carousel.id) ?? []
        return (
          <ProductGrid
            key={carousel.id}
            sectionId={carousel.id}
            title={carousel.title}
            products={all.slice(0, HOME_LIMIT)}
            getInfo={(p) => getCardInfo(p, catalog.offeredProducts, catalog.stock)}
            headerExtra={
              <>
                {"source" in carousel && <SaleBox />}
                <Link to="/plp/$carouselId" params={{ carouselId: carousel.id }}>
                  مشاهده همه ({all.length.toLocaleString("fa-IR")})
                </Link>
              </>
            }
          />
        )
      })}
      <Ads />
    </>
  )
}