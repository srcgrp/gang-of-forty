import type { Home } from "../types"
import { getJSON } from "./getJSON"
import { isHome } from "./isHome"

export async function loadHome(path: string): Promise<Home> {
    const data = await getJSON(path)

    if (!isHome(data)) {
        throw new Error("اطلاعات صفحهٔ اصلی معتبر نیست.")
    }

    return data
}