import type { Card, LoadSuccess } from '../../../shared/types.ts'
import { cardsOf } from './view.ts'

export function cardById(data: LoadSuccess, id: number): Card | null {
    const Product = data.products.find((p) => p.id === id)
    return Product ? cardsOf(data, [Product])[0] ?? null : null
}