import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import confetti from 'canvas-confetti';

type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

const notyf = new Notyf({
    dismissible: true
});

const toEnglishDigits = (str: string): string => {
    return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};

document.addEventListener('DOMContentLoaded', () => {
    const cartBadge = document.querySelector<HTMLElement>('.cart-btn .badge');
    const rawBadgeText = cartBadge?.textContent?.trim() || '0';
    const parsedCount = parseInt(toEnglishDigits(rawBadgeText), 10);
    let cartCount = Number.isNaN(parsedCount) ? 0 : parsedCount;

    const addButtons = document.querySelectorAll<HTMLButtonElement>('.add-to-cart-btn');

    addButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const title = card?.querySelector('.product-name')?.textContent?.trim() || 'محصول';

            notyf.success(`«${title}» به سبد خرید اضافه شد!`);

            confetti({
                particleCount: 70,
                spread: 60,
                origin: { y: 0.6 }
            });

            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = String(cartCount);
            }
        });
    });
});
