import type {Product} from '../types';

type ProductCardProps = {
    product: Product;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function ProductCard({product}: ProductCardProps) {
    return (
        <article className='item'>
            <div className='item-image' aria-hidden='true'>
                <span className='item-emoji'>{product.emoji}</span>
            </div>

            <h3>{product.name}</h3>
            <p className='item-weight'>{product.unit}</p>

            <div className='item-purchase'>
                <p className='item-price'>
                    {faNumber.format(product.price)} تومان
                </p>

                <button
                    type='button'
                    aria-label={`افزودن ${product.name} به سبد خرید`}
                >
                    +
                </button>
            </div>
        </article>
    );
}
