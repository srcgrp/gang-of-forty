import { useParams, Link } from '@tanstack/react-router';
import { useCatalog } from '../../hooks/useCatalog';
import { carouselProducts, findCarousel } from '../../catalog/carousels';
import { formatNumber } from '../../catalog/pricing';
import ProductGrid from '../ProductGrid';
import CartPanel from '../CartPanel';
import Status from '../Status';
export default function PlpPage() {
    const { carouselId } = useParams({ from: '/plp/$carouselId' });
    const state = useCatalog();
    if (state.status !== 'success') return <><h1>فهرست محصولات</h1><Status state={state} /><Link to="/">بازگشت به خانه</Link></>;
    const carousel = findCarousel(state.data, carouselId);
    const products = carouselProducts(state.data, carouselId);
    if (!carousel || !products) return <><h1>این فهرست پیدا نشد</h1><Link to="/">بازگشت به خانه</Link></>;
    return <>
        <Link to="/">بازگشت به خانه</Link>
        <h1>{carousel.emoji} {carousel.title}</h1>
        <p>تعداد محصولات: {formatNumber(products.length)}</p>
        <ProductGrid
            id={carousel.id}
            title={carousel.title}
            products={products}
            offers={state.data.offers}
            stock={state.data.stock}
        />
        <CartPanel products={state.data.products} offers={state.data.offers} />
    </>;
}
