import {useRef} from 'react';

import {Link} from '@tanstack/react-router';

import {getCarouselProducts} from '../catalog/carousel-products';
import {buildContext} from '../catalog/context';
import ProductCard from './ProductCard';

import type {AppData} from '../types';

type HomeCarouselsProps = {
    data: AppData;
};

export default function HomeCarousels({data}: HomeCarouselsProps) {
    const context = buildContext(data);

    return (
        <>
            {data.home.carousels.map((carousel) => (
                <CarouselSection
                    key={carousel.id}
                    carouselId={carousel.id}
                    title={`${carousel.emoji} ${carousel.title}`}
                    products={getCarouselProducts(carousel, context)}
                    stockById={context.stockById}
                    offerByProductId={context.offerByProductId}
                    categoryById={context.categoryById}
                />
            ))}
        </>
    );
}

type CarouselSectionProps = {
    carouselId: string;
    title: string;
    products: AppData['products'];
    stockById: Record<number, number>;
    offerByProductId: Map<number, AppData['offers'][number]>;
    categoryById: AppData['categories'] extends (infer T)[]
        ? Map<number, T>
        : never;
};

function CarouselSection({
    carouselId,
    title,
    products,
    stockById,
    offerByProductId,
    categoryById,
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
            <div className='carousel-heading'>
                <h2 className='titles'>{title}</h2>

                <div className='carousel-controls'>
                    <Link
                        className='carousel-view-all'
                        to='/plp/$carouselId'
                        params={{carouselId}}
                    >
                        مشاهده همه
                    </Link>

                    <button
                        type='button'
                        onClick={() => move(false)}
                        aria-label='رفتن به ابتدای فهرست'
                    >
                        ←
                    </button>

                    <button
                        type='button'
                        onClick={() => move(true)}
                        aria-label='رفتن به انتهای فهرست'
                    >
                        →
                    </button>
                </div>
            </div>

            <div className='carousel-items' ref={itemsRef}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
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
