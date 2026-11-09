import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import type { CartLine, Category, Offer, Product } from './types';
import { OFFERS_ID, OFFERS_VIEW } from './types';
import { addToCart, removeFromCart } from './features/cart/cart-rules';
import { cartCount, cartRows, cartTotal } from './features/cart/cart-totals';
import { toCard } from './features/products/to-card';
import { catalogUrl, goToUrl, isRouteLink, readRoute, writeQuery } from './storage/url-state';
import CartPanel from './components/CartPanel';
import Catalog from './components/Catalog';
import Header from './components/Header';
import IconSprite from './components/IconSprite';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import OffersShelf from './components/OffersShelf';
import Promos from './components/Promos';
import CategoryShelf from './components/CategoryShelf';
import Footer from './components/Footer';

const SAMPLE: Product[] = [
  { id: 102, categoryId: 1, name: 'پرتقال تامسون شمال', emoji: '🍊', unit: '۱ کیلو', price: 72000, tags: ['تازه', 'فصل'] },
  { id: 201, categoryId: 2, name: 'شیر کم‌چرب', emoji: '🥛', unit: '۱ لیتر', price: 38000, tags: [] },
  { id: 402, categoryId: 4, name: 'عسل کوهستان', emoji: '🍯', unit: '۵۰۰ گرم', price: 420000, tags: ['محلی'] },
  { id: 501, categoryId: 5, name: 'چای لاهیجان', emoji: '🍵', unit: '۴۵۰ گرم', price: 230000, tags: ['محلی'] },
];
const OFFERS: Offer[] = [
  { productId: 102, percent: 15, label: 'حراج فصل' },
  { productId: 201, percent: 15, label: 'پیشنهاد ویژه' },
  { productId: 402, percent: 20, label: 'تخفیف مهر' },
  { productId: 501, percent: 12, label: 'پیشنهاد ویژه' },
];
const STOCK: Record<number, number> = { 102: 0, 201: 15, 402: 2, 501: 11 };
const categories: Category[] = [
  { id: 2, slug: 'dairy', name: 'لبنیات', emoji: '🥛', color: '#e2eefc' },
  { id: 1, slug: 'fruits', name: 'میوه و سبزی', emoji: '🍎', color: '#fde3dc' },
  { id: 3, slug: 'bakery', name: 'نان و شیرینی', emoji: '🥖', color: '#fff0cc' },
  { id: 4, slug: 'pantry', name: 'خواربار', emoji: '🍚', color: '#e3f1e7' },
  { id: 5, slug: 'drinks', name: 'نوشیدنی', emoji: '🧃', color: '#e0f5ef' },
  { id: 6, slug: 'protein', name: 'پروتئین', emoji: '🍗', color: '#fbe0e6' },
  { id: 7, slug: 'snacks', name: 'تنقلات', emoji: '🍪', color: '#f1e6fb' },
];
// ثابت‌هایی که از همین داده‌ی موقت ساخته می‌شوند؛ State نیستند.
const items = SAMPLE.map(product => toCard(product, OFFERS.find(offer => offer.productId === product.id), STOCK[product.id] ?? 0));
const itemById = new Map(items.map(item => [item.product.id, item]));
const stockOf = (id: number): number => itemById.get(id)?.stock ?? 0;
const navigationCategories = [...categories].sort((a, b) => a.id - b.id);

function readSelection(): { categoryId: number | null; query: string } {
  const route = readRoute();
  const slug = route.type === 'catalog' ? route.slug : null;
  const categoryId = slug === OFFERS_VIEW ? OFFERS_ID : categories.find(entry => entry.slug === slug)?.id ?? null;
  return { categoryId, query: route.type === 'home' ? '' : route.query };
}

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(() => readSelection().categoryId);
  const [query, setQuery] = useState(() => readSelection().query);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const offers = categoryId === OFFERS_ID;
  const category = categories.find(entry => entry.id === categoryId);
  const matches = items.filter(item =>
    (categoryId === null || (offers ? item.percent > 0 : item.product.categoryId === categoryId)) &&
    item.product.name.includes(query));
  const rows = cartRows(cart, itemById);
  const view = { rows, ...cartTotal(rows), count: cartCount(cart), ready: true };
  const title = query ? `نتایج جستجوی «${query}»` : category?.name ?? 'پیشنهاد ویژه امروز';
  const controls = {
    lines: cart,
    onAdd: (id: number) => setCart(previous => addToCart(previous, id, stockOf(id))),
    onRemove: (id: number) => setCart(previous => removeFromCart(previous, id, stockOf(id))),
  };

  useEffect(() => {
    function restore() {
      const selection = readSelection();
      setCategoryId(selection.categoryId);
      setQuery(selection.query);
      setOpen(false);
    }
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  function show() {
    const selection = readSelection();
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
    const picked = categories.find(entry => entry.id === id);
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
        productCount={items.length} query={query} onSearch={handleSearch}
        cartCount={view.count} cartOpen={open} onCartToggle={() => setOpen(previous => !previous)}
        cartPanel={<CartPanel view={view} controls={controls} />} />
      <main onClick={handleMainClick} id="main" className="wrap" tabIndex={-1}>
        {categoryId !== null || query ? <Catalog controls={controls} title={title} category={category} items={matches} /> : <>
          <Hero />
          <CategoryNav categoryId={categoryId} categories={navigationCategories} onPick={handlePick} />
          <OffersShelf controls={controls} items={items.filter(item => item.percent > 0)} />
          <Promos />
          {categories.map(entry => (
            <CategoryShelf controls={controls} key={entry.id} category={entry}
              items={items.filter(item => item.product.categoryId === entry.id)} />
          ))}
        </>}
      </main>
      <Footer categoryId={categoryId} categories={navigationCategories} onPick={handlePick} />
      <div className="sr-only" id="live" role="status" />
    </>
  );
}