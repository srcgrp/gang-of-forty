import {Link} from '@tanstack/react-router';

import {discountedPrice} from '../catalog/pricing';
import {useAddToCart} from '../hooks/useAddToCart';

import type {Offer, Product} from '../types';
type ProductCardProps = {
    product: Product;
    inStock?: boolean;
    offer?: Offer | undefined;
    categoryColor?: string | undefined;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function ProductCard({
    product,
    inStock = true,
    offer,
    categoryColor,
}: ProductCardProps) {
    const addToCart = useAddToCart();

    const price = offer
        ? discountedPrice(product.price, offer.percent)
        : product.price;

    return (
        <article className={`item${inStock ? '' : ' item-out-of-stock'}`}>
            <div
                className='item-image'
                style={{backgroundColor: categoryColor}}
                aria-hidden='true'
            >
                <span className='item-emoji'>{product.emoji}</span>
            </div>

            {!inStock && (
                <span className='item-badge item-badge-out-of-stock'>
                    ناموجود
                </span>
            )}

            {inStock && offer && (
                <span className='item-badge'>
                    {faNumber.format(offer.percent)}٪ تخفیف
                </span>
            )}

            <Link
                to='/product/$productId'
                params={{productId: String(product.id)}}
                className='product-card-title'
            >
                <h3>{product.name}</h3>
            </Link>

            <p className='item-weight'>{product.unit}</p>

            <div className='item-purchase'>
                <p className='item-price'>
                    {offer && <del>{faNumber.format(product.price)}</del>}
                    {faNumber.format(price)} تومان
                </p>

                <button
                    type='button'
                    aria-label={
                        inStock
                            ? `افزودن ${product.name} به سبد خرید`
                            : `${product.name} ناموجود است`
                    }
                    onClick={() => addToCart(product.id)}
                    disabled={!inStock}
                >
                    +
                </button>
            </div>
        </article>
    );
}
