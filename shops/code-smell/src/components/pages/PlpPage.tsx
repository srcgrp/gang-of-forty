import { Link, useParams, useSearch } from "@tanstack/react-router"
import { getCarouselById } from "../../catalog/catalogSelection"
import { sortProductsByPrice } from "../../catalog/sortProductsByPrice"
import { useCatalog } from "../../hooks/useCatalog"
import ProductCard from "../ProductCard"
import Status from "../Status"

const sortButton = "button button--secondary button--route"
const selectedSortButton = "button button--primary button--route"

export default function PlpPage() {
    const { carouselId } = useParams({ from: "/plp/$carouselId" })
    const { sort } = useSearch({ from: "/plp/$carouselId" })
    const { state, retry } = useCatalog()
    const carousel = state.status === "success"
        ? getCarouselById(state.data, carouselId)
        : null
    const title = state.status === "success"
        ? carousel?.title ?? "این فهرست پیدا نشد"
        : "فهرست کالاها"
    const products = carousel?.products ?? []
    const visibleProducts = sort === "price" ? sortProductsByPrice(products) : products

    return (
        <main className="section section--muted" id="main-content" tabIndex={-1}>
            <div className="container">
                <header className="section__header">
                    <div>
                        <h1 className="section__title">{title}</h1>
                        {carousel && (
                            <p className="section__subtitle">
                                {carousel.products.length.toLocaleString("fa-IR")} کالا
                            </p>
                        )}
                    </div>
                    {carousel && (
                        <nav className="carousel-heading-actions" aria-label="مرتب سازی کالاها">
                            <Link
                                to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "default" }}
                                className={sort === "default" ? selectedSortButton : sortButton}
                            >
                                پیش فرض
                            </Link>
                            <Link
                                to="/plp/$carouselId" params={{ carouselId }} search={{ sort: "price" }}
                                className={sort === "price" ? selectedSortButton : sortButton}
                            >
                                ارزان ترین
                            </Link>
                        </nav>
                    )}
                    <Link className="button button--secondary button--route" to="/">
                        بازگشت به صفحه ی اصلی
                    </Link>
                </header>
                {state.status !== "success" && <Status state={state} onRetry={retry} />}
                {carousel?.products.length === 0 && (
                    <p className="catalog-status">کالایی در این فهرست نیست.</p>
                )}
                {visibleProducts.length > 0 && (
                    <ul className="plp-grid">
                        {visibleProducts.map(function (product) {
                            return <ProductCard key={product.id} product={product} />
                        })}
                    </ul>
                )}
            </div>
        </main>
    )
}
