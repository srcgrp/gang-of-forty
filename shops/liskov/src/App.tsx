import {useEffect, useState} from 'react';

import {loadData} from '../api';
import {addToCart, removeFromCart} from './cart/cart';
import AppContent from './components/AppContent';
import {loadCart, saveCart} from './storage/cart';

import type {CartLine, LoadState} from './types';

export default function App() {
    const [cart, setCart] = useState<CartLine[]>(() => loadCart());
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
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
    }, []);

    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    useEffect(() => {
        if (loadState.status !== 'success') return;
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.title = `${loadState.data.shop.name} (${itemCount})`;
    }, [cart, loadState]);

    const handleAdd = (id: number): void => {
        setCart((previousCart) => addToCart(previousCart, id));
    };

    const handleRemove = (id: number): void => {
        setCart((previousCart) => removeFromCart(previousCart, id));
    };
    return (
        <AppContent
            cart={cart}
            loadState={loadState}
            selectedCategoryId={selectedCategoryId}
            onPickCategory={setSelectedCategoryId}
            onAdd={handleAdd}
            onRemove={handleRemove}
        />
    );
}
