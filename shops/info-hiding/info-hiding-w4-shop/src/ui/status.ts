import type { LoadState } from '../types';

export const renderStatus = (state: LoadState): void => {
    let message: string;
    switch (state.status) {
        case 'loading': message = 'در حال بارگذاری محصولات…'; break;
        case 'success': message = ''; break;
        case 'empty': message = 'هیچ محصول معتبری برای نمایش وجود ندارد.'; break;
        case 'error': message = state.message; break;
        default: {
            const unreachable: never = state;
            return unreachable;
        }
    }
    document.querySelectorAll<HTMLParagraphElement>('.load-status').forEach(element => {
        element.textContent = message;
    });
    document.querySelectorAll<HTMLElement>('.carousel').forEach(element => {
        element.setAttribute('aria-busy', String(state.status === 'loading'));
        if (state.status !== 'success') element.replaceChildren();
    });
    if (state.status !== 'success') {
        document.querySelectorAll<HTMLDivElement>('.carousel-controls').forEach(element => {
            element.hidden = true;
        });
    }
    const retry = document.querySelector<HTMLButtonElement>('#retry');
    if (retry) retry.hidden = state.status !== 'error';
};
