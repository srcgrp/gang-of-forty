import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from './components/Header'
import PageLayout from './components/PageLayout'
import LoadingContent from './components/LoadingContent'
import SuccessContent from './components/SuccessContent'
import { useAppData } from './hooks/useAppData'
import { useHomeData } from './hooks/useHomeData'
import { useOffers } from './hooks/useOffers'
import { useCart } from './hooks/useCart'

export default function App(): ReactNode {
  const dataState = useAppData()
  const homeState = useHomeData()
  const offersState = useOffers()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const { cart, cartItemCount, handleAddToCart, handleRemoveFromCart } = useCart()

  const handleCategoryPick = (categoryId: number) =>
    setSelectedCategoryId(categoryId)

  const renderHeader = (): ReactNode => {
    if (dataState.status !== 'success') {
      return (
        <Header
          cartCount={0}
          categories={[]}
          selectedCategoryId={null}
          onCategoryPick={() => {}}
        />
      )
    }
    return (
      <Header
        cartCount={cartItemCount}
        categories={dataState.data.categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryPick={handleCategoryPick}
      />
    )
  }

  const renderMainContent = (): ReactNode => {
    if (
      dataState.status === 'success' &&
      homeState.status === 'success' &&
      offersState.status === 'success'
    ) {
      return (
        <SuccessContent
          products={dataState.data.products}
          cart={cart}
          carousels={homeState.data.carousels}
          offers={offersState.data}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )
    }
    return (
      <LoadingContent
        status={dataState.status === 'error' ? 'error' : homeState.status === 'error' ? 'error' : offersState.status === 'error' ? 'error' : 'loading'}
        errorMessage={
          dataState.status === 'error' ? dataState.message :
          homeState.status === 'error' ? homeState.message :
          offersState.status === 'error' ? offersState.message : undefined
        }
      />
    )
  }

  const showFooter = dataState.status === 'success' &&
    homeState.status === 'success' &&
    offersState.status === 'success'

  return (
    <PageLayout
      header={renderHeader()}
      mainContent={renderMainContent()}
      showFooter={showFooter}
    />
  )
}
