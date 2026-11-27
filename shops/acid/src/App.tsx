import { useState, useEffect } from 'react';
import type { LoadState, CartLine } from './types';
import { fetchShopData } from './api';
import { addToCart, getCartCount, getCartTotal } from './cart';
import { getCart, saveCart } from './storage';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { CartPanel } from './components/CartPanel';

export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [cart, setCart] = useState<CartLine[]>(() => getCart());
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // گام ۴: دریافت داده‌ها با useEffect
  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const data = await fetchShopData();
        if (!ignore) {
          setState({ status: 'success', data: data.products.map(p => ({
            ...p,
            stock: data.stock.items[p.id] ?? 1,
            offer: data.offers.find(o => o.productId === p.id) || null
          })) });
        }
      } catch (error: unknown) {
        if (!ignore) {
          const msg = error instanceof Error ? error.message : 'خطای ناشناخته';
          setState({ status: 'error', message: msg });
        }
      }
    }

    loadData();
    return () => { ignore = true; };
  }, []);

  // گام ۵: ذخیره سبد خرید در localStorage
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // گام ۵: تغییر عنوان صفحه
  useEffect(() => {
    document.title = `سوپرمارکت اسید (${getCartCount(cart)})`;
  }, [cart]);

  const handleAddToCart = (id: number) => {
    if (state.status !== 'success') return;
    const product = state.data.find(p => p.id === id);
    if (product) {
      setCart(prev => addToCart(prev, product));
    }
  };

  // محاسبه فیلترها
  const filteredProducts = state.status === 'success'
    ? state.data.filter(p => categoryId ? p.categoryId === categoryId : true)
    : [];

  return (
    <>
      <Header cartCount={getCartCount(cart)} />
      <main id="main" style={{ paddingBottom: '60px' }}>
        <CategoryNav 
          categories={[{ id: 1, name: 'میوه', emoji: '🍎' }, { id: 2, name: 'لبنیات', emoji: '🥛' }, { id: 3, name: 'نان', emoji: '🥖' }, { id: 4, name: 'خواربار', emoji: '🍚' }, { id: 5, name: 'نوشیدنی', emoji: '🧃' }]} 
          selectedId={categoryId} 
          onSelect={setCategoryId} 
        />

        {state.status === 'loading' && (
          <div className="carousel-state" style={{ margin: '20px' }}>
            <span className="spinner"></span> در حال بارگذاری...
          </div>
        )}

        {state.status === 'error' && (
          <div className="carousel-state carousel-error" style={{ margin: '20px' }}>
            ⚠️ {state.message}
          </div>
        )}

        {state.status === 'success' && (
          <ProductGrid products={filteredProducts} onAdd={handleAddToCart} />
        )}
      </main>
      
      <CartPanel cart={cart} total={getCartTotal(cart)} />
    </>
  );
}