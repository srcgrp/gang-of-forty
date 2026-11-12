
import { useEffect, useState } from 'react'

import type { Category, Offer, CartLine, LoadState } from './types'
import { assertNever } from './types'
import { loadCategories, loadProducts, loadOffers } from './api/client'

import { addToCart, removeFromCart, cartCount, cartTotal } from './cart/cart'

import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'
import Footer from './components/Footer'

export default function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const [offers, setOffers] = useState<Offer[]>([])

  const [loadState, setLoadState] = useState<LoadState>({
    status: 'loading'
  })

  const products =
    loadState.status === 'success' ? loadState.products : []

  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<CartLine[]>([])

  useEffect(() => {
    let ignore = false

    Promise.all([
      loadCategories(),
      loadProducts(),
      loadOffers()
    ])
      .then(([loadedCategories, loadedProducts, loadedOffers]) => {
        if (ignore) return

        setCategories(loadedCategories)
        setOffers(loadedOffers)

        if (loadedProducts.length === 0) {
          setLoadState({ status: 'empty' })
        } else {
          setLoadState({
            status: 'success',
            products: loadedProducts
          })
        }
      })
      .catch(error => {
        if (ignore) return

        setLoadState({
          status: 'error',
          message: error instanceof Error
            ? error.message
            : 'خطا در دریافت اطلاعات'
        })
      })

    return () => {
      ignore = true
    }
  }, [])

  // محصولات دسته‌بندی انتخاب‌شده
  const visibleProducts = categoryId === null
    ? products
    : products.filter(product => product.categoryId === categoryId)

  // محصولات دارای تخفیف برای بخش پیشنهاد ویژه
  const specialProducts = products.filter(product =>
    offers.some(offer => offer.productId === product.id)
  )

  // افزودن محصول به سبد خرید
  function handleAdd(productId: number) {
    setCart(currentCart => addToCart(currentCart, productId))
  }

  // حذف محصول از سبد خرید
  function handleRemove(productId: number) {
    setCart(currentCart => removeFromCart(currentCart, productId))
  }

  // مقادیر محاسبه‌شده از State
  const itemCount = cartCount(cart)
  const total = cartTotal(cart, products, offers)

  // نمایش وضعیت دریافت اطلاعات
  function renderContent() {
    switch (loadState.status) {
      case 'loading':
        return <p>در حال دریافت اطلاعات...</p>

      case 'empty':
        return <p>محصولی برای نمایش وجود ندارد.</p>

      case 'error':
        return (
          <p role="alert">
            خطا در دریافت اطلاعات: {loadState.message}
          </p>
        )

      case 'success':
        return (
          <>
            <CategoryNav
              categories={categories}
              activeCategoryId={categoryId}
              onPick={setCategoryId}
            />

            <section className="wrap" id="best-selling">
              <div className="head">
                <h2 id="best-title">پیشنهاد ویژه</h2>
                <div>
                  <a href="#best-title">ابتدا</a>
                  {' '}
                  <a href="#best-title">انتها</a>
                </div>
              </div>

              <ProductGrid
                products={specialProducts}
                offers={offers}
                onAdd={handleAdd}
              />
            </section>

            <Hero id="posters-2" />

            <section className="wrap" id="new-products">
              <div className="head">
                <h2 id="new-title">محصولات</h2>
                <div>
                  <a href="#new-title">ابتدا</a>
                  {' '}
                  <a href="#new-title">انتها</a>
                </div>
              </div>

              <ProductGrid
                products={visibleProducts}
                offers={offers}
                onAdd={handleAdd}
              />
            </section>

            <CartPanel
              cart={cart}
              products={products}
              total={total}
              onRemove={handleRemove}
            />
          </>
        )

      default:
        return assertNever(loadState)
    }
  }

  return (
    <>
      <Header itemCount={itemCount} />

      <main id="main">
        <Hero />
        {renderContent()}
      </main>

      <Footer />
    </>
  )
}
