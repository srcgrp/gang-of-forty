import type { CardProduct } from "./types.ts"
import Footer from "./components/Footer.tsx"
import ProductGrid from "./components/ProductGrid.tsx"
import Header from "./components/Header.tsx"
import Hero from "./components/Hero.tsx"
import CategoryNav from "./components/CategoryNav.tsx"
import CartPanel from "./components/CartPanel.tsx"

const SAMPLE: CardProduct[] = [
    {
    id: 1,
    name: "سیب",
    emoji: "🍎",
    unit: "هر کیلو",
    price: 120000,
    stock: 5,
    },
    {
    id: 2,
    name: "سیب",
    emoji: "🍎",
    unit: "هر کیلو",
    price: 120000,
    stock: 0,
    },
    {
    id: 3,
    name: "سیب",
    emoji: "🍎",
    unit: "هر کیلو",
    price: 120000,
    percent: 18,
    newPrice: 99000,
    stock: 5,
    },
]

export default function App() {
    return (
        <>
            <a href="#main" className="skip-link">پرش به محتوای اصلی</a>
            <Header />
            <main id="main">
                <Hero />
                <CategoryNav />
                <ProductGrid products={SAMPLE} onAdd={() => {}} />
                <CartPanel />
            </main>
            <Footer />

        </>
    )
}