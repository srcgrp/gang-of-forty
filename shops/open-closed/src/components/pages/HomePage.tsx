import { carouselProducts, catalogProducts } from '../../catalog/catalog.ts'
import { useCatalog } from '../../hooks/useCatalog.ts'
import Banners from '../Banners.tsx'
import CarouselRow from '../CarouselRow.tsx'
import CartPanel from '../CartPanel.tsx'
import Hero from '../Hero.tsx'
import LoadStatus from '../LoadStatus.tsx'

export default function HomePage() {
  const state = useCatalog()

  return (
    <>
      <Hero />
      {state.status === 'success' ? (
        state.data.carousels.map((c) => (
          <CarouselRow
            key={c.id}
            carousel={c}
            products={carouselProducts(state.data, c.id) ?? []}
          />
        ))
      ) : (
        <LoadStatus state={state} />
      )}
      <CartPanel products={catalogProducts(state)} />
      <Banners />
    </>
  )
}