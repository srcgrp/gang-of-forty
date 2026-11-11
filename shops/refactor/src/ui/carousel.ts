import type { ProductView } from '../types';
import { button, el, icon } from './dom';
import { productCard } from './product-card';

const createCarousel = (id: string, title: string, emoji: string, products: ProductView[]): HTMLElement => {
    const section = el('section', 'product-section container');
    section.id = id; section.setAttribute('aria-labelledby', `${id}-title`);
    const carousel = el('div', 'carousel');
    const head = el('div', 'section-head');
    const heading = el('h2', 'section-title', `${emoji} ${title}`); heading.id = `${id}-title`;
    const here = el('span', 'target-marker', 'اینجا هستید');
    const controls = el('div', 'wrapper-car-btn');
    const prev = button('', 'car-btn'), next = button('', 'car-btn');
    prev.setAttribute('aria-label', `قبلی؛ ${title}`); next.setAttribute('aria-label', `بعدی؛ ${title}`);
    prev.append(icon('i-chevron-right')); next.append(icon('i-chevron-left'));
    controls.append(prev, next); head.append(heading, here, controls);
    const body = el('div', 'carousel-body');
    const track = el('ul', 'track products-track'); track.tabIndex = 0;
    track.setAttribute('aria-label', title);
    if (products.length) track.append(...products.map((product) => productCard(product, id)));
    else { const empty = el('li', 'empty-message', 'محصولی برای نمایش وجود ندارد.'); track.append(empty); }
    body.append(track); carousel.append(head, body); section.append(carousel);

    const update = (): void => {
        const max = Math.max(0, track.scrollWidth - track.clientWidth);
        prev.disabled = Math.abs(track.scrollLeft) <= 1;
        next.disabled = Math.abs(track.scrollLeft) >= max - 1;
        controls.hidden = max <= 1;
    };

    const scroll = (forward: boolean): void => {
        const card = track.querySelector<HTMLLIElement>('.card');
        const step = card ? card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0) : track.clientWidth;
        const direction = getComputedStyle(track).direction === 'rtl' ? -1 : 1;
        track.scrollBy({
            left: step * direction * (forward ? 1 : -1),
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    };

    prev.addEventListener('click', () => scroll(false)); next.addEventListener('click', () => scroll(true));
    track.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update); resize.observe(track);
    observers.set(section, resize); requestAnimationFrame(update);
    return section;
};

const observers = new Map<HTMLElement, ResizeObserver>();
 const clearCarousels = (root: HTMLElement): void => {
    for (const [section, observer] of observers) {
        if (root.contains(section)) { observer.disconnect(); observers.delete(section); }
    }
};


export {
    createCarousel,
    clearCarousels
}