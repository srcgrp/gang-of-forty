import { useState } from 'react';
import { useCatalog } from './hooks/useCatalog';
import { useThemeStore } from './hooks/useThemeStore';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import CartPanel from './components/Cartpanel';

export default function App() {
  const state = useCatalog();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useThemeStore((s) => s.theme);

  const categories = state.status === 'success' ? state.data.categories : [];

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
      <Catalog state={state} categoryId={categoryId} query={query} onPick={handlePick} />
      <Footer categories={categories} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
