import type { ListingSearch } from "../catalog/shopPageData"
import type { CarouselWithProducts, ShopData } from "../types"
import type { CatalogControls } from "../hooks/useCatalog"
import Hero from "./Hero"
import Categories from "./Categories"
import Promos from "./Promos"
import ProductGrid from "./ProductGrid"
import Guide from "./Guide"
import Footer from "./Footer"
import { SaleCountdownPanel, type CountdownControls } from "./SaleCountdown"

type ShopPageProps = {
    data: ShopData
    carousels: CarouselWithProducts[]
    catalogControls: CatalogControls
    countdownControls: CountdownControls
}

export default function ShopPage({
    data,
    carousels,
    catalogControls,
    countdownControls
}: ShopPageProps) {
    const { categoryId, query, onPick } = catalogControls
    const searchText = query.trim()
    const search: ListingSearch = { sort: "default", q: searchText }
    if (categoryId !== null) search.cat = categoryId
    const isSearching = searchText !== ""

    return (
        <>
            <main id="main-content" tabIndex={-1}>
                {isSearching && <ProductGrid carousels={carousels} search={search} />}
                <Hero
                    hero={data.home.hero}
                    shop={data.shop}
                    categories={data.categories}
                    onPick={onPick}
                />
                <Categories categories={data.categories} onPick={onPick} />
                <SaleCountdownPanel {...countdownControls} />
                <Promos home={data.home} categories={data.categories} onPick={onPick} />
                {!isSearching && <ProductGrid carousels={carousels} />}
                <Guide shop={data.shop} />
            </main>
            <Footer categories={data.categories} shop={data.shop} onPick={onPick} />
        </>
    )
}