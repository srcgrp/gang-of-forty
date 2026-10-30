import confetti from 'canvas-confetti';
import {Notyf} from 'notyf';

const notyf = new Notyf();

function escapeHtml(text: string): string {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

export function showAddedFeedback(
    button: HTMLButtonElement,
    productName: string,
): void {
    notyf.success(`${escapeHtml(productName)} به سبد خرید اضافه شد`);

    const {left, top, width, height} = button.getBoundingClientRect();

    void confetti({
        particleCount: 60,
        spread: 70,
        origin: {
            x: (left + width / 2) / window.innerWidth,
            y: (top + height / 2) / window.innerHeight,
        },
        disableForReducedMotion: true,
    });
}
