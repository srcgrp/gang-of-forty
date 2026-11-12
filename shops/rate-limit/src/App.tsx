import { useEffect, useState } from 'react';
import type { CartLine, CatalogItem, Category, LoadState } from './types';
import { fetchRawCatalog } from './api/catalog';
import { describeError } from './api/errors';
import { buildCatalog } from './catalog/build';
import { addToCart, cartCount, cartTotal, removeFromCart } from './cart/cartLines';
import AnnouncementBar from './components/Announcementbar';
import Header from './components/Header';
import CategoryNav from './components/Categorynav';
import Hero from './components/Hero';
import CategoryCards from './components/Categorycards';
import Status from './components/Status';
import ProductGrid from './components/Productgrid';
import AdBanner from './components/Adbanner';
import LearnSection from './components/Learnsection';
import CartPanel from './components/Cartpanel';
import Footer from './components/Footer';

export default function App() {
  const [state, setState] = useState<LoadState<CatalogItem>>({ status: 'loading' });
  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let ignore = false;

    fetchRawCatalog()
      .then(({ products, offers, stock, categories }) => {
        if (ignore) return;
        const catalog = buildCatalog(products, offers, stock, categories);
        setCategories(catalog.categories);
        setState(
          catalog.items.length === 0
            ? { status: 'empty' }
            : { status: 'success', products: catalog.items },
        );
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setState({ status: 'error', message: describeError(err) });
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const products = state.status === 'success' ? state.products : [];
  const specials = products.filter((p) => p.percent !== undefined);
  const visibleProducts =
    categoryId === null ? products : products.filter((p) => p.categoryId === categoryId);
  const count = cartCount(cart);
  const total = cartTotal(cart);

  function handleAdd(id: number) {
    const product = products.find((p) => p.id === id);
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
          categories={categories}
          activeId={categoryId}
          open={menuOpen}
          onToggle={setMenuOpen}
          onPick={handlePick}
        />
      </div>

      <Hero />

      <main id="main-content">
        <CategoryCards categories={categories} activeId={categoryId} onPick={handlePick} />
        <Status state={state}>
          <ProductGrid
            id="special-offers"
            title="پیشنهاد ویژه امروز 🔥"
            subtitle="تا پایان موجودی"
            products={specials}
            onAdd={handleAdd}
          />
          <ProductGrid id="products" title="همه محصولات" products={visibleProducts} onAdd={handleAdd} />
        </Status>
        <AdBanner />
        <LearnSection />
      </main>

      <Footer categories={categories} />

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