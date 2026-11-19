import { useEffect } from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import { useThemeStore } from '../hooks/useThemeStore';
import { CatalogContext, useCatalog } from '../hooks/useCatalog';
import { useShopNavigation } from '../hooks/useShopNavigation';
import { shelfElementId } from '../catalog/home-shelves';
import { emptyModel } from '../features/products/empty-model';
import Header from './Header';
import Footer from './Footer';
import IconSprite from './IconSprite';

const EMPTY_CATALOG = emptyModel();

export default function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const load = useCatalog();
  const model = load.status === 'success' || load.status === 'empty' ? load.data : EMPTY_CATALOG;
  const { categoryId, query, search, onHome } = useShopNavigation(model);
  const hash = useLocation({ select: (location) => location.hash });
  const categories = [...model.categories].sort((a, b) => a.id - b.id);
  useEffect(() => {
    if (hash && (load.status === 'success' || load.status === 'empty')) {
      const target = document.getElementById(hash) ?? document.getElementById(shelfElementId(hash));
      target?.scrollIntoView();
    }
  }, [hash, load.status]);
  return (
    <CatalogContext.Provider value={load}>
      <div className="app" data-theme={theme}>
        <IconSprite />
        <Header shop={model.shop} onHome={onHome} categories={categories} categoryId={categoryId}
          productCount={model.products.length} query={query} onSearch={search} />
        <main id="main" className="wrap" tabIndex={-1} aria-busy={load.status === 'loading' || undefined}>
          <Outlet />
        </main>
        <Footer shop={model.shop} categoryId={categoryId} categories={categories} />
        <div className="sr-only" id="live" role="status" />
      </div>
    </CatalogContext.Provider>
  );
}
