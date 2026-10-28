import { loadProducts } from "./loadProducts"
import { loadStock } from "./loadStock"
import { loadOffers } from "./loadOffers"
import { loadCategories } from "./loadCategories"
import { loadShop } from "./loadShop"
import { loadHome } from "./loadHome"
import type { ShopData } from "../types"

export async function loadShopData(
    apiUrl: string,
    onSlow: () => void
): Promise<ShopData> {
    let slowTimer: number | undefined

    try {
        const requests = Promise.all([
            loadProducts(apiUrl + "products.json"),
            loadStock(apiUrl + "stock.json"),
            loadOffers(apiUrl + "offers.json"),
            loadCategories(apiUrl + "categories.json"),
            loadShop(apiUrl + "shop.json"),
            loadHome(apiUrl + "home.json")
        ])

        const slowConnection = new Promise<"slow">(function (resolve) {
            slowTimer = window.setTimeout(function () {
                resolve("slow")
            }, 3000)
        })

        let data = await Promise.race([requests, slowConnection])

        if (data === "slow") {
            onSlow()
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