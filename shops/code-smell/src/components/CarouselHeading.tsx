import { Link } from "@tanstack/react-router"
import type { ListingSearch } from "../catalog/shopPageData"
import type { CarouselWithProducts } from "../types"

type CarouselHeadingProps = {
    carousel: CarouselWithProducts
    titleId: string
    search: ListingSearch | undefined
}

export default function CarouselHeading({ carousel, titleId, search }: CarouselHeadingProps) {
    const count = carousel.products.length
    const countText = count.toLocaleString("fa-IR")

    return (
        <header className="section__header section__header--carousel">
            <div className="carousel-heading-row">
                <h2 className="section__title" id={titleId}>
                    <span className="carousel-title__emoji" aria-hidden="true">
                        {carousel.id === "search-results" ? (
                            <img src="svg/magnifying-glass.svg" alt="" width={20} height={20} />
                        ) : (
                            carousel.emoji
                        )}
                    </span>
                    {carousel.title}
                </h2>
                <div className="carousel-heading-actions">
                    {(!search || count > 0) && (
                        <Link
                            className="button button--primary button--route"
                            to="/plp/$carouselId"
                            params={{ carouselId: search ? "search-results" : carousel.id }}
                            search={search ?? { sort: "default" }}
                            aria-label={"مشاهده همه (" + countText + ")، " + carousel.title}
                        >
                            مشاهده همه ({countText})
                        </Link>
                    )}
                </div>
            </div>
            <p className="section__subtitle">{countText} کالا</p>
        </header>
    )
}
