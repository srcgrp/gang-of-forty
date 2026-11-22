import {useRef} from 'react';

import ProductCard from './ProductCard';

import type {Category, Offer, Product} from '../types';
type ProductGridProps = {
    products: Product[];
    onAdd: (id: number) => void;
    stockById?: Record<number, number>;
    offerByProductId?: Map<number, Offer>;
    categoryById?: Map<number, Category>;
};

export default function ProductGrid({
    products,
    onAdd,
    stockById,
    offerByProductId = new Map(),
    categoryById,
}: ProductGridProps) {
    const itemsRef = useRef<HTMLDivElement>(null);

    const move = (direction: number) => {
        itemsRef.current?.scrollBy({
            left: direction * 300,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div className='carousel-controls'>
                <button
                    type='button'
                    onClick={() => move(-1)}
                    aria-label='محصولات قبلی'
                >
                    →
                </button>

                <button
                    type='button'
                    onClick={() => move(1)}
                    aria-label='محصولات بعدی'
                >
                    ←
                </button>
            </div>

            <div className='carousel-items' ref={itemsRef}>
                {products.map((product) => {
                    const inStock =
                        stockById === undefined
                            ? true
                            : (stockById[product.id] ?? 0) > 0;

                    const offer = offerByProductId.get(product.id);

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={onAdd}
                            inStock={inStock}
                            offer={offer}
                            categoryColor={
                                categoryById?.get(product.categoryId)?.color
                            }
                        />
                    );
                })}
            </div>
        </>
    );
}
