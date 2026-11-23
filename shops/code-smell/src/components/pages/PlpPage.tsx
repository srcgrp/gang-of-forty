import { Link, useParams, useSearch } from "@tanstack/react-router"
import { getCarouselById } from "../../catalog/catalogSelection"
import { getSearchCarousels } from "../../catalog/shopPageData"
import { sortProductsByPrice } from "../../catalog/sortProductsByPrice"
import { useCatalog } from "../../hooks/useCatalog"
import ProductCard from "../ProductCard"
import Status from "../Status"

const sortButton = "button button--secondary button--route"
const selectedSortButton = "button button--primary button--route"

export default function PlpPage() {
    const { carouselId } = useParams({ from: "/plp/$carouselId" })
    const search = useSearch({ from: "/plp/$carouselId" })
    const isSearch = carouselId === "search-results"
    const { state, retry, catalogControls } = useCatalog()
    const carousel = state.status === "success" ? (isSearch
        ? getSearchCarousels(state.data, search.q ?? "", search.cat ?? null)[0] ?? null
        : getCarouselById(state.data, carouselId)) : null
    const title = isSearch && search.q ? "نتایج جستجو برای «" + search.q + "»"
        : carousel?.title ?? (state.status === "success" ? "این فهرست پیدا نشد" : "فهرست کالاها")
    const products = carousel?.products ?? []
    const visibleProducts = search.sort === "price" ? sortProductsByPrice(products) : products

    return (
        <main className="section section--muted" id="main-content" tabIndex={-1}>
            <div className="container">
                <header className="section__header">
                    <div>
                        <h1 className="section__title">{title}</h1>
                        {carousel && (
                            <p className="section__subtitle">{carousel.products.length.toLocaleString("fa-IR")} کالا</p>
                        )}
                    </div>
                    {carousel && (
                        <nav className="carousel-heading-actions" aria-label="مرتب سازی کالاها">
                            <Link
                                to="/plp/$carouselId" params={{ carouselId }} search={{ ...search, sort: "default" }}
                                className={search.sort === "default" ? selectedSortButton : sortButton}
                            >
                                پیش فرض
                            </Link>
                            <Link
                                to="/plp/$carouselId" params={{ carouselId }} search={{ ...search, sort: "price" }}
                                className={search.sort === "price" ? selectedSortButton : sortButton}
                            >
                                ارزان ترین
                            </Link>
                        </nav>
                    )}
                    <Link className={sortButton} to="/" onClick={() => catalogControls.onQuery("")}>
                        بازگشت به صفحه ی اصلی
                    </Link>
                </header>
                {state.status !== "success" && <Status state={state} onRetry={retry} />}
                {carousel?.products.length === 0 && (
                    <p className="catalog-status">کالایی در این فهرست نیست.</p>
                )}
                {visibleProducts.length > 0 && (
                    <ul className="plp-grid">
                        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                    </ul>
                )}
            </div>
        </main>
    )
}
