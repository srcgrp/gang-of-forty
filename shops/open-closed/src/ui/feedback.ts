import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import confetti from 'canvas-confetti';

const notyf = new Notyf({
    duration: 2200,
    position: { x: 'left', y: 'bottom' },
    dismissible: true,
});

export function celebrate(button: HTMLButtonElement, productName: string): void {
    notyf.success(`${productName} به سبد اضافه شد`);

    const rect = button.getBoundingClientRect();
    confetti({
        particleCount: 60,
        spread: 70,
        disableForReducedMotion: true,
        origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
        },
    });
}