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
import type { Product, Offer, StockData, Category, CartLine } from "./types"; // all types used here
import { addToCart } from "./api/cart/addToCart"; // pure function: add to cart
import { removeFromCart } from "./api/cart/removeFromCart"; // pure function: remove from cart
import { cartTotal, cartCount } from "./api/cart/totals"; // pure functions: total and count
import { useState } from "react";

export default function App() {
  const products: Product[] = [
  {"id": 101, "categoryId": 1, "name": "سیب قرمز دماوند", "emoji": "🍎", "unit": "۱ کیلو", "price": 85000, "tags": ["تازه"]},
  {"id": 102, "categoryId": 1, "name": "پرتقال تامسون شمال", "emoji": "🍊", "unit": "۱ کیلو", "price": 72000, "tags": ["تازه", "فصل"]},
  {"id": 103, "categoryId": 1, "name": "موز", "emoji": "🍌", "unit": "۱ کیلو", "price": 98000, "tags": []},
  {"id": 104, "categoryId": 1, "name": "گوجه‌فرنگی", "emoji": "🍅", "unit": "۱ کیلو", "price": 45000, "tags": ["تازه"]},
  {"id": 105, "categoryId": 1, "name": "خیار سالادی", "emoji": "🥒", "unit": "۱ کیلو", "price": 50000, "tags": ["تازه"]},
  {"id": 106, "categoryId": 1, "name": "انگور بی‌دانه", "emoji": "🍇", "unit": "۱ کیلو", "price": 120000, "tags": ["فصل"]},
  {"id": 107, "categoryId": 1, "name": "هندوانه", "emoji": "🍉", "unit": "۱ عدد", "price": 180000, "tags": []},
  {"id": 201, "categoryId": 2, "name": "شیر کم‌چرب", "emoji": "🥛", "unit": "۱ لیتر", "price": 38000, "tags": []},
  {"id": 202, "categoryId": 2, "name": "پنیر لیقوان", "emoji": "🧀", "unit": "۴۰۰ گرم", "price": 165000, "tags": ["محلی"]},
  {"id": 203, "categoryId": 2, "name": "ماست چکیده", "emoji": "🥣", "unit": "۷۵۰ گرم", "price": 69000, "tags": []},
  {"id": 204, "categoryId": 2, "name": "کره حیوانی", "emoji": "🧈", "unit": "۱۰۰ گرم", "price": 70000, "tags": []},
  {"id": 205, "categoryId": 2, "name": "بستنی وانیلی", "emoji": "🍦", "unit": "۱ لیتر", "price": 110000, "tags": []},
  {"id": 206, "categoryId": 2, "name": "تخم‌مرغ", "emoji": "🥚", "unit": "۱۲ عدد", "price": 95000, "tags": ["تازه"]},
  {"id": 301, "categoryId": 3, "name": "نان سنگک", "emoji": "🫓", "unit": "۱ عدد", "price": 12000, "tags": ["تازه"]},
  {"id": 302, "categoryId": 3, "name": "نان باگت", "emoji": "🥖", "unit": "۱ عدد", "price": 18000, "tags": []},
  {"id": 303, "categoryId": 3, "name": "کیک یزدی", "emoji": "🧁", "unit": "۶ عدد", "price": 95000, "tags": ["محلی"]},
  {"id": 304, "categoryId": 3, "name": "کروسان کره‌ای", "emoji": "🥐", "unit": "۴ عدد", "price": 120000, "tags": ["تازه"]},
  {"id": 305, "categoryId": 3, "name": "نان تست", "emoji": "🍞", "unit": "۱ بسته", "price": 48000, "tags": []},
  {"id": 306, "categoryId": 3, "name": "کلوچه فومن", "emoji": "🥮", "unit": "۱۰ عدد", "price": 140000, "tags": ["محلی"]},
  {"id": 401, "categoryId": 4, "name": "برنج طارم هاشمی", "emoji": "🍚", "unit": "۵ کیلو", "price": 1250000, "tags": ["محلی"]},
  {"id": 402, "categoryId": 4, "name": "عسل کوهستان", "emoji": "🍯", "unit": "۵۰۰ گرم", "price": 420000, "tags": ["محلی"]},
  {"id": 403, "categoryId": 4, "name": "زعفران قائنات", "emoji": "🌸", "unit": "۱ مثقال", "price": 690000, "tags": ["محلی", "هدیه"]},
  {"id": 404, "categoryId": 4, "name": "روغن آفتابگردان", "emoji": "🌻", "unit": "۱.۵ لیتر", "price": 175000, "tags": []},
  {"id": 405, "categoryId": 4, "name": "ماکارونی", "emoji": "🍝", "unit": "۷۰۰ گرم", "price": 52000, "tags": []},
  {"id": 406, "categoryId": 4, "name": "عدس", "emoji": "🫘", "unit": "۹۰۰ گرم", "price": 98000, "tags": []},
  {"id": 501, "categoryId": 5, "name": "چای لاهیجان", "emoji": "🍵", "unit": "۴۵۰ گرم", "price": 230000, "tags": ["محلی"]},
  {"id": 502, "categoryId": 5, "name": "دوغ محلی", "emoji": "🥤", "unit": "۱.۵ لیتر", "price": 42000, "tags": []},
  {"id": 503, "categoryId": 5, "name": "آب معدنی", "emoji": "💧", "unit": "۱.۵ لیتر", "price": 15000, "tags": []},
  {"id": 504, "categoryId": 5, "name": "آب پرتقال طبیعی", "emoji": "🧃", "unit": "۱ لیتر", "price": 65000, "tags": ["تازه"]},
  {"id": 505, "categoryId": 5, "name": "قهوه اسپرسو", "emoji": "☕", "unit": "۲۵۰ گرم", "price": 380000, "tags": []},
  {"id": 506, "categoryId": 5, "name": "شربت آلبالو", "emoji": "🍒", "unit": "۱ لیتر", "price": 85000, "tags": ["محلی"]},
  {"id": 601, "categoryId": 6, "name": "ران مرغ", "emoji": "🍗", "unit": "۹۰۰ گرم", "price": 210000, "tags": ["تازه"]},
  {"id": 602, "categoryId": 6, "name": "گوشت چرخ‌کرده", "emoji": "🥩", "unit": "۵۰۰ گرم", "price": 450000, "tags": []},
  {"id": 603, "categoryId": 6, "name": "ماهی قزل‌آلا", "emoji": "🐟", "unit": "۱ کیلو", "price": 520000, "tags": ["تازه"]},
  {"id": 604, "categoryId": 6, "name": "میگو", "emoji": "🦐", "unit": "۵۰۰ گرم", "price": 690000, "tags": []},
  {"id": 605, "categoryId": 6, "name": "فیله مرغ", "emoji": "🍗", "unit": "۹۰۰ گرم", "price": 260000, "tags": []},
  {"id": 606, "categoryId": 6, "name": "کنسرو تن ماهی", "emoji": "🥫", "unit": "۱۸۰ گرم", "price": 95000, "tags": []},
  {"id": 701, "categoryId": 7, "name": "پاپ‌کورن", "emoji": "🍿", "unit": "۱ بسته", "price": 35000, "tags": []},
  {"id": 702, "categoryId": 7, "name": "چیپس", "emoji": "🥔", "unit": "۱ بسته", "price": 40000, "tags": []},
  {"id": 703, "categoryId": 7, "name": "شکلات تلخ", "emoji": "🍫", "unit": "۱۰۰ گرم", "price": 75000, "tags": []},
  {"id": 704, "categoryId": 7, "name": "بیسکویت", "emoji": "🍪", "unit": "۱ بسته", "price": 30000, "tags": []},
  {"id": 705, "categoryId": 7, "name": "آجیل مخلوط", "emoji": "🥜", "unit": "۵۰۰ گرم", "price": 620000, "tags": ["هدیه"]},
  {"id": 706, "categoryId": 7, "name": "گز اصفهان", "emoji": "🍬", "unit": "۲۵۰ گرم", "price": 180000, "tags": ["محلی", "هدیه"]}
]

  const offers: Offer[] = [
  {"productId": 102, "percent": 15, "label": "حراج فصل"},
  {"productId": 104, "percent": 25, "label": "تخفیف روز"},
  {"productId": 105, "percent": 30, "label": "تخفیف روز"},
  {"productId": 201, "percent": 15, "label": "پیشنهاد ویژه"},
  {"productId": 202, "percent": 10, "label": "پیشنهاد ویژه"},
  {"productId": 204, "percent": 20, "label": "تخفیف لبنیات"},
  {"productId": 402, "percent": 20, "label": "تخفیف مهر"},
  {"productId": 501, "percent": 12, "label": "پیشنهاد ویژه"},
  {"productId": 601, "percent": 10, "label": "پیشنهاد ویژه"},
  {"productId": 703, "percent": 15, "label": "تخفیف مهر"}

]
  const stock: StockData = {
  "items": {
    "101": 24, "102": 0, "103": 9, "104": 40, "105": 30, "106": 8, "107": 5,
    "201": 15, "202": 3, "203": 0, "204": 20, "205": 6, "206": 14,
    "301": 60, "302": 12, "303": 5, "304": 10, "305": 25, "306": 9,
    "401": 7, "402": 2, "403": 4, "404": 0, "405": 33, "406": 12,
    "501": 11, "502": 18, "503": 80, "504": 7, "505": 4, "506": 9,
    "601": 6, "602": 5, "603": 3, "604": 0, "605": 8, "606": 40,
    "701": 50, "702": 45, "703": 16, "704": 70, "705": 2, "706": 11
  }
}
const categories: Category[] = [
    { id: 1, name: "میوه و سبزی", emoji: "🍎", slug: "fruit", color: "#0F6E56" }, // products 1xx
    { id: 2, name: "لبنیات و بستنی", emoji: "🥛", slug: "dairy", color: "#D4537E" }, // products 2xx
    { id: 3, name: "نان و شیرینی", emoji: "🍞", slug: "bread", color: "#D4537E" }, // products 3xx
    { id: 4, name: "خواربار", emoji: "🍚", slug: "grocery", color: "#0F6E56" }, // products 4xx
    { id: 5, name: "نوشیدنی", emoji: "🥤", slug: "drinks", color: "#D4537E" }, // products 5xx
    { id: 6, name: "پروتئین", emoji: "🍗", slug: "protein", color: "#0F6E56" }, // products 6xx
    { id: 7, name: "تنقلات و آجیل", emoji: "🍿", slug: "snacks", color: "#D4537E" }, // products 7xx
  ];
   const [categoryId, setCategoryId] = useState<number | null>(null); // selected category, null = no filter
  
   const [cart, setCart] = useState<CartLine[]>([]); // cart lines, starts empty
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

