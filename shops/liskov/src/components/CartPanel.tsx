import type {CartLine, Product} from '../types';

type CartPanelProps = {
    cart: CartLine[];
    products: Product[];
    total: number;
    onRemove: (productId: number) => void;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function CartPanel({
    cart,
    products,
    total,
    onRemove,
}: CartPanelProps) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <section id='cart' aria-label='سبد خرید'>
            <h2>سبد خرید ({faNumber.format(itemCount)} کالا)</h2>

            {cart.map((item) => {
                const product = products.find(
                    (product) => product.id === item.productId,
                );

                if (!product) return null;

                return (
                    <div key={item.productId}>
                        <span>{product.name}</span>
                        <span>{faNumber.format(item.quantity)} عدد</span>
                        <button
                            type='button'
                            onClick={() => onRemove(item.productId)}
                            aria-label={`حذف ${product.name} از سبد خرید`}
                        >
                            حذف
                        </button>
                    </div>
                );
            })}

            <p>مجموع: {faNumber.format(total)} تومان</p>
        </section>
    );
}
