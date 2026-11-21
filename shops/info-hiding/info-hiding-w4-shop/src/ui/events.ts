import type { Handlers } from '../types';

export const bindEvents = (handlers: Handlers): void => {
    document.body.addEventListener('click', (event: MouseEvent) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest<HTMLButtonElement>(
            'button[data-add], button[data-remove], button[data-category], #retry, .cart'
        );
        if (!button || button.disabled) return;
        if (button.dataset.add !== undefined) handlers.add(Number(button.dataset.add));
        else if (button.dataset.remove !== undefined) handlers.remove(Number(button.dataset.remove));
        else if (button.dataset.category !== undefined) handlers.category(button.dataset.category);
        else if (button.id === 'retry') handlers.retry();
        else document.querySelector<HTMLElement>('#cart-panel')?.scrollIntoView();
    });
    const search = document.querySelector<HTMLInputElement>('#search');
    const sort = document.querySelector<HTMLSelectElement>('#sort');
    if (!search || !sort) throw new Error('Catalog controls are missing');
    search.addEventListener('input', (event: Event) => {
        if (event.currentTarget instanceof HTMLInputElement) handlers.search(event.currentTarget.value);
    });
    sort.addEventListener('change', (event: Event) => {
        if (event.currentTarget instanceof HTMLSelectElement) handlers.sort(event.currentTarget.value);
    });
};
