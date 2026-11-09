import type { Shop } from "../types"
import { getJSON } from "./getJSON"
import { isLink } from "./isLink"

function isShop(value: unknown): value is Shop {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "name" in value &&
        typeof value.name === "string" &&
        "slogan" in value &&
        typeof value.slogan === "string" &&
        "owner" in value &&
        typeof value.owner === "string" &&
        "city" in value &&
        typeof value.city === "string" &&
        "phone" in value &&
        typeof value.phone === "string" &&
        "hours" in value &&
        typeof value.hours === "object" &&
        value.hours !== null &&
        "open" in value.hours &&
        typeof value.hours.open === "string" &&
        "close" in value.hours &&
        typeof value.hours.close === "string" &&
        "deliveryFee" in value &&
        typeof value.deliveryFee === "number" &&
        "freeDeliveryOver" in value &&
        typeof value.freeDeliveryOver === "number" &&
        "currency" in value &&
        typeof value.currency === "string" &&
        "notice" in value &&
        typeof value.notice === "string" &&
        "about" in value &&
        typeof value.about === "string" &&
        "address" in value &&
        typeof value.address === "string" &&
        "schedule" in value &&
        Array.isArray(value.schedule) &&
        value.schedule.every(function (entry: unknown) {
            if (typeof entry !== "object" || entry === null) {
                return false
            }
            return (
                "days" in entry &&
                typeof entry.days === "string" &&
                "time" in entry &&
                typeof entry.time === "string"
            )
        }) &&
        "menu" in value &&
        Array.isArray(value.menu) &&
        value.menu.every(isLink) &&
        "help" in value &&
        Array.isArray(value.help) &&
        value.help.every(isLink) &&
        "copyright" in value &&
        typeof value.copyright === "string"
    )
}

export async function loadShop(path: string): Promise<Shop> {
    const data = await getJSON(path)
    if (!isShop(data)) {
        throw new Error("اطلاعات فروشگاه معتبر نیست.")
    }
    return data
}