import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from './components/Header'
import PageLayout from './components/PageLayout'
import LoadingContent from './components/LoadingContent'
import SuccessContent from './components/SuccessContent'
import { useAppData } from './hooks/useAppData'
import { useHomeData } from './hooks/useHomeData'
import { useOffers } from './hooks/useOffers'
import { useCartStore } from './hooks/useCartStore'
import { useDocumentTitle } from './hooks/useDocumentTitle'

export default function App(): ReactNode {
  const dataState = useAppData()
  const homeState = useHomeData()
  const offersState = useOffers()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const cartItemCount = useCartStore((state) => state.itemCount)
  useDocumentTitle(cartItemCount)

  const handleCategoryPick = (id: number) => setSelectedCategoryId(id)
  const dataReady = dataState.status === 'success'
  const allReady =
    dataReady &&
    homeState.status === 'success' &&
    offersState.status === 'success'
  const failed = [dataState, homeState, offersState].find(
    (state) => state.status === 'error'
  )

  return (
    <PageLayout
      header={
        <Header
          cartCount={dataReady ? cartItemCount : 0}
          categories={dataReady ? dataState.data.categories : []}
          selectedCategoryId={dataReady ? selectedCategoryId : null}
          onCategoryPick={dataReady ? handleCategoryPick : () => {}}
        />
      }
      mainContent={
        allReady ? (
          <SuccessContent
            products={dataState.data.products}
            carousels={homeState.data.carousels}
            offers={offersState.data}
          />
        ) : (
          <LoadingContent
            status={failed?.status === 'error' ? 'error' : 'loading'}
            errorMessage={failed?.status === 'error' ? failed.message : undefined}
          />
        )
      }
      showFooter={allReady}
    />
  )
}
