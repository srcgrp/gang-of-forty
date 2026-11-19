import { Link, useParams } from "@tanstack/react-router"
import { getCarouselById } from "../../catalog/catalogSelection"
import { useCatalog } from "../../hooks/useCatalog"
import ProductCard from "../ProductCard"
import Status from "../Status"

export default function PlpPage() {
    const { carouselId } = useParams({ from: "/plp/$carouselId" })
    const { state, retry } = useCatalog()
    const carousel = state.status === "success"
        ? getCarouselById(state.data, carouselId)
        : null
    const title = state.status === "success"
        ? carousel?.title ?? "این فهرست پیدا نشد"
        : "فهرست کالاها"

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
                    <Link className="button button--secondary button--route" to="/">
                        بازگشت به صفحه‌ی اصلی
                    </Link>
                </header>
                {state.status !== "success" && <Status state={state} onRetry={retry} />}
                {carousel?.products.length === 0 && (
                    <p className="catalog-status">کالایی در این فهرست نیست.</p>
                )}
                {carousel && carousel.products.length > 0 && (
                    <ul className="plp-grid">
                        {carousel.products.map(function (product) {
                            return <ProductCard key={product.id} product={product} />
                        })}
                    </ul>
                )}
            </div>
        </main>
    )
}