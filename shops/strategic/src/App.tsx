import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import type { LoadState, ShopModel } from './types';
import { loadApiData } from './api/load';
import { buildModel, emptyModel } from './features/products/products';
import { useCartStore } from './hooks/useCartStore';
import { catalogUrl, goToUrl, readQuery, readSelection, routeHref, watchRoute, writeQuery } from './storage/url-state';
import { errorState } from './components/error-text';
import ShopPage from './components/ShopPage';
export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [model, setModel] = useState<ShopModel>(emptyModel);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState(readQuery);
  const [missing, setMissing] = useState(false);
  const applyRoute = useCallback((current: ShopModel) => {
    const selection = readSelection(current);
    setCategoryId(selection.categoryId);
    setQuery(selection.query);
    setMissing(selection.missing);
  }, []);
  useEffect(() => {
    let ignore = false;
    useCartStore.getState().startCatalogLoad();
    loadApiData()
      .then(data => {
        if (ignore) return;
        const next = buildModel(data);
        setModel(next);
        useCartStore.getState().setCatalog(next.items);
        applyRoute(next);
        setLoad(data.products.length ? { status: 'success', products: data.products } : { status: 'empty' });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        useCartStore.getState().failCatalogLoad();
        setLoad(errorState(error));
      });
    return () => { ignore = true; };
  }, [attempt, applyRoute]);
  useEffect(() => watchRoute(() => {
    applyRoute(model);
  }), [model, applyRoute]);
  function navigate(update: () => void) { update(); applyRoute(model); window.scrollTo({ top: 0, behavior: 'instant' }); }
  function retry() { setLoad({ status: 'loading' }); setAttempt(previous => previous + 1); }
  function search(text: string) { const value = text.trim() ? text : ''; setQuery(value); writeQuery(value); }
  function click(event: MouseEvent<HTMLElement>) { const href = routeHref(event); if (href) { event.preventDefault(); navigate(() => goToUrl(href)); } }
  return (
    <ShopPage load={load} model={model} categoryId={categoryId} query={query} missing={missing}
      onPick={id => navigate(() => goToUrl(catalogUrl(model.categoryById.get(id)?.slug ?? '')))}
      onSearch={search} onRetry={retry} onMainClick={click} />
  );
}