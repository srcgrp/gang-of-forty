import type { Product } from "./types"
import ShopPage from "./components/ShopPage"
import { getProductCardData } from "./catalog/getProductCardData"
import {
    sampleCategories,
    sampleMenu,
    sampleOffers,
    sampleStock
} from "./data/sampleCatalog"

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
    function handleAdd(id: number): void {
        console.log("درخواست افزودن کالا:" + " " + id)
    }

    function handlePick(id: number | null): void {
        console.log("دستهٔ انتخاب‌شده:", id)
    }

    const cards = sampleProducts.map(function (product) {
        return getProductCardData(
            product,
            sampleCategories,
            sampleOffers,
            sampleStock
        )
    })

    return (
        <ShopPage
            categories={sampleCategories}
            menu={sampleMenu}
            products={cards}
            onAdd={handleAdd}
            onPick={handlePick}
        />
    )
}