import type { Category, Link, Offer, Product, Stock } from "../types"

export const sampleCategories: Category[] = [
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

export const sampleMenu: Link[] = [
    { label: "پیشنهاد ویژه", href: "#special-offers" },
    { label: "راهنمای خرید", href: "#shopping-guide" }
]

export const sampleOffers: Offer[] = [
    {
        productId: 1,
        percent: 10,
        label: "تخفیف نمونه"
    }
]

export const sampleStock: Stock["items"] = {
    "1": 5,
    "2": 0,
    "3": 8
}
export const sampleProducts: Product[] = [
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