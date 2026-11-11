import type { Category, CartRowData, Link, ProductCardData } from "../types"
import type { CartButtonProps } from "./CartButton"
import Header from "./Header"
import Hero from "./Hero"
import Categories from "./Categories"
import Promos from "./Promos"
import ProductGrid from "./ProductGrid"
import CartPanel from "./CartPanel"
import Guide from "./Guide"
import Footer from "./Footer"

type ShopPageProps = {
    categories: Category[]
    menu: Link[]
    products: ProductCardData[]
    categoryId: number | null
    cartControls: CartButtonProps
    rows: CartRowData[]
    total: number
    onAdd: (id: number) => void
    onPick: (id: number | null) => void
    onRemove: (id: number) => void
}

export default function ShopPage({
    categories,
    menu,
    products,
    categoryId,
    cartControls,
    rows,
    total,
    onAdd,
    onPick,
    onRemove
}: ShopPageProps) {
    return (
        <>
            <a className="skip-link" href="#main-content">
                پرش به محتوای اصلی
            </a>
            <Header
                categories={categories}
                menu={menu}
                categoryId={categoryId}
                cartControls={cartControls}
                onPick={onPick}
            />
            <main id="main-content" tabIndex={-1}>
                <Hero />
                <Categories categories={categories} onPick={onPick} />
                <Promos />
                <ProductGrid products={products} onAdd={onAdd} />
                <Guide />
                <CartPanel
                    rows={rows}
                    total={total}
                    cartOpen={cartControls.cartOpen}
                    onRemove={onRemove}
                    onToggle={cartControls.onToggle}
                />
            </main>
            <Footer categories={categories} onPick={onPick} />
        </>
    )
}