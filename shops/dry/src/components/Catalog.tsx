import { cardsInCategory, offeredCards } from '../features/products/catalog/view.ts'
import { sectionsOf } from '../features/products/catalog/sections.ts'
import type { LoadState } from '../shared/types.ts'
import ProductGrid from './ProductGrid.tsx'
import Status from './Status.tsx'

type CatalogProps = {
  state: LoadState
  categoryId: number | null
  query: string
  onRetry: () => void
}

export default function Catalog({ state, categoryId, query, onRetry }: CatalogProps) {
  if (state.status !== 'success') return <Status state={state} onRetry={onRetry} />
  const filtered = categoryId !== null || query.trim() !== ''
  return (
    <>
      <ProductGrid id="offers" title="پیشنهادهای ویژه" prefix="offer" carouselId="offers"
        cards={offeredCards(state)} />
       <div id="products">
        {filtered && (
          <ProductGrid id="results" title="نتایج" prefix="product"
            cards={cardsInCategory(state, categoryId, query)} />
        )}
      </div>
      {sectionsOf(state).map((s) => (
        <ProductGrid key={s.slug} id={s.slug} title={s.name} prefix={s.slug} carouselId={s.slug}
          cards={s.cards} />
      ))}
    </>
  )
}