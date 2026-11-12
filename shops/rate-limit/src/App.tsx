import { useEffect, useState } from 'react';
import type { CartItem, Product, Stock } from './types';
import { CATEGORIES } from './data/categories';
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
  { id: 1, name: 'سیب قرمز', price: 85000, oldPrice: 110000, unit: 'هر کیلو', emoji: '🍎', categoryId: 'fruits', tags: [] },
  { id: 2, name: 'شیر کم‌چرب', price: 42000, unit: 'یک لیتر', emoji: '🥛', categoryId: 'dairy', tags: [] },
  { id: 3, name: 'نان بربری', price: 18000, oldPrice: 20000, unit: 'یک عدد', emoji: '🍞', categoryId: 'bakery', tags: [] },
  { id: 4, name: 'آووکادو', price: 160000, unit: 'هر کیلو', emoji: '🥑', categoryId: 'fruits', tags: [] },
];

const SAMPLE_STOCK: Stock['items'] = { 1: 12, 2: 3, 3: 0, 4: 20 };

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  function addToCart(id: number) {
    const product = SAMPLE.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === id);
      if (existing) {
        return prev.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  function selectCategory(categoryId: string) {
    setActiveCategory(categoryId);
    setMenuOpen(false);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const visibleProducts = activeCategory ? SAMPLE.filter((p) => p.categoryId === activeCategory) : SAMPLE;

  return (
    <div id="top">
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <AnnouncementBar />

      <div className="sticky-header">
        <Header
          cartCount={cartCount}
          darkMode={darkMode}
          onToggleTheme={setDarkMode}
          onCartClick={() => setCartOpen(true)}
        />
        <CategoryNav
          categories={CATEGORIES}
          open={menuOpen}
          onToggle={setMenuOpen}
          onSelect={selectCategory}
        />
      </div>

      <Hero />

      <main id="main-content">
        <CategoryCards categories={CATEGORIES} onSelect={selectCategory} />
        <ProductGrid
          id="special-offers"
          title="پیشنهاد ویژه امروز 🔥"
          subtitle="تا پایان موجودی"
          products={visibleProducts}
          stock={SAMPLE_STOCK}
          onAdd={addToCart}
        />
        <AdBanner />
        <LearnSection />
      </main>

      <Footer categories={CATEGORIES} />

      <CartPanel
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onChangeQuantity={changeQuantity}
      />
    </div>
  );
}