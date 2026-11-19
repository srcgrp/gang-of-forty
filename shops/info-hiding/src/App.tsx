import { useEffect, useState } from 'react';
import type { Catalog, LoadState, Sort } from './types';
import { loadCatalog } from './api/catalog';
import { useCartStore } from './hooks/useCartStore';
import Storefront from './components/Storefront';

export default function App() {
    const [categoryId, setCategoryId] = useState<number | null>(null);
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
            useCartStore.getState().sync(data.products, data.stock);
            setState(data.products.length > 0 ? { status: 'success', products: data.products } : { status: 'empty' });
        }).catch(() => {
            if (ignore) return;
            setState({ status: 'error', message: 'دریافت اطلاعات انجام نشد. اتصال را بررسی کنید و صفحه را دوباره باز کنید.' });
        });
        return () => { ignore = true; };
    }, []);
    return <Storefront catalog={catalog} selected={categoryId} state={state}
        sort={sort} onSort={setSort} onPick={setCategoryId} />;
}
