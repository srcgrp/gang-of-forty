import Fuse from 'fuse.js'
import type { Product } from '../../shared/types'

export function createProductSearch(products: Product[]): (query: string, categoryId?: number) => Product[] {
    const fuse = new Fuse(products, { keys: ["name"], threshold: 0.4, ignoreLocation: true })
    return (query, categoryId) => fuse.search(query)
        .map(result => result.item)
        .filter(product => categoryId === undefined || product.categoryId === categoryId)
}
