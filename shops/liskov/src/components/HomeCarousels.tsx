import {useRef} from 'react';

import {getCarouselProducts} from '../catalog/carousel-products';
import {buildContext} from '../catalog/context';
import ProductCard from './ProductCard';

import type {AppData} from '../types';

type HomeCarouselsProps = {
    data: AppData;
    onAdd: (id: number) => void;
};

export default function HomeCarousels({data, onAdd}: HomeCarouselsProps) {
    const context = buildContext(data);

    return (
        <>
            {data.home.carousels.map((carousel) => (
                <CarouselSection
                    key={carousel.id}
                    title={`${carousel.emoji} ${carousel.title}`}
                    products={getCarouselProducts(carousel, context)}
                    stockById={context.stockById}
                    offerByProductId={context.offerByProductId}
                    categoryById={context.categoryById}
                    onAdd={onAdd}
                />
            ))}
        </>
    );
}

type CarouselSectionProps = {
    title: string;
    products: AppData['products'];
    stockById: Record<number, number>;
    offerByProductId: Map<number, AppData['offers'][number]>;
    categoryById: AppData['categories'] extends (infer T)[]
        ? Map<number, T>
        : never;
    onAdd: (id: number) => void;
};

function CarouselSection({
    title,
    products,
    stockById,
    offerByProductId,
    categoryById,
    onAdd,
}: CarouselSectionProps) {
    const itemsRef = useRef<HTMLDivElement>(null);

    const move = (toEnd: boolean) => {
        const items = itemsRef.current;
        const target = toEnd
            ? items?.lastElementChild
            : items?.firstElementChild;

        target?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
        });
    };

    return (
        <section className='carousel'>
            <h2 className='titles'>{title}</h2>

            <div className='carousel-controls'>
                <button
                    type='button'
                    onClick={() => move(false)}
                    aria-label='رفتن به ابتدای فهرست'
                >
                    →
                </button>

                <button
                    type='button'
                    onClick={() => move(true)}
                    aria-label='رفتن به انتهای فهرست'
                >
                    ←
                </button>
            </div>

            <div className='carousel-items' ref={itemsRef}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={onAdd}
                        inStock={(stockById[product.id] ?? 0) > 0}
                        offer={offerByProductId.get(product.id)}
                        categoryColor={
                            categoryById.get(product.categoryId)?.color
                        }
                    />
                ))}
            </div>
        </section>
    );
}
