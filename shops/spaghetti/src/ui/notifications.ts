// src/ui/notifications.ts
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    duration: 2500,
    position: { x: 'left', y: 'bottom' }
});

export function notifyAddToCart(productName: string): void {
    import('canvas-confetti').then((confetti) => {
        confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.85 }
        });
    });
    notyf.success(`${productName} به سبد خرید اضافه شد.`);
}
