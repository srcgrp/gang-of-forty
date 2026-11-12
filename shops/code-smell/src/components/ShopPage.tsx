import type { CartRowData, CarouselWithProducts, ShopData } from "../types"
import type { CartButtonProps } from "./CartButton"
import Header, { type CatalogControls } from "./Header"
import Hero from "./Hero"
import Categories from "./Categories"
import Promos from "./Promos"
import ProductGrid from "./ProductGrid"
import CartPanel from "./CartPanel"
import Guide from "./Guide"
import Footer from "./Footer"

type ShopPageProps = {
    data: ShopData
    carousels: CarouselWithProducts[]
    catalogControls: CatalogControls
    cartControls: CartButtonProps
    rows: CartRowData[]
    total: number
    onAdd: (id: number) => void
    onPick: (id: number | null) => void
    onRemove: (id: number) => void
}

export default function ShopPage({
    data,
    carousels,
    catalogControls,
    cartControls,
    rows,
    total,
    onAdd,
    onPick,
    onRemove
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
                cartControls={cartControls}
            />
            <main id="main-content" tabIndex={-1}>
                {isSearching && <ProductGrid carousels={carousels} onAdd={onAdd} />}
                <Hero
                    hero={data.home.hero}
                    shop={data.shop}
                    categories={data.categories}
                    onPick={onPick}
                />
                <Categories categories={data.categories} onPick={onPick} />
                <Promos home={data.home} categories={data.categories} onPick={onPick} />
                {!isSearching && <ProductGrid carousels={carousels} onAdd={onAdd} />}
                <Guide shop={data.shop} />
                <CartPanel
                    rows={rows}
                    total={total}
                    cartOpen={cartControls.cartOpen}
                    onRemove={onRemove}
                    onToggle={cartControls.onToggle}
                />
            </main>
            <Footer categories={data.categories} shop={data.shop} onPick={onPick} />
        </>
    )
}