type CartPanelProps = {
    itemCount: number;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function CartPanel({itemCount}: CartPanelProps) {
    const count = faNumber.format(itemCount);

    return (
        <button type='button' id='cart' aria-label={`سبد خرید، ${count} کالا`}>
            سبد خرید
            <span className='cart-count' id='cart-count'>
                {count}
            </span>
        </button>
    );
}
