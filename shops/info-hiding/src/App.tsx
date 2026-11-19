import { useState } from 'react';
import type { Sort } from './types';
import { useCatalog } from './hooks/useCatalog';
import Storefront from './components/Storefront';
import Status from './components/Status';

export default function App() {
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [sort, setSort] = useState<Sort>('default');
    const state = useCatalog();
    if (state.status !== 'success') return <Status state={state} />;
    return <Storefront catalog={state.data} selected={categoryId} state={state}
        sort={sort} onSort={setSort} onPick={setCategoryId} />;
}
