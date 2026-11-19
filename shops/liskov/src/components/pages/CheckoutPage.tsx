import {useRef, useState} from 'react';

import {Link, useNavigate} from '@tanstack/react-router';

import {cartTotal} from '../../cart/cart';
import {useAppContext} from '../../context/useAppContext';
import {useCartStore} from '../../hooks/useCartStore';

const faNumber = new Intl.NumberFormat('fa-IR');

type FormValues = {
    name: string;
    mobile: string;
    address: string;
};

export default function CheckoutPage() {
    const navigate = useNavigate();
    const {loadState} = useAppContext();

    const cart = useCartStore((state) => state.lines);
    const clearCart = useCartStore((state) => state.clear);

    const [values, setValues] = useState<FormValues>({
        name: '',
        mobile: '',
        address: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const mobileRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLTextAreaElement>(null);

    if (loadState.status !== 'success') {
        return null;
    }

    const {products} = loadState.data;

    const errors = {
        name:
            values.name.trim().length < 3
                ? 'نام باید حداقل ۳ کاراکتر باشد.'
                : '',
        mobile: /^09\d{9}$/.test(values.mobile.trim())
            ? ''
            : 'شماره موبایل باید ۱۱ رقم و با 09 شروع شود.',
        address:
            values.address.trim().length < 10
                ? 'آدرس باید حداقل ۱۰ کاراکتر باشد.'
                : '',
    };

    const isValid = Object.values(errors).every((error) => error === '');
    const total = cartTotal(cart, products);

    function updateField(field: keyof FormValues, value: string) {
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);

        if (!isValid) {
            if (errors.name) {
                nameRef.current?.focus();
            } else if (errors.mobile) {
                mobileRef.current?.focus();
            } else if (errors.address) {
                addressRef.current?.focus();
            }

            return;
        }

        if (cart.length === 0) return;

        clearCart();
        void navigate({to: '/', replace: true});
    }

    return (
        <main id='main' className='page-section checkout-page' tabIndex={-1}>
            <Link to='/' className='page-back-link'>
                بازگشت به فروشگاه
            </Link>

            <h1>تسویه حساب</h1>

            {cart.length === 0 ? (
                <section className='checkout-empty'>
                    <h2>سبد خرید شما خالی است</h2>
                    <p>برای ثبت سفارش ابتدا محصولی به سبد خرید اضافه کنید.</p>
                    <Link to='/' className='checkout-back-button'>
                        بازگشت به فروشگاه
                    </Link>
                </section>
            ) : (
                <div className='checkout-layout'>
                    <form className='checkout-form' onSubmit={handleSubmit}>
                        <h2>اطلاعات تحویل سفارش</h2>

                        <div className='checkout-field'>
                            <label htmlFor='checkout-name'>
                                نام و نام خانوادگی
                            </label>
                            <input
                                ref={nameRef}
                                id='checkout-name'
                                name='name'
                                type='text'
                                value={values.name}
                                onChange={(event) =>
                                    updateField('name', event.target.value)
                                }
                                aria-invalid={submitted && Boolean(errors.name)}
                                aria-describedby='checkout-name-error'
                            />
                            {submitted && errors.name && (
                                <small
                                    id='checkout-name-error'
                                    className='checkout-error'
                                >
                                    {errors.name}
                                </small>
                            )}
                        </div>

                        <div className='checkout-field'>
                            <label htmlFor='checkout-mobile'>
                                شماره موبایل
                            </label>
                            <input
                                ref={mobileRef}
                                id='checkout-mobile'
                                name='mobile'
                                type='tel'
                                inputMode='numeric'
                                value={values.mobile}
                                onChange={(event) =>
                                    updateField('mobile', event.target.value)
                                }
                                aria-invalid={
                                    submitted && Boolean(errors.mobile)
                                }
                                aria-describedby='checkout-mobile-error'
                            />
                            {submitted && errors.mobile && (
                                <small
                                    id='checkout-mobile-error'
                                    className='checkout-error'
                                >
                                    {errors.mobile}
                                </small>
                            )}
                        </div>

                        <div className='checkout-field'>
                            <label htmlFor='checkout-address'>آدرس تحویل</label>
                            <textarea
                                ref={addressRef}
                                id='checkout-address'
                                name='address'
                                rows={4}
                                value={values.address}
                                onChange={(event) =>
                                    updateField('address', event.target.value)
                                }
                                aria-invalid={
                                    submitted && Boolean(errors.address)
                                }
                                aria-describedby='checkout-address-error'
                            />
                            {submitted && errors.address && (
                                <small
                                    id='checkout-address-error'
                                    className='checkout-error'
                                >
                                    {errors.address}
                                </small>
                            )}
                        </div>

                        <button
                            type='submit'
                            className='checkout-submit'
                            disabled={!isValid || cart.length === 0}
                        >
                            ثبت سفارش
                        </button>
                    </form>

                    <aside className='checkout-summary'>
                        <h2>خلاصه سفارش</h2>

                        <div className='checkout-summary-items'>
                            {cart.map((item) => {
                                const product = products.find(
                                    (entry) => entry.id === item.productId,
                                );

                                if (!product) return null;

                                return (
                                    <div
                                        className='checkout-summary-item'
                                        key={item.productId}
                                    >
                                        <span>
                                            {product.emoji} {product.name}
                                            {' × '}
                                            {faNumber.format(item.quantity)}
                                        </span>
                                        <strong>
                                            {faNumber.format(
                                                product.price * item.quantity,
                                            )}{' '}
                                            تومان
                                        </strong>
                                    </div>
                                );
                            })}
                        </div>

                        <div className='checkout-summary-total'>
                            <span>مبلغ قابل پرداخت</span>
                            <strong>{faNumber.format(total)} تومان</strong>
                        </div>
                    </aside>
                </div>
            )}
        </main>
    );
}
