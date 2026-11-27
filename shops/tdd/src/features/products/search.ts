import Fuse from 'fuse.js'
import type { Product } from '../../shared/types'

function normalize(value: string) {
    return value
        .replace(/[يى]/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/[\u064B-\u065F\u0670]/g, '')
        .replace(/\u200c/g, ' ')
        .trim()
}

export function createProductSearch(products: Product[]): (query: string, categoryId?: number) => Product[] {
    const searchable = products.map(product => ({ product, name: normalize(product.name) }))
    const fuse = new Fuse(searchable, { keys: ['name'], threshold: 0.3, ignoreLocation: true, minMatchCharLength: 2 })

    return (query, categoryId) => {
        const normalizedQuery = normalize(query)
        if (!normalizedQuery) return []

        const exactMatches = searchable.filter(item => item.name.includes(normalizedQuery))
        const matches = exactMatches.length
            ? exactMatches.map(item => item.product)
            : fuse.search(normalizedQuery).map(result => result.item.product)

        return matches.filter(product => categoryId === undefined || product.categoryId === categoryId)
    }
}
