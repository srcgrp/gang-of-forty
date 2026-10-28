import type { Category, Offer, Product, Stock } from '../types'

export async function getJSON(path: string): Promise<unknown> {
    const res = await fetch(path)
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
    return res.json()
}

export async function loadCategories(base = '/api'): Promise<Category[]> {
    return (await getJSON(`${base}/categories.json`)) as Category[]
}

export async function loadOffers(base = '/api'): Promise<Offer[]> {
    return (await getJSON(`${base}/offers.json`)) as Offer[]
}

export async function loadStock(base = '/api'): Promise<Stock> {
    return (await getJSON(`${base}/stock.json`)) as Stock
}

export async function loadProducts(base = '/api'): Promise<Product[]> {
    return (await getJSON(`${base}/products.json`)) as Product[]
}