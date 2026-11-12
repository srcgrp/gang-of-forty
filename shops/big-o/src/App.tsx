import Footer from "./components/Footer";
import Header from "./components/Header";
import type { CartItem, LoadState} from "./types"
import CartPanel from "./components/CartPanel"
import { useEffect, useState } from "react";
import { addToCart, decreaseItem } from "./cart/cartItems";
import { getData } from "./api/getData";
import ShopMain from "./components/ShopMain";
import { loadCart, saveCart } from "./storage/cart";


export default function App() {
  const [cart,setCart] = useState <CartItem[]> (() => loadCart())
  const [state, setState] = useState <LoadState> ({status: 'loading'})
  const [categoryId, setCategoryId] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    getData().then((data) => { 
      if (ignore) return
      if (data.products.length === 0) {
        setState({status: "empty"})
      } else {
        setState({status: "success" , ...data})
      }
    }).catch((error: unknown) => {
      if (ignore) return
      setState({status: "error", message : error instanceof Error ? error.message : "خطای ناشناخته"})
    })
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const categories = state.status === "success" ? state.categories : []

  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  function handleAdd(id: number) {
    if (state.status !== "success") return 
    const product = state.products.find((item) => item.id === id)
    if (product === undefined) return
    setCart(addToCart(cart, product)) 
  }

  function handleRemove (id: number) {
      setCart(decreaseItem(cart, id))
  }

  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <Header count={count} categories={categories} onSelect={setCategoryId} />
      <main id="main-content">
        <ShopMain
          state={state}
          categoryId={categoryId}
          onAdd={handleAdd}
          onSelectCategory={setCategoryId}
        />
      </main>
      <CartPanel
        items={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
      <Footer />
    </>
    
  )
}