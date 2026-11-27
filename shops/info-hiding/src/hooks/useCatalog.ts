import { useEffect, useState } from 'react';
import type { Catalog, LoadState } from '../types';
import { loadCatalog } from '../api/catalog';
import { useCartStore } from './useCartStore';
export const useCatalog = (): LoadState<Catalog> => {
    const [state, setState] = useState<LoadState<Catalog>>({ status: 'loading' });
    useEffect(() => {
        let ignore = false;
        loadCatalog().then(data => {
            if (ignore) return;
            useCartStore.getState().sync(data.products, data.stock);
            setState(data.products.length > 0 ? { status: 'success', data } : { status: 'empty' });
        }).catch(() => {
            if (ignore) return;
            setState({ status: 'error', message: 'دریافت اطلاعات انجام نشد. اتصال را بررسی کنید و صفحه را دوباره باز کنید.' });
        });
        return () => { ignore = true; };
    }, []);
    return state;
};