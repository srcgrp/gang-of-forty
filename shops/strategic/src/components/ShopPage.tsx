import NotFound from './NotFound';
import { useEffect, type MouseEvent } from 'react';
import type { LoadState, ShopModel } from '../types';
import { selectionView } from '../features/products/selection';
import Catalog from './Catalog';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import IconSprite from './IconSprite';
import Layout from './Layout';
import LoadStatus from './LoadStatus';

type ShopPageProps = {
  load: LoadState; model: ShopModel; categoryId: number | null; query: string; missing: boolean;
  onPick: (id: number) => void; onSearch: (text: string) => void; onRetry: () => void;
  onMainClick: (event: MouseEvent<HTMLElement>) => void;
};

export default function ShopPage({ load, model, categoryId, query, missing, onPick, onSearch, onRetry, onMainClick }: ShopPageProps) {
  useEffect(() => {
    if (load.status === 'success' && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [load.status]);
  const categories = [...model.categories].sort((a, b) => a.id - b.id);
  const shown = selectionView(model, categoryId, query);
  return (
    <Layout>
      <IconSprite />
      <Header shop={model.shop} onHome={!missing && categoryId === null && !query} categories={categories} categoryId={categoryId} onPick={onPick}
        productCount={model.products.length} query={query} onSearch={onSearch} />
      <main onClick={onMainClick} id="main" className="wrap" tabIndex={-1} aria-busy={load.status === 'loading' || undefined}>
        <LoadStatus state={load} onRetry={onRetry}>
          {missing ? <NotFound /> : categoryId !== null || query ? <Catalog title={shown.title} category={shown.category} items={shown.items} /> :
            <Home model={model} categories={categories} categoryId={categoryId} onPick={onPick} />}
        </LoadStatus>
      </main>
      <Footer shop={model.shop} categoryId={categoryId} categories={categories} onPick={onPick} />
      <div className="sr-only" id="live" role="status" />
    </Layout>
  );
}