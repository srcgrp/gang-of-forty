import type { Category, Link, Product } from "../types"
import Header from "./Header"
import Hero from "./Hero"
import ProductGrid from "./ProductGrid"
import CartPanel from "./CartPanel"
import Categories from "./Categories"
import Promos from "./Promos"
import Guide from "./Guide"
import Footer from "./Footer"

type ShopPageProps = {
    categories: Category[]
    menu: Link[]
    products: Product[]
}

export default function ShopPage({
    categories,
    menu,
    products
}: ShopPageProps) {
    return (
        <>
            <a className="skip-link" href="#main-content">
                پرش به محتوای اصلی
            </a>
            <Header categories={categories} menu={menu} />
            <main id="main-content" tabIndex={-1}>
                <Hero />
                <Categories categories={categories} />
                <Promos />
                <ProductGrid products={products} />
                <Guide />
                <CartPanel />
            </main>
            <Footer categories={categories} />
        </>
    )
}