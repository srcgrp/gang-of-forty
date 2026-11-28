import {Link, useParams} from '@tanstack/react-router';

import {buildContext} from '../../catalog/context';
import {discountedPrice} from '../../catalog/pricing';
import {useAppContext} from '../../context/useAppContext';
import {useAddToCart} from '../../hooks/useAddToCart';

const faNumber = new Intl.NumberFormat('fa-IR');

export default function ProductPage() {
    const {productId} = useParams({
        from: '/product/$productId',
    });

    const {loadState} = useAppContext();
    const addToCart = useAddToCart();

    if (loadState.status !== 'success') {
        return null;
    }

    const {data} = loadState;
    const context = buildContext(data);
    const id = Number(productId);
    const product = context.productById.get(id);

    if (!product) {
        return (
            <main id='main' className='page-section product-page' tabIndex={-1}>
                <h1>محصول موردنظر پیدا نشد</h1>

                <Link to='/' className='page-back-link'>
                    بازگشت به صفحه اصلی
                </Link>
            </main>
        );
    }

    const stock = context.stockById[product.id] ?? 0;
    const inStock = stock > 0;
    const offer = context.offerByProductId.get(product.id);
    const price = offer
        ? discountedPrice(product.price, offer.percent)
        : product.price;

    return (
        <main id='main' className='page-section product-page' tabIndex={-1}>
            <Link to='/' className='page-back-link'>
                بازگشت به صفحه اصلی
            </Link>

            <article className='product-detail'>
                <div className='product-detail-image' aria-hidden='true'>
                    <span>{product.emoji}</span>
                </div>

                <div className='product-detail-info'>
                    <h1>{product.name}</h1>

                    <p className='product-detail-unit'>واحد: {product.unit}</p>

                    <p className='product-detail-price'>
                        {offer && <del>{faNumber.format(product.price)}</del>}
                        {faNumber.format(price)} تومان
                    </p>

                    <p className='product-detail-stock'>
                        {inStock
                            ? `موجود در انبار: ${faNumber.format(stock)}`
                            : 'ناموجود'}
                    </p>

                    <button
                        type='button'
                        className='product-detail-add'
                        disabled={!inStock}
                        onClick={() => addToCart(product.id)}
                    >
                        افزودن به سبد خرید
                    </button>
                </div>
            </article>
        </main>
    );
}
