import { useEffect, useState } from 'react'
import type { CartItem, Product, LoadState } from './types'

import { getProducts } from './api/products'
import {
  addToCart,
  removeFromCart,
  getCartCount,
} from './cart/cart'

import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const [productsState, setProductsState] = useState<LoadState<Product[]>>({
    status: 'loading',
  })

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
  }, [])

  function handleAdd(id: number) {
    setCart((previousCart) => addToCart(previousCart, id))
  }

  function handleRemove(id: number) {
    setCart((previousCart) => removeFromCart(previousCart, id))
  }

  const products =
    productsState.status === 'success'
      ? productsState.data
      : []

  const cartLines = cart.flatMap((item) => {
    const product = products.find(
      (product) => product.id === item.productId
    )

    return product
      ? [{ ...product, quantity: item.quantity }]
      : []
  })

  const total = cartLines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <>
      <Header cartCount={getCartCount(cart)} />

      <CategoryNav />

      <ProductGrid
        state={productsState}
        onAdd={handleAdd}
      />

      <CartPanel
        items={cartLines}
        total={total}
        onRemove={handleRemove}
      />
    </>
  )
}