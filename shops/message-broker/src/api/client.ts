import { isProduct } from './guards'
import type { Product } from '../types'

export async function getJSON(path: string): Promise<unknown> {
    const res = await fetch(path)
    if (!res.ok) {
        throw new Error(`خطای دریافت داده: ${res.status} ${res.statusText}`)
    }
    const data: unknown = await res.json()
    return data
}

export async function loadProducts(path: string): Promise<Product[]> {
    const raw = await getJSON(path)
    if (!Array.isArray(raw)) {
        throw new Error('قالب داده‌های دریافتی از سرور معتبر نیست.')
    }

    const safeProducts: Product[] = []
    let invalidCount = 0

    for (const item of raw) {
        if (isProduct(item)) {
            safeProducts.push(item)
        } else {
            invalidCount++
        }
    }

    if (invalidCount > 0) {
        console.warn(`${invalidCount} محصول نامعتبر رد شد.`)
    }

    return safeProducts
}