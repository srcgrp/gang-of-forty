import type { CartLine, LoadState } from '../../../shared/types.ts'
import { finalPrice } from './price.ts'
import { offerMap } from './select.ts'

export function cartSummary(state: LoadState, lines: CartLine[]) {
  if (state.status !== 'success') return { rows: [], total: 0 }
  const offers = offerMap(state.offers)
  const rows = lines.flatMap((line) => {
    const product = state.products.find((p) => p.id === line.id)
    if (!product) return []
    const price = finalPrice(product.price, offers.get(product.id))
    return [{ id: product.id, title: product.name, qty: line.qty, subtotal: price * line.qty }]
  })
  const total = rows.reduce((sum, row) => sum + row.subtotal, 0)
  return { rows, total }
}