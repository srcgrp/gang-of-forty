import 'notyf/notyf.min.css';

import confetti from 'canvas-confetti';
import {Notyf} from 'notyf';

import {useCartStore} from './useCartStore';

const notyf = new Notyf({
    duration: 2000,
    position: {
        x: 'left',
        y: 'top',
    },
});

export function useAddToCart() {
    const add = useCartStore((state) => state.add);

    return (productId: number): void => {
        add(productId);

        notyf.success('محصول به سبد خرید اضافه شد.');

        confetti({
            particleCount: 70,
            spread: 65,
            origin: {y: 0.7},
        });
    };
}
