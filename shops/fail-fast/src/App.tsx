import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Product, Category, CartLine, LoadState } from './types'
import { addToCart, removeFromCart, getCartItemCount } from './cart'
import { getJSON } from './api/client'
import { filterValidProducts, isCategory } from './api/guards'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'
import HeroBanner from './components/HeroBanner'
import PopularCategories from './components/PopularCategories'
import Banner02 from './components/Banner02'
import Advertisement from './components/Advertisement'
import Footer from './components/Footer'

// API URLs
const API_BASE = import.meta.env.VITE_API_URL
const API_PRODUCTS_URL = `${API_BASE}/products.json`
const API_CATEGORIES_URL = `${API_BASE}/categories.json`

// Data type for loaded state
interface AppData {
  products: Product[]
  categories: Category[]
}

export default function App(): ReactNode {
  // API data loading state
  const [dataState, setDataState] = useState<LoadState<AppData>>({ status: 'loading' })

  // Category selection state
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  // Cart state
  const [cart, setCart] = useState<CartLine[]>([])

  // Fetch products and categories on mount
  useEffect(() => {
    let ignore = false

    Promise.all([
      getJSON(API_PRODUCTS_URL),
      getJSON(API_CATEGORIES_URL),
    ])
      .then(([productsData, categoriesData]) => {
        if (ignore) return

        // Validate products
        const products = filterValidProducts(productsData)

        // Validate categories
        if (!Array.isArray(categoriesData)) {
          if (!ignore) {
            setDataState({
              status: 'error',
              message: 'داده دسته‌بندی نامعتبر است',
            })
          }
          return
        }

        const categories: Category[] = []
        for (const item of categoriesData) {
          if (isCategory(item)) {
            categories.push(item)
          }
        }

        // Check for empty data
        if (products.length === 0 || categories.length === 0) {
          if (!ignore) {
            setDataState({ status: 'empty' })
          }
          return
        }

        if (!ignore) {
          setDataState({ status: 'success', data: { products, categories } })
        }
      })
      .catch((error) => {
        if (ignore) return
        console.error('خطا در دریافت داده:', error)
        setDataState({
          status: 'error',
          message: 'دریافت داده با مشکل مواجه شد. لطفاً دوباره تلاش کنید.',
        })
      })

    // Cleanup function
    return () => {
      ignore = true
    }
  }, [])

  // Derived values (calculated during render, not stored in state)
  const cartItemCount = getCartItemCount(cart)

  // Handle category selection
  function handleCategoryPick(categoryId: number): void {
    setSelectedCategoryId(categoryId)
  }

  // Handle adding product to cart
  function handleAddToCart(productId: number): void {
    setCart((prevCart) => addToCart(prevCart, productId))
  }

  // Handle removing product from cart
  function handleRemoveFromCart(productId: number): void {
    setCart((prevCart) => removeFromCart(prevCart, productId))
  }

  // Render header based on loading state
  function renderHeader(): ReactNode {
    switch (dataState.status) {
      case 'loading':
      case 'empty':
      case 'error':
        return (
          <Header
            cartCount={0}
            categories={[]}
            selectedCategoryId={null}
            onCategoryPick={() => {}}
          />
        )
      case 'success':
        return (
          <Header
            cartCount={cartItemCount}
            categories={dataState.data.categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryPick={handleCategoryPick}
          />
        )
      default:
        return null
    }
  }

  // Render main content based on loading state
  function renderMainContent(): ReactNode {
    switch (dataState.status) {
      case 'loading':
        return <p role="status">در حال بارگذاری...</p>

      case 'empty':
        return <p>داده‌ای برای نمایش وجود ندارد.</p>

      case 'error':
        return <p role="alert">{dataState.message}</p>

      case 'success':
        const { products } = dataState.data
        return (
          <>
            <HeroBanner />
            <PopularCategories />
            <Banner02 />
            <div className="layout">
              <div className="section-title">
                <h2>محصولات</h2>
              </div>
              <ProductGrid products={products} onAddToCart={handleAddToCart} />
            </div>
            <Advertisement />
            <CartPanel
              cart={cart}
              products={products}
              onRemove={handleRemoveFromCart}
            />
          </>
        )

      default:
        const _exhaustive: never = dataState
        throw new Error(`Unknown state: ${JSON.stringify(_exhaustive)}`)
    }
  }

  return (
    <>
      <div id="top"></div>
      <a href="#main" className="skip">پرش به محتوای اصلی</a>
      {renderHeader()}
      <main id="main">
        {renderMainContent()}
      </main>
      {dataState.status === 'success' && <Footer />}
    </>
  )
}
