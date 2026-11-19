import {useEffect, useState} from 'react';

import {loadData} from '../api';
import AppContent from './components/AppContent';
import {useCartStore} from './hooks/useCartStore';

import type {LoadState} from './types';

export default function App() {
    const cart = useCartStore((state) => state.lines);

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
    const [query, setQuery] = useState('');
    const [attempt, setAttempt] = useState(0);
    const [loadState, setLoadState] = useState<LoadState>({status: 'loading'});

    useEffect(() => {
        let ignore = false;

        loadData()
            .then((data) => {
                if (ignore) return;

                setLoadState(
                    data.products.length === 0
                        ? {status: 'empty'}
                        : {status: 'success', data},
                );
            })
            .catch((error: unknown) => {
                if (ignore) return;

                setLoadState({
                    status: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'دریافت اطلاعات با خطا مواجه شد.',
                });
            });

        return () => {
            ignore = true;
        };
    }, [attempt]);

    useEffect(() => {
        if (loadState.status !== 'success') return;

        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.title = `سوپرمارکت شایان (${itemCount})`;
    }, [cart, loadState]);

    const handleRetry = (): void => {
        setLoadState({status: 'loading'});
        setAttempt((previous) => previous + 1);
    };

    return (
        <AppContent
            loadState={loadState}
            selectedCategoryId={selectedCategoryId}
            onPickCategory={setSelectedCategoryId}
            query={query}
            onQuery={setQuery}
            onRetry={handleRetry}
        />
    );
}
