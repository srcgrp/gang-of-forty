import {Link, useParams, useSearch} from '@tanstack/react-router';

import {getCarouselProducts} from '../../catalog/carousel-products';
import {buildContext} from '../../catalog/context';
import {sortProducts} from '../../catalog/sort-products';
import {useAppContext} from '../../context/useAppContext';
import ProductGrid from '../ProductGrid';

export default function PlpPage() {
    const {carouselId} = useParams({
        from: '/plp/$carouselId',
    });

    const {sort} = useSearch({
        from: '/plp/$carouselId',
    });

    const {loadState} = useAppContext();

    if (loadState.status !== 'success') {
        return null;
    }

    const {data} = loadState;
    const context = buildContext(data);

    const carousel = data.home.carousels.find((item) => item.id === carouselId);

    if (!carousel) {
        return (
            <main id='main' className='page-section plp-page' tabIndex={-1}>
                <h1>این فهرست پیدا نشد</h1>

                <Link to='/' className='page-back-link'>
                    بازگشت به صفحه اصلی
                </Link>
            </main>
        );
    }

    const products = sortProducts(getCarouselProducts(carousel, context), sort);

    return (
        <main id='main' className='page-section plp-page' tabIndex={-1}>
            <Link to='/' className='page-back-link'>
                بازگشت به صفحه اصلی
            </Link>

            <h1 className='titles'>{carousel.title}</h1>

            <p>تعداد محصولات: {products.length}</p>

            <div className='plp-sort-controls'>
                <Link
                    to='/plp/$carouselId'
                    params={{carouselId}}
                    search={{sort: 'default'}}
                    aria-current={sort === 'default' ? 'page' : undefined}
                >
                    پیش‌فرض
                </Link>

                <Link
                    to='/plp/$carouselId'
                    params={{carouselId}}
                    search={{sort: 'price'}}
                    aria-current={sort === 'price' ? 'page' : undefined}
                >
                    ارزان‌ترین
                </Link>
            </div>

            <ProductGrid
                products={products}
                stockById={context.stockById}
                offerByProductId={context.offerByProductId}
                categoryById={context.categoryById}
                layout='grid'
            />
        </main>
    );
}
