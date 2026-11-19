import type { CarouselWithProducts, ShopData } from "../types"
import Header, { type CatalogControls } from "./Header"
import Hero from "./Hero"
import Categories from "./Categories"
import Promos from "./Promos"
import ProductGrid from "./ProductGrid"
import CartPanel from "./CartPanel"
import Guide from "./Guide"
import Footer from "./Footer"
import { SaleCountdownPanel, type CountdownControls } from "./SaleCountdown"

type ShopPageProps = {
    data: ShopData
    carousels: CarouselWithProducts[]
    catalogControls: CatalogControls
    countdownControls: CountdownControls
    onPick: (id: number | null) => void
}

export default function ShopPage({
    data,
    carousels,
    catalogControls,
    countdownControls,
    onPick
}: ShopPageProps) {
    const isSearching = catalogControls.query.trim() !== ""

    return (
        <>
            <a className="skip-link" href="#main-content">
                پرش به محتوای اصلی
            </a>
            <Header
                categories={data.categories}
                shop={data.shop}
                catalogControls={catalogControls}
            />
            <main id="main-content" tabIndex={-1}>
                {isSearching && <ProductGrid carousels={carousels} />}
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
                <CartPanel
                    products={data.products}
                    offers={data.offers}
                    stock={data.stock.items}
                />
            </main>
            <Footer categories={data.categories} shop={data.shop} onPick={onPick} />
        </>
    )
}