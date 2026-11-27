import {useEffect, useState} from 'react';

const INITIAL_TIME = 5 * 60 * 60 + 43 * 60;

export default function SaleCountdown() {
    const [left, setLeft] = useState(INITIAL_TIME);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setLeft((current) => Math.max(0, current - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(left / 3600);
    const minutes = Math.floor((left % 3600) / 60);
    const seconds = left % 60;

    const format = (value: number) =>
        new Intl.NumberFormat('en-US', {
            minimumIntegerDigits: 2,
        }).format(value);

    return (
        <section className='sale-countdown'>
            <strong>پیشنهاد ویژه فروشگاه</strong>

            {isOpen && (
                <p className='sale-countdown-timer' dir='ltr'>
                    {format(hours)}:{format(minutes)}:{format(seconds)}
                </p>
            )}

            <button type='button' onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? 'بستن شمارشگر' : 'مشاهده زمان تخفیف'}
            </button>
        </section>
    );
}
