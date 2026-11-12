import {useState} from 'react';

import CategoryNav from './components/CategoryNav';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';

import type {Product, Category} from './types';

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
    const [cart, setCart] = useState<Record<number, number>>({});
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );

    const handleAdd = (id: number): void => {
        setCart((previousCart) => ({
            ...previousCart,
            [id]: (previousCart[id] ?? 0) + 1,
        }));
    };

    const handleCategorySelect = (id: number): void => {
        setSelectedCategory(id);
    };

    const itemCount = Object.values(cart).reduce(
        (total, quantity) => total + quantity,
        0,
    );

    const visibleProducts =
        selectedCategory === null
            ? SAMPLE
            : SAMPLE.filter(
                  (product) => product.categoryId === selectedCategory,
              );

    return (
        <>
            <a className='skip-link' href='#main'>
                پرش به محتوای اصلی
            </a>

            <Header itemCount={itemCount} />

            <main id='main' tabIndex={-1}>
                <CategoryNav
                    categories={SAMPLE_CATEGORIES}
                    onSelect={handleCategorySelect}
                />

                <section className='page-section'>
                    <h2 className='titles'>محصولات</h2>
                    <ProductGrid products={visibleProducts} onAdd={handleAdd} />
                </section>
            </main>
        </>
    );
}
