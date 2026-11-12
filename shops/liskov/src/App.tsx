import {useEffect, useState} from 'react';

import {loadData} from '../api';
import {addToCart, cartTotal, removeFromCart} from './cart/cart';
import CartPanel from './components/CartPanel';
import CategoryNav from './components/CategoryNav';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';

import type {CartLine, LoadState} from './types';

export default function App() {
    const [cart, setCart] = useState<CartLine[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
    const [loadState, setLoadState] = useState<LoadState>({
        status: 'loading',
    });

    useEffect(() => {
        let ignore = false;

        loadData()
            .then((data) => {
                if (ignore) return;

                if (data.products.length === 0) {
                    setLoadState({status: 'empty'});
                    return;
                }

                setLoadState({status: 'success', data});
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

    const handleAdd = (id: number): void => {
        setCart((previousCart) => addToCart(previousCart, id));
    };

    const handleRemove = (id: number): void => {
        setCart((previousCart) => removeFromCart(previousCart, id));
    };

    switch (loadState.status) {
        case 'loading':
            return <p role='status'>در حال دریافت اطلاعات فروشگاه...</p>;

        case 'empty':
            return <p>در حال حاضر محصولی برای نمایش وجود ندارد.</p>;

        case 'error':
            return <p role='alert'>{loadState.message}</p>;

        case 'success': {
            const {products, categories} = loadState.data;

            const visibleProducts =
                selectedCategoryId === null
                    ? products
                    : products.filter(
                          (product) =>
                              product.categoryId === selectedCategoryId,
                      );

            const total = cartTotal(cart, products);

            const itemCount = cart.reduce(
                (sum, item) => sum + item.quantity,
                0,
            );

            return (
                <>
                    <a className='skip-link' href='#main'>
                        پرش به محتوای اصلی
                    </a>

                    <Header itemCount={itemCount} />

                    <main id='main' tabIndex={-1}>
                        <CategoryNav
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            onPick={setSelectedCategoryId}
                        />

                        <section className='page-section'>
                            <h2 className='titles'>محصولات</h2>
                            <ProductGrid
                                products={visibleProducts}
                                onAdd={handleAdd}
                            />
                        </section>

                        <CartPanel
                            cart={cart}
                            products={products}
                            total={total}
                            onRemove={handleRemove}
                        />
                    </main>
                </>
            );
        }
    }
}
