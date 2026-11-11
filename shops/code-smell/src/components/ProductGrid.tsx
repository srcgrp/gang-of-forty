import type { CarouselWithProducts } from "../types"
import ProductCard from "./ProductCard"
import CarouselControls from "./CarouselControls"

type ProductGridProps = {
    carousels: CarouselWithProducts[]
    onAdd: (id: number) => void
}

export default function ProductGrid({ carousels, onAdd }: ProductGridProps) {
    return (
        <div id="products">
            {carousels.map(function (carousel, index) {
                const titleId = carousel.id + "-title"
                const hasProducts = carousel.products.length > 0

                return (
                    <section
                        className={index % 2 === 0 ? "section section--muted" : "section"}
                        id={carousel.id}
                        key={carousel.id}
                        aria-labelledby={titleId}
                        data-carousel="true"
                    >
                        <div className="container">
                            <header className="section__header section__header--carousel">
                                <h2 className="section__title" id={titleId}>
                                    <span className="carousel-title__emoji" aria-hidden="true">
                                        {carousel.emoji}
                                    </span>
                                    {carousel.title}
                                </h2>
                                <div className="carousel-heading-row">
                                    <p className="section__subtitle">
                                        {carousel.products.length.toLocaleString("fa-IR") + " " + "کالا"}
                                    </p>
                                    {hasProducts && <CarouselControls title={carousel.title} />}
                                </div>
                            </header>
                            <p className="catalog-status" role="status" hidden={hasProducts}>
                                کالایی پیدا نشد!
                            </p>
                            <ul
                                className="product-grid"
                                tabIndex={0}
                                hidden={!hasProducts}
                                aria-label={"کاروسل" + " " + carousel.title}
                            >
                                {carousel.products.map(function (product) {
                                    return (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAdd={onAdd}
                                        />
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}