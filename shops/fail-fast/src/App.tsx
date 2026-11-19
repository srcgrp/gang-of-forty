import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from './components/Header'
import PageLayout from './components/PageLayout'
import LoadingContent from './components/LoadingContent'
import SuccessContent from './components/SuccessContent'
import { useAppData } from './hooks/useAppData'
import { useCart } from './hooks/useCart'

export default function App(): ReactNode {
  const dataState = useAppData()
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
    if (dataState.status === 'success') {
      return (
        <SuccessContent
          products={dataState.data.products}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )
    }
    return (
      <LoadingContent
        status={dataState.status}
        errorMessage={dataState.status === 'error' ? dataState.message : undefined}
      />
    )
  }

  return (
    <PageLayout
      header={renderHeader()}
      mainContent={renderMainContent()}
      showFooter={dataState.status === 'success'}
    />
  )
}
