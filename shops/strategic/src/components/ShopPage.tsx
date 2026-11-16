import NotFound from './NotFound';
import { useEffect, type MouseEvent } from 'react';
import { useCatalog } from '../hooks/useCatalog';
import { useShopNavigation } from '../hooks/useShopNavigation';
import { emptyModel } from '../features/products/empty-model';
import { catalogUrl, routeHref } from '../storage/url-state';
import { selectionView } from '../features/products/selection';
import Catalog from './Catalog';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import IconSprite from './IconSprite';
import Layout from './Layout';
import LoadStatus from './LoadStatus';

const EMPTY_CATALOG = emptyModel();

export default function ShopPage() {
  const load = useCatalog();
  const model = load.status === 'success' || load.status === 'empty' ? load.data : EMPTY_CATALOG;
  const { categoryId, query, missing, navigate, search } = useShopNavigation(model);
  function go(href: string) { navigate(href); window.scrollTo({ top: 0, behavior: 'instant' }); }
  function pick(id: number) { go(catalogUrl(model.categoryById.get(id)?.slug ?? '')); }
  function click(event: MouseEvent<HTMLElement>) {
    const href = routeHref(event);
    if (href) { event.preventDefault(); go(href); }
  }
  useEffect(() => {
    if (load.status === 'success' && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [load.status]);
  const categories = [...model.categories].sort((a, b) => a.id - b.id);
  const shown = selectionView(model, categoryId, query);
  return (
    <Layout>
      <IconSprite />
      <Header shop={model.shop} onHome={!missing && categoryId === null && !query} categories={categories} categoryId={categoryId} onPick={pick}
        productCount={model.products.length} query={query} onSearch={search} />
      <main onClick={click} id="main" className="wrap" tabIndex={-1} aria-busy={load.status === 'loading' || undefined}>
        <LoadStatus state={load} onRetry={load.retry}>
          {missing ? <NotFound /> : categoryId !== null || query ? <Catalog title={shown.title} category={shown.category} items={shown.items} /> :
            <Home model={model} categories={categories} categoryId={categoryId} onPick={pick} />}
        </LoadStatus>
      </main>
      <Footer shop={model.shop} categoryId={categoryId} categories={categories} onPick={pick} />
      <div className="sr-only" id="live" role="status" />
    </Layout>
  );
}