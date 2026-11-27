
import { useEffect, useState } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductGrid from './components/ProductGrid';
import { CartPanel } from './components/CartPanel';
import Footer from './components/Footer';
import SearchBox from './components/SearchBox';
import SaleCountdown from './components/SaleCountdown';
import type { CartItem, LoadState } from './types';
import { loadShopData } from './api/products';
import { filterProducts } from './catalog/filterProducts';
import { addToCart, removeFromCart, calculateTotalCount, calculateTotalPrice } from './cart/cart';
import { loadCart, saveCart } from './storage/cartStorage';

export default function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());
  const [attempt, setAttempt] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);
  const totalCount = calculateTotalCount(cart);
  const totalPrice = calculateTotalPrice(cart);

  useEffect(() => { saveCart(cart); }, [cart]);
  useEffect(() => {
    document.title = totalCount > 0
      ? `سوپرمارکت کمترین شگفتی (${totalCount} کالا)`
      : 'سوپرمارکت کمترین شگفتی';
  }, [totalCount]);

  useEffect(() => {
    let ignore = false;
    setLoadState({ status: 'loading' });
    loadShopData().then((products) => {
      if (ignore) return;
      setLoadState(products.length
        ? { status: 'success', products }
        : { status: 'empty' });
    }).catch((error: unknown) => {
      if (ignore) return;
      setLoadState({
        status: 'error',
        message: error instanceof Error ? error.message : 'خطای بارگذاری داده‌ها'
      });
    });
    return () => { ignore = true; };
  }, [attempt]);

  const products = loadState.status === 'success' ? loadState.products : [];
  const filteredProducts = filterProducts(products, selectedCategory, query);

  const handleAdd = (id: string) => {
    const product = products.find((item) => item.id === id);
    if (product) setCart((previous) => addToCart(previous, product, product.stock));
  };
  const handleRemove = (id: string) => {
    setCart((previous) => removeFromCart(previous, id));
  };
  const retry = () => {
    setLoadState({ status: 'loading' });
    setAttempt((current) => current + 1);
  };

  return (
    <div className="app-container">
      <Header totalCount={totalCount} />
      <main id="main-content" className="container">
        <SearchBox query={query} onQuery={setQuery} />
        <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <button type="button" onClick={() => setShowCountdown((value) => !value)}>
          {showCountdown ? 'بستن تایمر حراج' : 'نمایش تایمر حراج'}
        </button>
        {showCountdown && <SaleCountdown initialSeconds={120} />}
        {loadState.status === 'loading' && <p>در حال بارگذاری محصولات...</p>}
        {loadState.status === 'error' && (
          <div className="error-state text-danger">
            <p>خطا: {loadState.message}</p>
            <button type="button" onClick={retry}>تلاش دوباره</button>
          </div>
        )}
        {loadState.status === 'empty' && <p>محصولی برای نمایش وجود ندارد.</p>}
        {loadState.status === 'success' && filteredProducts.length === 0 && (
          <p className="empty-state">محصولی با این مشخصات یافت نشد.</p>
        )}
        {loadState.status === 'success' && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} onAdd={handleAdd} />
        )}
        <CartPanel cart={cart} totalPrice={totalPrice} onRemove={handleRemove} />
      </main>
      <Footer />
    </div>
  );
}
