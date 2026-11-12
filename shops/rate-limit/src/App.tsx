import { useEffect, useState } from 'react';
import type { CartLine, Product, Stock } from './types';
import { CATEGORIES } from './data/categories';
import { addToCart, cartCount, cartTotal, removeFromCart } from './cart/cartLines';
import AnnouncementBar from './components/Announcementbar';
import Header from './components/Header';
import CategoryNav from './components/Categorynav';
import Hero from './components/Hero';
import CategoryCards from './components/Categorycards';
import ProductGrid from './components/Productgrid';
import AdBanner from './components/Adbanner';
import LearnSection from './components/Learnsection';
import CartPanel from './components/Cartpanel';
import Footer from './components/Footer';

const SAMPLE: Product[] = [
  { id: 1, name: 'سیب قرمز', price: 85000, oldPrice: 110000, unit: 'هر کیلو', emoji: '🍎', categoryId: 1, tags: [] },
  { id: 2, name: 'شیر کم‌چرب', price: 42000, unit: 'یک لیتر', emoji: '🥛', categoryId: 2, tags: [] },
  { id: 3, name: 'نان بربری', price: 18000, oldPrice: 20000, unit: 'یک عدد', emoji: '🍞', categoryId: 3, tags: [] },
  { id: 4, name: 'آووکادو', price: 160000, unit: 'هر کیلو', emoji: '🥑', categoryId: 1, tags: [] },
];

const SAMPLE_STOCK: Stock['items'] = { 1: 12, 2: 3, 3: 0, 4: 20 };

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const visibleProducts =
    categoryId === null ? SAMPLE : SAMPLE.filter((p) => p.categoryId === categoryId);
  const count = cartCount(cart);
  const total = cartTotal(cart);

  function handleAdd(id: number) {
    const product = SAMPLE.find((p) => p.id === id);
    if (product) setCart(addToCart(cart, product));
  }

  function handleRemove(id: number) {
    setCart(removeFromCart(cart, id));
  }

  function handlePick(id: number | null) {
    setCategoryId(id);
    setMenuOpen(false);
  }

  return (
    <div id="top">
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <AnnouncementBar />

      <div className="sticky-header">
        <Header
          cartCount={count}
          darkMode={darkMode}
          onToggleTheme={setDarkMode}
          onCartClick={() => setCartOpen(true)}
        />
        <CategoryNav
          categories={CATEGORIES}
          activeId={categoryId}
          open={menuOpen}
          onToggle={setMenuOpen}
          onPick={handlePick}
        />
      </div>

      <Hero />

      <main id="main-content">
        <CategoryCards categories={CATEGORIES} activeId={categoryId} onPick={handlePick} />
        <ProductGrid
          id="special-offers"
          title="پیشنهاد ویژه امروز 🔥"
          subtitle="تا پایان موجودی"
          products={visibleProducts}
          stock={SAMPLE_STOCK}
          onAdd={handleAdd}
        />
        <AdBanner />
        <LearnSection />
      </main>

      <Footer categories={CATEGORIES} />

      <CartPanel
        lines={cart}
        total={total}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemove}
      />
    </div>
  );
}