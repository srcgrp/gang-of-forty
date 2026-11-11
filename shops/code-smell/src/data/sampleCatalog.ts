import type { Category, Link, Offer, Stock } from "../types"

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