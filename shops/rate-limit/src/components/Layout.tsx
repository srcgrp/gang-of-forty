import { useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { CatalogContext, useCatalogLoader } from '../hooks/useCatalog';
import { useThemeStore } from '../hooks/useThemeStore';
import CartPanel from './Cartpanel';
import Footer from './Footer';
import TopBar from './TopBar';

export default function Layout() {
  const state = useCatalogLoader();
  const theme = useThemeStore((s) => s.theme);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const catalog = state.status === 'success' ? state.data : null;
  const categories = catalog?.categories ?? [];

  return (
    <div className="app" data-theme={theme}>
      <TopBar onCartClick={() => setCartOpen(true)}
        categories={categories} menuOpen={menuOpen} onToggleMenu={setMenuOpen} />
      <main id="main-content" tabIndex={-1}>
        <CatalogContext value={state}>
          <Outlet />
        </CatalogContext>
      </main>
      <Footer categories={categories} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
