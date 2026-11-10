import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import type { CartLine, LoadState, Route, ShopModel } from './types';
import { OFFERS_ID, OFFERS_VIEW } from './types';
import { asApiFailure } from './api/http';
import { loadApiData } from './api/load';
import { addToCart, removeFromCart } from './features/cart/cart-rules';
import { cartCount, cartRows, cartTotal } from './features/cart/cart-totals';
import { buildModel, emptyModel, productView } from './features/products/products';
import { catalogUrl, goToUrl, isRouteLink, readRoute, writeQuery } from './storage/url-state';
import { ERROR_TEXT } from './components/error-text';
import CartPanel from './components/CartPanel';
import Catalog from './components/Catalog';
import Header from './components/Header';
import IconSprite from './components/IconSprite';
import LoadStatus from './components/LoadStatus';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import OffersShelf from './components/OffersShelf';
import Promos from './components/Promos';
import CategoryShelf from './components/CategoryShelf';
import Footer from './components/Footer';

const queryOf = (route: Route): string => (route.type === 'home' ? '' : route.query);

function readSelection(model: ShopModel): { categoryId: number | null; query: string } {
  const route = readRoute();
  const slug = route.type === 'catalog' ? route.slug : null;
  const category = slug === null ? undefined : model.categoryBySlug.get(slug);
  return { categoryId: slug === OFFERS_VIEW ? OFFERS_ID : category?.id ?? null, query: queryOf(route) };
}

export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [model, setModel] = useState<ShopModel>(emptyModel);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState(() => queryOf(readRoute()));
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const navigationCategories = [...model.categories].sort((a, b) => a.id - b.id);
  const offers = categoryId === OFFERS_ID;
  const category = categoryId === null ? undefined : model.categoryById.get(categoryId);
  const slug = offers ? OFFERS_VIEW : category?.slug;
  const route: Route = slug ? { type: 'catalog', slug, query } : query ? { type: 'search', query } : { type: 'home' };
  const found = productView(model, route);
  const matches = slug ? found.catalog.items : found.matches;
  const rows = cartRows(cart, model.items);
  const view = { rows, ...cartTotal(rows), count: cartCount(cart), ready: load.status === 'success' };
  const title = query ? `نتایج جستجوی «${query}»` : category?.name ?? 'پیشنهاد ویژه امروز';
  const controls = {
    lines: cart,
    onAdd: (id: number) => setCart(previous => addToCart(previous, id, model.stockOf(id))),
    onRemove: (id: number) => setCart(previous => removeFromCart(previous, id, model.stockOf(id))),
  };

  useEffect(() => {
    let ignore = false;
    loadApiData()
      .then(data => {
        if (ignore) return;
        const next = buildModel(data);
        const selection = readSelection(next);
        setModel(next);
        setCategoryId(selection.categoryId);
        setQuery(selection.query);
        setLoad(data.products.length ? { status: 'success', products: data.products } : { status: 'empty' });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const failure = asApiFailure(error);
        setLoad({ status: 'error', message: ERROR_TEXT[failure.kind], failure });
      });
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    function restore() {
      const selection = readSelection(model);
      setCategoryId(selection.categoryId);
      setQuery(selection.query);
      setOpen(false);
    }
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [model]);

  function show() {
    const selection = readSelection(model);
    setCategoryId(selection.categoryId);
    setQuery(selection.query);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function go(url: string) {
    goToUrl(url);
    show();
  }
  function handlePick(id: number) {
    const picked = model.categoryById.get(id);
    if (picked) go(catalogUrl(picked.slug));
  }
  function handleSearch(text: string) {
    writeQuery(text);
    show();
  }
  function handleMainClick(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (link && isRouteLink(link)) {
      event.preventDefault();
      go(link.href);
    }
  }

  return (
    <>
      <IconSprite />
      <Header categories={navigationCategories} categoryId={categoryId} onPick={handlePick}
        productCount={model.products.length} query={query} onSearch={handleSearch}
        cartCount={view.count} cartOpen={open} onCartToggle={() => setOpen(previous => !previous)}
        cartPanel={<CartPanel view={view} controls={controls} />} />
      <main onClick={handleMainClick} id="main" className="wrap" tabIndex={-1} aria-busy={load.status === 'loading' || undefined}>
        <LoadStatus state={load}>
          {categoryId !== null || query ? <Catalog controls={controls} title={title} category={category} items={matches} /> : <>
            <Hero />
            <CategoryNav categoryId={categoryId} categories={navigationCategories} onPick={handlePick} />
            <OffersShelf controls={controls} items={model.offerItems} />
            <Promos />
            {model.categories.map(entry => (
              <CategoryShelf controls={controls} key={entry.id} category={entry}
                items={model.itemsByCategory.get(entry.id) ?? []} />
            ))}
          </>}
        </LoadStatus>
      </main>
      <Footer categoryId={categoryId} categories={navigationCategories} onPick={handlePick} />
      <div className="sr-only" id="live" role="status" />
    </>
  );
}