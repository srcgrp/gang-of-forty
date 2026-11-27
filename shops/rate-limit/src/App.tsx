import { useEffect, useState } from 'react';
import type { CatalogItem, Category, LoadState, Shop } from './types';
import { describeError } from './api/errors';
import { loadCatalog } from './catalog/loadCatalog';
import { addItem, countItems } from './cart/rules';
import { removeLine } from './cart/cartLines';
import { loadCart, saveCart } from './storage/cart';
import { cartTitle } from './format/title';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';

export default function App() {
  const [state, setState] = useState<LoadState<CatalogItem>>({ status: 'loading' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [cart, setCart] = useState(() => loadCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .then((data) => {
        if (ignore) return;
        setCategories(data.categories);
        setShop(data.shop);
        setState(data.state);
      })
      .catch((err: unknown) => {
        if (!ignore) setState({ status: 'error', message: describeError(err) });
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  const count = countItems(cart); 
  useEffect(() => saveCart(cart), [cart]);
  useEffect(() => { document.title = cartTitle(shop?.name, count); }, [shop, count]);
  useEffect(() => { document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'; }, [darkMode]);

  const handleAdd = (item: CatalogItem) => setCart(addItem(cart, item));
  const handleRemove = (id: number) => setCart(removeLine(cart, id));
  const handleRetry = () => {
    setState({ status: 'loading' });
    setAttempt((a) => a + 1);
  };
  const handlePick = (id: number | null) => {
    setCategoryId(id);
    setMenuOpen(false);
  };

  return (
    <div id="top">
      <TopBar count={count} darkMode={darkMode} onToggleTheme={setDarkMode} onCartClick={() => setCartOpen(true)}
        query={query} onQuery={setQuery}
        categories={categories} activeId={categoryId} menuOpen={menuOpen} onToggleMenu={setMenuOpen} onPick={handlePick} />
      <Hero />
      <Catalog state={state} categories={categories} categoryId={categoryId} query={query}
        onPick={handlePick} onAdd={handleAdd} onRetry={handleRetry} />
      <Footer categories={categories} />
      <CartPanel cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={handleRemove} />
    </div>
  );
}