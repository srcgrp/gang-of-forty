import type {CartLine, Product} from '../types';

type CartPanelProps = {
    cart: CartLine[];
    products: Product[];
    total: number;
    onAdd: (productId: number) => void;
    onRemove: (productId: number) => void;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function CartPanel({
    cart,
    products,
    total,
    onAdd,
    onRemove,
}: CartPanelProps) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <section className='cart-panel' aria-label='سبد خرید'>
            <div className='cart-panel-heading'>
                <h2>سبد خرید</h2>
                <span>{faNumber.format(itemCount)} کالا</span>
            </div>

            {cart.length === 0 ? (
                <div className='cart-empty'>
                    <span aria-hidden='true'>🛒</span>
                    <p>سبد خریدت هنوز خالیه</p>
                    <small>محصولات مورد علاقه‌ات رو اضافه کن.</small>
                </div>
            ) : (
                <>
                    <div className='cart-panel-items'>
                        {cart.map((item) => {
                            const product = products.find(
                                (product) => product.id === item.productId,
                            );

                            if (!product) return null;

                            return (
                                <div
                                    className='cart-panel-item'
                                    key={item.productId}
                                >
                                    <span
                                        className='cart-item-emoji'
                                        aria-hidden='true'
                                    >
                                        {product.emoji}
                                    </span>

                                    <div className='cart-item-info'>
                                        <strong>{product.name}</strong>
                                        <span>
                                            {faNumber.format(
                                                product.price * item.quantity,
                                            )}{' '}
                                            تومان
                                        </span>
                                    </div>

                                    <div className='cart-item-quantity'>
                                        <button
                                            type='button'
                                            className='cart-quantity-button'
                                            onClick={() => onRemove(product.id)}
                                            aria-label={`کاهش تعداد ${product.name}`}
                                        >
                                            −
                                        </button>

                                        <span className='cart-quantity-value'>
                                            {faNumber.format(item.quantity)}
                                        </span>

                                        <button
                                            type='button'
                                            className='cart-quantity-button'
                                            onClick={() => onAdd(product.id)}
                                            aria-label={`افزایش تعداد ${product.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='cart-panel-total'>
                        <span>مبلغ کل</span>
                        <strong>{faNumber.format(total)} تومان</strong>
                    </div>
                </>
            )}
        </section>
    );
}
