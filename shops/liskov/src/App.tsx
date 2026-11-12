import {useState} from 'react';

import {addToCart, cartTotal, removeFromCart} from './cart/cart';
import CartPanel from './components/CartPanel';
import CategoryNav from './components/CategoryNav';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';

import type {Product, Category, CartLine} from './types';

const SAMPLE: Product[] = [
    {
        id: 1,
        categoryId: 1,
        name: 'شیر کم‌چرب',
        emoji: '🥛',
        unit: '۱ لیتر',
        price: 35000,
        tags: [],
    },
    {
        id: 2,
        categoryId: 1,
        name: 'پنیر سفید',
        emoji: '🧀',
        unit: '۴۰۰ گرم',
        price: 65000,
        tags: [],
    },
    {
        id: 3,
        categoryId: 2,
        name: 'سیب قرمز',
        emoji: '🍎',
        unit: '۱ کیلوگرم',
        price: 80000,
        tags: [],
    },
];

const SAMPLE_CATEGORIES: Category[] = [
    {
        id: 1,
        slug: 'dairy',
        name: 'لبنیات',
        emoji: '🥛',
        color: '#e8f3ff',
    },
    {
        id: 2,
        slug: 'fruits',
        name: 'میوه',
        emoji: '🍎',
        color: '#fce8e8',
    },
];

export default function App() {
    const [cart, setCart] = useState<CartLine[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );

    const handleAdd = (id: number): void => {
        setCart((previousCart) => addToCart(previousCart, id));
    };

    const handleRemove = (id: number): void => {
        setCart((previousCart) => removeFromCart(previousCart, id));
    };

    const visibleProducts =
        selectedCategoryId === null
            ? SAMPLE
            : SAMPLE.filter(
                  (product) => product.categoryId === selectedCategoryId,
              );

    const total = cartTotal(cart, SAMPLE);

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <a className='skip-link' href='#main'>
                پرش به محتوای اصلی
            </a>

            <Header itemCount={itemCount} />

            <main id='main' tabIndex={-1}>
                <CategoryNav
                    categories={SAMPLE_CATEGORIES}
                    selectedCategoryId={selectedCategoryId}
                    onPick={setSelectedCategoryId}
                />

                <section className='page-section'>
                    <h2 className='titles'>محصولات</h2>
                    <ProductGrid products={visibleProducts} onAdd={handleAdd} />
                </section>

                <CartPanel
                    cart={cart}
                    products={SAMPLE}
                    total={total}
                    onRemove={handleRemove}
                />
            </main>
        </>
    );
}
