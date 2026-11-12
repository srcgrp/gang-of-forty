import { loadProducts } from "./loadProducts"
import { loadStock } from "./loadStock"
import { loadOffers } from "./loadOffers"
import { loadCategories } from "./loadCategories"
import { loadShop } from "./loadShop"
import { loadHome } from "./loadHome"
import type { ShopData } from "../types"

export async function loadShopData(
    onSlow: (message: string) => void
): Promise<ShopData> {
    let slowTimer: number | undefined

    try {
        const requests = Promise.all([
            loadProducts("products.json"),
            loadStock("stock.json"),
            loadOffers("offers.json"),
            loadCategories("categories.json"),
            loadShop("shop.json"),
            loadHome("home.json")
        ])

        const slowConnection = new Promise<"slow">(function (resolve) {
            slowTimer = window.setTimeout(function () {
                resolve("slow")
            }, 3000)
        })

        let data = await Promise.race([requests, slowConnection])

        if (data === "slow") {
            onSlow(
                "اتصال کند است؛ هنوز در حال دریافت اطلاعات فروشگاه هستیم..."
            )
            data = await requests
        }

        return {
            products: data[0],
            stock: data[1],
            offers: data[2],
            categories: data[3],
            shop: data[4],
            home: data[5]
        }
    } finally {
        window.clearTimeout(slowTimer)
    }
}

export function getLoadErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message
    } else {
        return "دریافت اطلاعات فروشگاه انجام نشد."
    }
}