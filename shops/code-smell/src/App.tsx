import type { Category, Link, Product } from "./types"
import ShopPage from "./components/ShopPage"
const sampleCategories: Category[] = [
    {
        id: 1,
        slug: "fruits",
        name: "میوه‌ها",
        emoji: "🍎",
        color: "#fde3dc"
    },
    {
        id: 2,
        slug: "dairy",
        name: "لبنیات",
        emoji: "🥛",
        color: "#e2eefc"
    }
]

const sampleMenu: Link[] = [
    { label: "پیشنهاد ویژه", href: "#special-offers" },
    { label: "راهنمای خرید", href: "#shopping-guide" }
]

const sampleProducts: Product[] = [
    {
        id: 1,
        categoryId: 1,
        name: "سیب",
        emoji: "🍎",
        unit: "۱ کیلوگرم",
        price: 85000,
        tags: ["تازه"]
    },
    {
        id: 2,
        categoryId: 1,
        name: "پرتقال",
        emoji: "🍊",
        unit: "۱ کیلوگرم",
        price: 70000,
        tags: ["تازه"]
    },
    {
        id: 3,
        categoryId: 2,
        name: "شیر",
        emoji: "🥛",
        unit: "۱ لیتر",
        price: 45000,
        tags: []
    }
]

export default function App() {
    return (
        <ShopPage
            categories={sampleCategories}
            menu={sampleMenu}
            products={sampleProducts}
        />
    )
}