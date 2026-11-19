import { useEffect, useState } from 'react';
import type { CatalogItem, Category, LoadState, Shop } from './types';
import { describeError } from './api/errors';
import { loadCatalog } from './catalog/loadCatalog';
import { countItems } from './cart/rules';
import { cartTitle } from './format/title';
import { useCartStore } from './hooks/useCartStore';
import { useThemeStore } from './hooks/useThemeStore';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import CartPanel from './components/Cartpanel';

export default function App() {
  const [state, setState] = useState<LoadState<CatalogItem>>({ status: 'loading' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useThemeStore((s) => s.theme);

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

  const count = useCartStore((s) => countItems(s.cart));
  useEffect(() => { document.title = cartTitle(shop?.name, count); }, [shop, count]);

  const handleRetry = () => {
    setState({ status: 'loading' });
    setAttempt((a) => a + 1);
  };
  const handlePick = (id: number | null) => {
    setCategoryId(id);
    setMenuOpen(false);
  };

  return (
    <div id="top" className="app" data-theme={theme}>
      <TopBar onCartClick={() => setCartOpen(true)}
        query={query} onQuery={setQuery}
        categories={categories} activeId={categoryId} menuOpen={menuOpen} onToggleMenu={setMenuOpen} onPick={handlePick} />
      <Hero />
      <Catalog state={state} categories={categories} categoryId={categoryId} query={query}
        onPick={handlePick} onRetry={handleRetry} />
      <Footer categories={categories} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}