
import { useEffect, useState } from 'react'
import type { Product, LoadState } from './types'
import { useCartStore } from './hooks/useCartStore'

import { getProducts } from './api/products'

import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'

import SaleCountdown from './components/SaleCountdown'
import { useThemeStore } from './hooks/useThemeStore'

export default function App() {
  const theme = useThemeStore((state) => state.theme)
  const cart = useCartStore((state) => state.lines)

  const [searchTerm, setSearchTerm] = useState('')

  const [productsState, setProductsState] = useState<LoadState<Product[]>>({
    status: 'loading',
  })

  const [retryCount, setRetryCount] = useState(0)
  

  useEffect(() => {
    const controller = new AbortController()
    

    getProducts(controller.signal)
      .then((products) => {
        if (products.length === 0) {
          setProductsState({ status: 'empty' })
        } else {
          setProductsState({
            status: 'success',
            data: products,
          })
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        setProductsState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'خطای ناشناخته در دریافت محصولات',
        })
      })

    return () => {
      controller.abort()
    }
  }, [retryCount])

  function handleRetry() {
  setProductsState({ status: 'loading' })
  setRetryCount((previous) => previous + 1)
}

  // Get products from API
  const products =
    productsState.status === 'success'
      ? productsState.data
      : []

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Build cart lines
  const cartLines = cart.flatMap((item) => {
    const product = products.find(
      (product) => product.id === item.productId
    )

    return product
      ? [{ ...product, quantity: item.quantity }]
      : []
  })

  // Calculate cart total
  const total = cartLines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="app" data-theme={theme}>
      <Header
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
/>

      <CategoryNav />

      <SaleCountdown />

      <ProductGrid
        state={productsState}
        products={filteredProducts}
        onRetry={handleRetry}
       />

      <CartPanel
        items={cartLines}
        total={total}
      />
    </div>
  )
}
