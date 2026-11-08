import { cardsInCategory, dairyCards, offeredCards } from '../features/products/catalog/view.ts'
import type { LoadState } from '../shared/types.ts'
import ProductGrid from './ProductGrid.tsx'
import Status from './Status.tsx'

type CatalogProps = {
  state: LoadState
  categoryId: number | null
  onAdd: (id: number) => void
  query: string
}

export default function Catalog({ state, categoryId, query, onAdd }: CatalogProps) {
  if (state.status !== 'success') return <Status state={state} />

  return (
    <>
      <ProductGrid id="offers" title="پیشنهادهای ویژه" prefix="offer"
        cards={offeredCards(state)} onAdd={onAdd} />
      <ProductGrid id="dairy" title="لبنیات" prefix="dairy"
        cards={dairyCards(state)} onAdd={onAdd} />
      <ProductGrid id="products" title="محصولات" prefix="product"
        cards={cardsInCategory(state, categoryId, query)} onAdd={onAdd} />
    </>
  )
}