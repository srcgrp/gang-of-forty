import type { Product } from '../types'
import { isProduct } from './guards'

const API_URL = import.meta.env.VITE_API_URL

export const PRODUCTS_URL = `${API_URL}/products.json`
export const STOCK_URL = `${API_URL}/stock.json`
export const OFFERS_URL = `${API_URL}/offers.json`
export const CATEGORIES_URL = `${API_URL}/categories.json`
export const SHOP_URL = `${API_URL}/shop.json`
export const HOME_URL = `${API_URL}/home.json`

export async function getJSON(path: string): Promise<unknown> {
    const response = await fetch(path)
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`)
    return response.json()
}

export async function loadJSON<T>(
    path: string,
    isValid: (value: unknown) => value is T
): Promise<T> {
    const data = await getJSON(path)
    if (!isValid(data)) throw new Error(`Invalid API data: ${path}`)
    return data
}

export async function loadProducts(): Promise<Product[]> {
    const data = await getJSON(PRODUCTS_URL)
    if (!Array.isArray(data)) throw new Error("Invalid products data")

    const products = data.filter(isProduct)
    const invalidCount = data.length - products.length
    if (invalidCount > 0) console.warn(`Skipped ${invalidCount} invalid products`)

    return products
}
