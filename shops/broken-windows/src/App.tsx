import Header from "./components/Header"
import Hero from "./components/Hero"
import Benefits from "./components/Benefits"
import CategoryNav from "./components/CategoryNave"
import Footer from "./components/Footer"
import Middle from "./components/Middle"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"
import ProductGrid from "./components/ProductGrid"
import CartPanel from "./components/CartPanel"; // NEW: shows cart rows and total
import type { LoadState ,  CartLine } from "./types"; // all types used here
import { addToCart } from "./cart/addToCart"; // pure function: add to cart
import { removeFromCart } from "./cart/removeFromCart"; // pure function: remove from cart
import { cartTotal, cartCount } from "./cart/totals"; // pure functions: total and count
import { useState, useEffect } from "react";
import Status from "./components/Status"; 
import { loadShopData } from "./api/loadShop.ts";
export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" }); // starts as loading, so the effect never has to set "loading" itself
   const [categoryId, setCategoryId] = useState<number | null>(null); // selected category, null = no filter
   const [cart, setCart] = useState<CartLine[]>([]); // cart lines, starts empty

useEffect(() => { // runs once after the first render
  let ignore = false; // flag: becomes true when this run is cancelled
  loadShopData().then((result) => { // result is already a LoadState: success, empty or error
    if (ignore) return; // cancelled (StrictMode or unmount), throw this answer away
    setState(result); // store the answer; React re-renders
  });
  return () => { // cleanup: runs before the next run and on unmount
    ignore = true; // from now on the old run's answer is ignored
  };
}, []); // empty deps: only once
switch (state.status) { // look at the status field
  case "loading": // still fetching
  case "empty": // no products
  case "error": // something failed
    return <Status state={state} />; // show the message and stop rendering the page
  case "success": // data is ready
    break; // leave the switch and continue below
}

const { products, offers, stock, categories } = state; // after the switch TS knows state is success, so these exist
  
const dairyProducts = products.filter((p) => p.categoryId === 2); 
   const visibleProducts =
    categoryId === null // no category selected?
      ? products // then show every product
      : products.filter((p) => p.categoryId === categoryId); // else keep only this category
  const total = cartTotal(cart); // total price computed from cart
  const count = cartCount(cart); // total item count computed from cart
function handlePick(id: number) { // called by CategoryNav when a category is clicked
    setCategoryId(id === categoryId ? null : id); // clicking the active one clears the filter
  }

   function handleAdd(id: number) { // called by ProductGrid when "+" is clicked
    const product = products.find((p) => p.id === id); // find the clicked product
    if (!product) return; // safety: unknown id, do nothing
    const percent = offers.find((o) => o.productId === id)?.percent; // discount percent, or undefined
    const price =
      percent === undefined // no discount?
        ? product.price // use the normal price
        : Math.round((product.price * (100 - percent)) / 100); // else apply the discount
    setCart((prev) => addToCart(prev, product, price)); // prev = latest cart; we pass a NEW array
  }

  function handleRemove(id: number) { // called by CartPanel when ✕ is clicked
    setCart((prev) => removeFromCart(prev, id)); // set a NEW array without that line
  }

  return (
    <>
      {/* Header receives the item count as a prop */}
      <Header cartCount={count} />

      {/* Top navigation, unchanged */}
      <Navigation />

      {/* Main content wrapper */}
      <main className="site-main">
        {/* Banner, unchanged */}
        <Hero />

        {/* Benefits strip, unchanged */}
        <Benefits />

        {/* Categories: data goes down, click event goes up */}
        <CategoryNav categories={categories} activeId={categoryId} onPick={handlePick} />

        {/* First carousel now shows only the filtered products */}
        <ProductGrid
          title="پرفروش‌های امروز" // section title
          id="special-offer" // anchor id
          products={visibleProducts} // filtered list
          offers={offers} // discounts
          stock={stock} // stock info
          onAdd={handleAdd} // "+" click handler
        />

        {/* Broken-window section, unchanged */}
        <Middle />

        {/* Second carousel is not filtered, it always shows all products */}
        <ProductGrid
          title="لبنیات و بستنی "
          id="special-offer-nuts" 
          nuts
          products={dairyProducts}
          offers={offers} 
          stock={stock} 
          onAdd={handleAdd} 
        />

        {/* Cart rows, remove buttons and total */}
        <CartPanel cart={cart} total={total} onRemove={handleRemove} />

        {/* Newsletter section, unchanged */}
        <Notification />
      </main>

      {/* Footer, unchanged */}
      <Footer />
    </>
  );
}

