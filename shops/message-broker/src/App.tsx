import { useEffect, useState } from 'react'

import type { Category, Product, Offer, CartLine } from './types'
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
  const [products, setProducts] = useState<Product[]>([])
  const [offers, setOffers] = useState<Offer[]>([])

  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<CartLine[]>([])

  useEffect(() => {
    Promise.all([
      loadCategories(),
      loadProducts(),
      loadOffers()
    ])
      .then(([loadedCategories, loadedProducts, loadedOffers]) => {
        setCategories(loadedCategories)
        setProducts(loadedProducts)
        setOffers(loadedOffers)
      })
      .catch(error => {
        console.error('خطا در دریافت اطلاعات:', error)
      })
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

  return (
    <>
      <Header itemCount={itemCount} />

      <main id="main">
        <Hero />

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
      </main>

      <Footer />
    </>
  )
}
