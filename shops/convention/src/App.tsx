import { useState } from 'react'
import { useCartStore } from './hooks/useCartStore'
import { useCatalog } from './hooks/useCatalog'
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

  const catalog = useCatalog()

  // Get products from API
  const products =
    catalog.status === 'success'
      ? catalog.data.products
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
        state={catalog.status === 'success' ? { status: 'success', data: products } : catalog}
        products={filteredProducts}
        onRetry={catalog.retry}
       />

      <CartPanel
        items={cartLines}
        total={total}
      />
    </div>
  )
}
