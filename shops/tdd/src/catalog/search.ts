import Fuse from 'fuse.js'
import type { Product } from '../types'

export function createProductSearch(products: Product[]): (query: string) => Product[] {
    const fuse = new Fuse(products, { keys: ["name"], threshold: 0.4, ignoreLocation: true })
    return query => fuse.search(query).map(result => result.item)
}
