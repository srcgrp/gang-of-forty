import { useState } from "react";
import { addItem, removeItem, cartCount, cartTotal } from "./features/cart/logic/items";
import { toCard, offersById } from "./features/products/catalog/cards";
import type { Product, CartItem } from "./shared/types";
import { buildPage } from "./features/products/catalog/sections";
import { SAMPLE_SHOP, SAMPLE_HOME, SAMPLE_STOCK, SAMPLE_OFFERS, SAMPLE_CATEGORIES } from "./sample-data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryNav from "./components/CategoryNav";
import Promos from "./components/Promos";
import ProductSections from "./components/ProductSections";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";

const SAMPLE_PRODUCTS: Product[] = [
  {"id": 104, "categoryId": 1, "name": "گوجه‌فرنگی", "emoji": "🍅", "unit": "۱ کیلو", "price": 45000, "tags": ["تازه"]},
  {"id": 201, "categoryId": 2, "name": "شیر کم‌چرب", "emoji": "🥛", "unit": "۱ لیتر", "price": 38000, "tags": []},
  {"id": 301, "categoryId": 3, "name": "نان سنگک", "emoji": "🫓", "unit": "۱ عدد", "price": 12000, "tags": ["تازه"]},
  {"id": 406, "categoryId": 4, "name": "عدس", "emoji": "🫘", "unit": "۹۰۰ گرم", "price": 98000, "tags": []}
];


export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const count = cartCount(cart);
  const total = cartTotal(cart);
  const category = SAMPLE_CATEGORIES.find(item => item.id === categoryId);
  function handleAdd(productId: number): void {
    const product = SAMPLE_PRODUCTS.find(item => item.id === productId);
    if (!product) return;
    const card = toCard(product, SAMPLE_STOCK, offersById(SAMPLE_OFFERS));
    if (!card.available) return;
    setCart(previous => addItem(previous, card.item, SAMPLE_STOCK.items[productId] ?? 0));
  }
  function handleRemove(productId: number): void {
    setCart(previous => removeItem(previous, productId));
  }
  const page = buildPage({ products: SAMPLE_PRODUCTS, categories: SAMPLE_CATEGORIES,
    shop: SAMPLE_SHOP, home: SAMPLE_HOME, stock: SAMPLE_STOCK, offers: SAMPLE_OFFERS });
  return (
    <div id="top">
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header shop={SAMPLE_SHOP} categories={SAMPLE_CATEGORIES} count={count} onPick={setCategoryId}
        cartOpen={cartOpen} onCartOpen={setCartOpen}>
        <CartPanel cart={cart} total={total} onRemove={handleRemove}
          open={cartOpen} onClose={() => setCartOpen(false)} />
      </Header>
      <main id="main" className="wrap" tabIndex={-1}>
        <Hero home={SAMPLE_HOME} onNavigate={() => setCategoryId(null)} />
        <CategoryNav categories={SAMPLE_CATEGORIES} categoryId={categoryId} onPick={setCategoryId} />
        <Promos promos={SAMPLE_HOME.promos} onNavigate={() => setCategoryId(null)} />
        <ProductSections page={page} category={category} onAdd={handleAdd} />
      </main>
      <Footer shop={SAMPLE_SHOP} categories={SAMPLE_CATEGORIES} onNavigate={() => setCategoryId(null)} />
    </div>
  );
}
