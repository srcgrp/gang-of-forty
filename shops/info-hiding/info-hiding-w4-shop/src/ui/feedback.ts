import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import confetti from 'canvas-confetti';

const notyf = new Notyf({
    duration: 3000, ripple: false,
    position: { x: 'center', y: 'bottom' },
    types: [{ type: 'success', background: '#602437', icon: false }]
});

export const showNotice = (added: boolean): void => {
    if (!added) {
        notyf.error('موجودی کافی نیست.');
        return;
    }
    notyf.success('کالا به سبد خرید اضافه شد');
    confetti({ particleCount: 60, spread: 70, disableForReducedMotion: true });
};
