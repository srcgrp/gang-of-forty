import { useEffect, useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { countItems } from '../cart/rules';
import { cartTitle } from '../format/title';
import { useCartStore } from '../hooks/useCartStore';
import { useCatalog } from '../hooks/useCatalog';
import { useThemeStore } from '../hooks/useThemeStore';
import CartPanel from './Cartpanel';
import Footer from './Footer';
import TopBar from './TopBar';

export default function Layout() {
  const state = useCatalog();
  const theme = useThemeStore((s) => s.theme);
  const count = useCartStore((s) => countItems(s.cart));
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const catalog = state.status === 'success' ? state.data : null;
  const categories = catalog?.categories ?? [];
  const shopName = catalog?.shop?.name;
  useEffect(() => { document.title = cartTitle(shopName, count); }, [shopName, count]);

  return (
    <div className="app" data-theme={theme}>
      <TopBar onCartClick={() => setCartOpen(true)}
        categories={categories} menuOpen={menuOpen} onToggleMenu={setMenuOpen} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer categories={categories} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
