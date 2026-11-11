import type { Category, Link, ProductCardData } from "../types"
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
    onAdd: (id: number) => void
    onPick: (id: number | null) => void
}

export default function ShopPage({
    categories,
    menu,
    products,
    onAdd,
    onPick
}: ShopPageProps) {
    return (
        <>
            <a className="skip-link" href="#main-content">
                پرش به محتوای اصلی
            </a>
            <Header categories={categories} menu={menu} />
            <main id="main-content" tabIndex={-1}>
                <Hero />
                <Categories categories={categories} onPick={onPick} />
                <Promos />
                <ProductGrid products={products} onAdd={onAdd} />
                <Guide />
                <CartPanel />
            </main>
            <Footer categories={categories} />
        </>
    )
}