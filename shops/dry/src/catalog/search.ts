import Fuse, { type FuseResult } from 'fuse.js'
import type { Product, SearchItem } from '../types.ts'

export function normalize(text: string): string {
    return text 
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\u200c/g, ' ')
    .replace(/[۰-۹]/g, (d: string): string => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d: string): string => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .toLowerCase()
    .trim()
}

export function makeSearch(products: Product[]): (query: string) => Product[] {
    const items: SearchItem[] = products.map(
        (p: Product): SearchItem => ({
            product: p,
            name: normalize(p.name),
            tags: normalize(p.tags.join(' '))
        })
    )
    const fuse: Fuse<SearchItem> = new Fuse<SearchItem>(items, {
        keys: [
            { name: 'name', weight:3 },
            { name: 'tags', weight: 1},
        ],
        threshold: 0.3,
        ignoreLocation: true,
    })
    return (query: string): Product[] =>
        fuse.search(normalize(query)).map((r: FuseResult<SearchItem>): Product => r.item.product)
}