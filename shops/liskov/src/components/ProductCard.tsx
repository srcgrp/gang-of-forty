import type {Offer, Product} from '../types';
import {discountedPrice} from '../catalog/pricing';

type ProductCardProps = {
    product: Product;
    onAdd: (id: number) => void;
    inStock?: boolean;
    offer?: Offer | undefined;
    categoryColor?: string | undefined;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function ProductCard({
    product,
    onAdd,
    inStock = true,
    offer,
    categoryColor,
}: ProductCardProps) {
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

            <h3>{product.name}</h3>
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
                    onClick={() => onAdd(product.id)}
                    disabled={!inStock}
                >
                    +
                </button>
            </div>
        </article>
    );
}
