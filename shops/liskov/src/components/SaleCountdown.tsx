import {useEffect, useState} from 'react';

function CountdownTimer() {
    const [left, setLeft] = useState(30);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            console.log('Sale countdown tick');
            setLeft((s) => s - 1);
        }, 1000);

        return () => {
            window.clearInterval(intervalId);
            console.log('Sale countdown stopped');
        };
    }, []);

    return (
        <p className='sale-countdown-timer'>
            زمان باقی‌مانده تخفیف: {left} ثانیه
        </p>
    );
}

export default function SaleCountdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='sale-countdown'>
            <div>
                <strong>پیشنهاد ویژه فروشگاه</strong>
                {isOpen && <CountdownTimer />}
            </div>
            <button
                type='button'
                onClick={() => setIsOpen((previous) => !previous)}
            >
                {isOpen ? 'بستن شمارشگر' : 'مشاهده زمان تخفیف'}
            </button>
        </section>
    );
}
