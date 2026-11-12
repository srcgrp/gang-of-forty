import {
    isProduct, isCategory, isOffer, isStock
} from './guards'
import type {Stock, Shop, Home} from '../types'
const API = import.meta.env.VITE_API_URL ?? '/api'

export async function getJSON(path: string): Promise<unknown> {
    const res = await fetch(path)
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
    return res.json()
}

async function loadList<T>(
    file: string,
    guard: (x: unknown) => x is T
): Promise<T[]> {
    const data = await getJSON(`${API}/${file}`)
    if (!Array.isArray(data)) throw new Error(`${file} is not a list`)
    const items = data.filter(guard)
    const dropped = data.length - items.length
    if (dropped > 0) console.warn(`${dropped} invalid items removed from ${file}`)
    return items
}

export const loadProducts = () => loadList('products.json', isProduct)
export const loadCategories = () => loadList('categories.json', isCategory)
export const loadOffers = () => loadList('offers.json', isOffer)

export async function loadStock(): Promise<Stock> {
    const data = await getJSON(`${API}/stock.json`)
    if (!isStock(data)) throw new Error('Invalid stock.json')
    return data
}

export async function loadShop(): Promise<Shop> {
    const data = await getJSON(`${API}/shop.json`)
    if (!isShop(data)) throw new Error('Invalid shop.json')
    return data
}

export async function loadHome(): Promise<Home> {
    const data = await getJSON(`${API}/home.json`)
    if (!isHome(data)) throw new Error('Invalid home.json')
    return data
}

function isShop(x: unknown): x is Shop {
    return typeof x === 'object' && x !== null &&
        'notice' in x && typeof x.notice === 'string' &&
        'about' in x && typeof x.about === 'string' &&
        'address' in x && typeof x.address === 'string' &&
        'phone' in x && typeof x.phone === 'string' &&
        'menu' in x && Array.isArray(x.menu) &&
        'help' in x && Array.isArray(x.help) &&
        'schedule' in x && Array.isArray(x.schedule)
}

function isHome(x: unknown): x is Home {
    return typeof x === 'object' && x !== null &&
        'hero' in x && typeof x.hero === 'object' &&
        x.hero !== null && 'side' in x &&
        typeof x.side === 'object' && x.side !== null &&
        'promos' in x && Array.isArray(x.promos)
}
