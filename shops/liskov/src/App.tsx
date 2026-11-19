import {useEffect, useState} from 'react';

import AppContent from './components/AppContent';
import {useCartStore} from './hooks/useCartStore';
import {useCatalog} from './hooks/useCatalog';

export default function App() {
    const cart = useCartStore((state) => state.lines);
    const {loadState, retry} = useCatalog();

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (loadState.status !== 'success') return;

        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.title = `سوپرمارکت شایان (${itemCount})`;
    }, [cart, loadState]);

    return (
        <AppContent
            loadState={loadState}
            selectedCategoryId={selectedCategoryId}
            onPickCategory={setSelectedCategoryId}
            query={query}
            onQuery={setQuery}
            onRetry={retry}
        />
    );
}
