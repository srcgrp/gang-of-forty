import {useRef} from 'react';

import ProductCard from './ProductCard';

import type {Category, Offer, Product} from '../types';

type ProductGridProps = {
    products: Product[];
    stockById?: Record<number, number>;
    offerByProductId?: Map<number, Offer>;
    categoryById?: Map<number, Category>;
    layout?: 'carousel' | 'grid';
};

export default function ProductGrid({
    products,
    stockById,
    offerByProductId = new Map(),
    categoryById,
    layout = 'carousel',
}: ProductGridProps) {
    const itemsRef = useRef<HTMLDivElement>(null);

    const move = (direction: number) => {
        itemsRef.current?.scrollBy({
            left: direction * 300,
            behavior: 'smooth',
        });
    };

    const cards = products.map((product) => {
        const inStock =
            stockById === undefined ? true : (stockById[product.id] ?? 0) > 0;

        return (
            <ProductCard
                key={product.id}
                product={product}
                inStock={inStock}
                offer={offerByProductId.get(product.id)}
                categoryColor={categoryById?.get(product.categoryId)?.color}
            />
        );
    });

    if (layout === 'grid') {
        return <div className='product-grid'>{cards}</div>;
    }

    return (
        <>
            <div className='carousel-controls'>
                <button
                    type='button'
                    onClick={() => move(-1)}
                    aria-label='محصولات قبلی'
                >
                    ←
                </button>

                <button
                    type='button'
                    onClick={() => move(1)}
                    aria-label='محصولات بعدی'
                >
                    →
                </button>
            </div>

            <div className='carousel-items' ref={itemsRef}>
                {cards}
            </div>
        </>
    );
}
