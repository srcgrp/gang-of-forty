import type { ReactNode } from 'react'
import Header from './components/Header'
import PageLayout from './components/PageLayout'
import LoadingContent from './components/LoadingContent'
import SuccessContent from './components/SuccessContent'
import { useCatalog } from './hooks/useCatalog'
import { useCategorySelection } from './hooks/useCategorySelection'
import { useCartStore } from './hooks/useCartStore'
import { useDocumentTitle } from './hooks/useDocumentTitle'

export default function App(): ReactNode {
  const catalogState = useCatalog()
  const { selectedCategoryId, onCategoryPick } = useCategorySelection()
  const cartItemCount = useCartStore((state) => state.itemCount)
  useDocumentTitle(cartItemCount)

  const isReady = catalogState.status === 'success'

  return (
    <PageLayout
      header={
        <Header
          cartCount={catalogState.dataReady ? cartItemCount : 0}
          categories={catalogState.categories}
          selectedCategoryId={catalogState.dataReady ? selectedCategoryId : null}
          onCategoryPick={catalogState.dataReady ? onCategoryPick : () => {}}
        />
      }
      mainContent={
        isReady ? (
          <SuccessContent catalog={catalogState.data} />
        ) : (
          <LoadingContent
            status={catalogState.status === 'error' ? 'error' : 'loading'}
            errorMessage={
              catalogState.status === 'error' ? catalogState.message : undefined
            }
          />
        )
      }
      showFooter={isReady}
    />
  )
}
