import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Product, Category, CartLine, LoadState } from './types'
import { addToCart, removeFromCart, getCartItemCount } from './cart'
import { getJSON } from './api/client'
import { filterValidProducts, isCategory } from './api/guards'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'

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

  // Render based on loading state
  switch (dataState.status) {
    case 'loading':
      return (
        <>
          <div id="top"></div>
          <a href="#main" className="skip">پرش به محتوای اصلی</a>
          <Header cartCount={0} />
          <main id="main">
            <p role="status">در حال بارگذاری...</p>
          </main>
        </>
      )

    case 'empty':
      return (
        <>
          <Header cartCount={0} />
          <main id="main">
            <p>داده‌ای برای نمایش وجود ندارد.</p>
          </main>
        </>
      )

    case 'error':
      return (
        <>
          <Header cartCount={0} />
          <main id="main">
            <p role="alert">{dataState.message}</p>
          </main>
        </>
      )

    case 'success':
      const { products, categories } = dataState.data

      return (
        <>
          <Header cartCount={cartItemCount} />
          <CategoryNav
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onPick={handleCategoryPick}
          />
          <main id="main">
            <div className="layout">
              <div className="section-title">
                <h2>محصولات</h2>
              </div>
              <ProductGrid products={products} onAddToCart={handleAddToCart} />
            </div>
            <CartPanel
              cart={cart}
              products={products}
              onRemove={handleRemoveFromCart}
            />
          </main>
        </>
      )

    default:
      // Exhaustive check
      const _exhaustive: never = dataState
      throw new Error(`Unknown state: ${JSON.stringify(_exhaustive)}`)
  }
}
