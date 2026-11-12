import type {Offer, Product} from '../types';
import {discountedPrice} from '../catalog/pricing';

type ProductCardProps = {
    product: Product;
    onAdd: (id: number) => void;
    inStock?: boolean;
    offer?: Offer | undefined;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function ProductCard({
    product,
    onAdd,
    inStock = true,
    offer,
}: ProductCardProps) {
    const price = offer
        ? discountedPrice(product.price, offer.percent)
        : product.price;

    return (
        <article className='item'>
            <div className='item-image' aria-hidden='true'>
                <span className='item-emoji'>{product.emoji}</span>
            </div>

            <h3>{product.name}</h3>
            <p className='item-weight'>{product.unit}</p>

            {offer && <p>{offer.label}</p>}

            <div className='item-purchase'>
                <p className='item-price'>{faNumber.format(price)} تومان</p>

                <button
                    type='button'
                    aria-label={`افزودن ${product.name} به سبد خرید`}
                    onClick={() => onAdd(product.id)}
                    disabled={!inStock}
                >
                    +
                </button>
            </div>
        </article>
    );
}
