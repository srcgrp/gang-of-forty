import { useEffect, useState, type MouseEvent } from 'react';
import type { CartLine, LoadState, ShopModel } from './types';
import { loadApiData } from './api/load';
import { cartCount, changeCart, reconcileCart } from './features/cart/cart';
import { buildModel, emptyModel } from './features/products/products';
import { loadCart, saveCart } from './storage/cart-storage';
import { catalogUrl, goToUrl, readQuery, readSelection, routeHref, watchRoute, writeQuery } from './storage/url-state';
import { errorState } from './components/error-text';
import type { CartMode } from './components/CartMenu';
import ShopPage from './components/ShopPage';
export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [model, setModel] = useState<ShopModel>(emptyModel);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState(readQuery);
  const [missing, setMissing] = useState(false);
  const [cart, setCart] = useState<CartLine[]>(() => loadCart());
  const [open, setOpen] = useState<CartMode>('closed');
  function applyRoute(current: ShopModel) {
    const selection = readSelection(current);
    setCategoryId(selection.categoryId);
    setQuery(selection.query);
    setMissing(selection.missing);
  }
  useEffect(() => {
    let ignore = false;
    loadApiData()
      .then(data => {
        if (ignore) return;
        const next = buildModel(data);
        setModel(next);
        setCart(previous => reconcileCart(previous, next.stockOf));
        applyRoute(next);
        setLoad(data.products.length ? { status: 'success', products: data.products } : { status: 'empty' });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        setLoad(errorState(error));
      });
    return () => { ignore = true; };
  }, []);
  useEffect(() => watchRoute(() => {
    applyRoute(model);
    setOpen('closed');
  }), [model]);
  useEffect(() => { saveCart(cart); }, [cart]);
  useEffect(() => { document.title = `سوپرمارکت آرمین · ${cartCount(cart).toLocaleString('fa-IR')} 🛒`; }, [cart]);
  function navigate(update: () => void) {
    update();
    applyRoute(model);
    setOpen('closed');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const change = (direction: 'add' | 'remove') => (id: number) =>
    setCart(previous => changeCart(previous, model.items, id, direction)?.lines ?? previous);
  function click(event: MouseEvent<HTMLElement>) {
    const href = routeHref(event);
    if (href) { event.preventDefault(); navigate(() => goToUrl(href)); }
  }
  return (
    <ShopPage load={load} model={model} categoryId={categoryId} query={query} missing={missing} open={open}
      controls={{ lines: cart, onAdd: change('add'), onRemove: change('remove') }}
      onPick={id => navigate(() => goToUrl(catalogUrl(model.categoryById.get(id)?.slug ?? '')))}
      onSearch={text => navigate(() => writeQuery(text))} onCartMode={setOpen} onMainClick={click} />
  );
}