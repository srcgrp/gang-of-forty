import { useEffect, useState } from 'react';
import type { CartLine, Catalog, LoadState, Sort } from './types';
import { loadCatalog } from './api/catalog';
import { addToCart, removeFromCart, reconcileCart } from './cart/rules';
import { loadCart, saveCart } from './storage/cart';
import { cartCount } from './cart/rules';
import { formatNumber } from './catalog/pricing';
import Storefront from './components/Storefront';

export default function App() {
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [cart, setCart] = useState<CartLine[]>(() => loadCart());
    const [sort, setSort] = useState<Sort>('default');
    const [state, setState] = useState<LoadState>({ status: 'loading' });
    const [catalog, setCatalog] = useState<Catalog>({
        products: [], categories: [], offers: [], stock: { updatedAt: '', items: {} }
    });
    useEffect(() => {
        let ignore = false;
        loadCatalog().then(data => {
            if (ignore) return;
            setCatalog(data);
            setCart(previous => reconcileCart(previous, data.products, data.stock));
            setState(data.products.length > 0 ? { status: 'success', products: data.products } : { status: 'empty' });
        }).catch(() => {
            if (ignore) return;
            setState({ status: 'error', message: 'دریافت اطلاعات انجام نشد. اتصال را بررسی کنید و صفحه را دوباره باز کنید.' });
        });
        return () => { ignore = true; };
    }, []);
    useEffect(() => { saveCart(cart); }, [cart]);
    useEffect(() => {
        document.title = '🛒 ' + formatNumber(cartCount(cart)) + ' · سوپرمارکت یاسمن';
    }, [cart]);
    return <Storefront catalog={catalog} cart={cart} selected={categoryId} state={state}
        sort={sort} onSort={setSort} onPick={setCategoryId}
        onAdd={id => setCart(previous => addToCart(previous, id, catalog.stock))}
        onRemove={id => setCart(previous => removeFromCart(previous, id))} />;
}
